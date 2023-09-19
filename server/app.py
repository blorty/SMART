from config import app, db, openai, api
from flask import jsonify, request, abort, session, make_response
from models import Contact, User, Session
from twilio.rest import Client
import os
from flask_restful import Api, Resource
from datetime import datetime
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager

# Twilio credentials
account_sid = 'ACfd0c3d1f0745a16d6d3bd438002158c9'
auth_token = 'd472dcec6fee47db14e604d826b23316'  # Replace with your actual Twilio authentication token
twilio_phone_number = '+18336191267'  # Replace with your Twilio phone number

# Initialize Twilio client
client = Client(account_sid, auth_token)

# Initialize an empty conversation history
conversation = []

jwt = JWTManager(app)

# Generate a random secret key
secret_key = os.urandom(24)

# Convert the secret key to a hexadecimal string
secret_key_hex = secret_key.hex()

# Set the Flask app's JWT_SECRET_KEY configuration
app.config['JWT_SECRET_KEY'] = secret_key_hex
app.config['JWT_TOKEN_LOCATION'] = ['headers']  # Specify where to look for JWT tokens (e.g., in headers)
app.config['JWT_COOKIE_SECURE'] = False  # Set this to True for secure cookies if needed

# Define route handlers
@app.route('/')
def index():
    return "Hello World!"

#standard chatbot(potentially prompt engineering)
@app.route("/chat", methods=["POST"])
def chatbot():
    try:
        user_input = request.json.get("input")
        print("User Input:", user_input)

        # Add the user's message to the conversation
        conversation.append({"role": "user", "content": user_input})

        # Call the OpenAI API to get a response
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=conversation,
            temperature=0.7,  # You can adjust temperature for response randomness
            max_tokens=150,   # Adjust max_tokens as needed
        )

        bot_response = response.choices[0].message["content"]

        # Add the bot's response to the conversation
        conversation.append({"role": "assistant", "content": bot_response})

        return jsonify({"botResponse": bot_response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/contact-me", methods=["POST"])
def post_contact():
    contact_data = request.form  # Assuming you are sending form data

    try:
        contact = Contact(
            name=contact_data.get('name'),
            email=contact_data.get('email'),
            message=contact_data.get('message')
        )

        db.session.add(contact)
        db.session.commit()

        # Send an SMS when the contact form is submitted
        message = client.messages.create(
            body="New contact form submission: Name - {}, Email - {}, Message - {}".format(
                contact.name, contact.email, contact.message),
            from_=twilio_phone_number,
            to='+15053663543'  # Replace with your desired recipient phone number
        )
        print("SMS sent successfully:", message.sid)

        return jsonify({"message": "Contact data submitted successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error updating contact data: {str(e)}"}), 500


class Register(Resource):
    def post(self):
        form_json = request.get_json()
        email = form_json.get('email')  # Use .get() to safely access form data

        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return {"error": "Email already exists"}, 400  # Return a 400 Bad Request response

        new_user = User(
            username=form_json.get('username'),
            email=email,
            password_hash=form_json.get('password'),
        )

        try:
            db.session.add(new_user)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            return {"error": f"Failed to create user: {str(e)}"}, 500

        # Return a success response with user data
        response_data = {
            "message": "User registration successful",
            "user": {
                "username": new_user.username,
                "email": new_user.email,
            },
        }
        return response_data, 201  # Return a 201 Created response

api.add_resource(Register, '/register')




class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']

        user = User.query.filter_by(username=username).first()

        if user and user.authenticate(password):
            # Generate a JWT token
            access_token = create_access_token(identity=user.id)
            
            session_log = SessionLog(user_id=user.id)
            db.session.add(session_log)
            db.session.commit()

            return {
                "message": "Login successful",
                "user": {
                    "username": user.username,
                    "email": user.email,
                },
                "access_token": access_token  # Return the JWT token
            }
        else:
            return {
                "message": "Login failed"
            }, 401

api.add_resource(Login, '/login')



@app.route('/authorized', methods=['GET'])
@jwt_required()
def protected():
    # You can access the current user's identity using get_jwt_identity()
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    return jsonify({"message": "Protected endpoint", "user": {"username": user.username, "email": user.email}}), 200



if __name__ == "__main__":
    app.run(port=5555, debug=True)
