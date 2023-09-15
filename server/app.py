from config import app, db, openai
from flask import jsonify, request
from models import Contact
from twilio.rest import Client
import os

# Twilio credentials
account_sid = 'ACfd0c3d1f0745a16d6d3bd438002158c9'
auth_token = 'd472dcec6fee47db14e604d826b23316'  # Replace with your actual Twilio authentication token
twilio_phone_number = '+18336191267'  # Replace with your Twilio phone number

# Initialize Twilio client
client = Client(account_sid, auth_token)


# Initialize an empty conversation history
conversation = []

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



if __name__ == "__main__":
    app.run(port=5555, debug=True)
