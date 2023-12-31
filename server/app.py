from flask import jsonify, make_response, request, session
from werkzeug.exceptions import HTTPException
from flask_restful import Resource
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

import base64
from os import environ

from models import MainCategory, SubCategory, Activity, User, HappyNote
from config import app, db, api

load_dotenv()

jwt = JWTManager(app)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

app.config['JWT_SECRET_KEY'] = environ.get('JWT_SECRET_KEY')
app.secret_key = environ.get('SECRET_KEY')
app.permanent_session_lifetime = timedelta(days=7)

@app.errorhandler(Exception)
def handle_exception(e):
    if isinstance(e, HTTPException):
        return e
    app.logger.error(e)
    return jsonify(error=str(e)), 500

@app.route('/')
def home():
    return "SMART App Home"

@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    app.logger.exception("Internal Server Error: %s", error)
    db.session.rollback()
    return jsonify({'error': 'Internal server error'}), 500


class UserResource(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return make_response(jsonify(error="User not found"), 404)
        return make_response(jsonify(user.serialize()), 200)


class UserPasswordResource(Resource):
    def put(self, username):
        print("Received request to reset password for username:", username)

        user = User.query.filter_by(username=username).first()

        if not user:
            return make_response(jsonify(error="User not found"), 404)
        
        data = request.get_json()
        print("Received data:", data)

        current_password = data.get('password')
        new_password = data.get('new_password')
        confirm_password = data.get('confirm_password')
        
        print("Current Password:", current_password)
        print("New Password:", new_password)
        print("Confirm Password:", confirm_password)

        if current_password and new_password and confirm_password:
            if not user.authenticate(current_password):
                return make_response(jsonify(error="Current password is incorrect"), 400)

            if new_password != confirm_password:
                return make_response(jsonify(error="New password and confirmation do not match"), 400)

            if len(new_password) < 8:
                return make_response(jsonify(error="New password must be at least 8 characters long"), 400)

            user.password_hash = new_password
            db.session.commit()
            return make_response(jsonify(message="Password updated successfully"), 200)


class UserUsernameResource(Resource):
    def put(self, user_id):
        print("Data received:", request.get_json())
        user = User.query.get(user_id)
        if not user:
            return make_response(jsonify(error="User not found"), 404)
            
        data = request.get_json()
        username = data.get('username')

        if username:
            existing_user = User.query.filter_by(username=username).first()
            if existing_user and existing_user.user_id != user_id:
                return make_response(jsonify(error="Username is already in use"), 400)
            user.username = username
            db.session.commit()
            return make_response(jsonify(message="Username updated successfully"), 200)

class UserAvatarResource(Resource):
    def put(self, username):
        user = User.query.filter_by(username=username).first()
        if not user:
            return make_response(jsonify(error="User not found"), 404)
            
        avatar_file = request.files.get('avatar')
        if avatar_file:
            user.avatar_data = avatar_file.read()
            db.session.commit()
            return make_response(jsonify(message="Avatar updated successfully"), 200)
        return make_response(jsonify(error="Avatar file is required"), 400)
    
    def get(self, username):
        user = User.query.filter_by(username=username).first()
        if not user:
            return make_response(jsonify(error="User not found"), 404)
            
        avatar_data_encoded = base64.b64encode(user.avatar_data).decode('utf-8') if user.avatar_data else None
        return make_response(jsonify(avatar=avatar_data_encoded))
    
    def options(self, username):
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Methods'] = 'PUT'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response


class Register(Resource):
    def post(self):
        try:
            # Start a nested transaction
            db.session.begin_nested()

            # Get the JSON data from the request
            data = request.get_json()
            
            # Check if a user already exists with the provided username or email
            if User.query.filter_by(username=data['username']).first():
                db.session.rollback()  # Rollback the transaction
                return make_response(jsonify(error="Username already exists"), 409)
            
            if User.query.filter_by(email=data['email']).first():
                db.session.rollback()  # Rollback the transaction
                return make_response(jsonify(error="Email already exists"), 409)
            
            # Create a new user with the provided data
            new_user = User(username=data['username'], email=data['email'])
            new_user.password_hash = data['password']

            db.session.add(new_user)
            db.session.commit()  # Commit the transaction

            # Log the user in automatically
            session['user_id'] = new_user.user_id
            session.permanent = True
            
            # Return the new user's data
            return make_response(jsonify(new_user.serialize()), 201)
        except KeyError:
            db.session.rollback()  # Rollback the transaction in case of an exception
            return make_response(jsonify(error="Missing username, email, or password"), 400)
        except Exception as e:
            db.session.rollback()  # Rollback the transaction in case of an exception
            app.logger.error(e)
            return make_response(jsonify(error="Internal server error"), 500)


class Login(Resource):
    def post(self):
        try:
            # Get the JSON data from the request
            data = request.get_json()
            print(jsonify(data))

            # Check if username and password keys are present in the request data
            if 'username' not in data:
                return make_response(jsonify(error="Username is required"), 400)
            if 'password' not in data:
                return make_response(jsonify(error="Password is required"), 400)

            user = User.query.filter_by(username=data['username']).first()

            # Check if the user exists
            if not user:
                return make_response(jsonify(error="Username not found"), 404)

            # Check if the password is correct
            if not user.authenticate(data['password']):
                return make_response(jsonify(error="Incorrect password"), 401)
            
            # Set user_id in session
            session['user_id'] = user.user_id
            session.permanent = True 

            # JWT Token Logic
            print("JWT Secret Key during token creation:", app.config['JWT_SECRET_KEY'])
            access_token = create_access_token(identity=user.user_id)
            print("Generated Token:", access_token)
            return make_response(jsonify(token=access_token, user=user.serialize()), 200)

        except KeyError:
            return make_response(jsonify(error="Missing username or password"), 400)
        except Exception as e:
            app.logger.error(e)
            return make_response(jsonify(error="Internal server error"), 500)


class Logout(Resource):
    def post(self):
        try:
            # Clear the session to log the user out
            session.pop('user_id', None)
            return make_response(jsonify(message="Logged out successfully"), 200)
        except Exception as e:
            app.logger.error(e)
            return make_response(jsonify(error="Internal server error"), 500)


class Avatar(Resource):
    def post(self, user_id):
        try:
            # Get the JSON data from the request
            data = request.get_json()
            
            # Fetch the user using the user ID
            user = User.query.filter_by(id=user_id).first()
            if not user:
                # If no user is found with the provided ID, return a 404 error
                return make_response(jsonify(error="User not found"), 404)
            
            # Update the user's avatar URL
            user.avatar_url = data['avatar_url']
            db.session.commit()
            
            # Return the updated user data
            return make_response(jsonify(user.serialize()), 200)
        except KeyError:
            # If required data is missing in the request, return a 400 error
            return make_response(jsonify(error="Missing avatar_url"), 400)
        except Exception as e:
            # If there is any other exception, log the error and return a 500 error
            app.logger.error(e)
            return make_response(jsonify(error="Internal server error"), 500)


class HappyNotes(Resource):
    def post(self):
        # This method will handle the creation of a new happy note
        try:
            # Get data from the request
            data = request.get_json()
            user_id = data.get('user_id')
            content = data.get('content')

            # Validate the input data
            if not user_id or not content:
                return make_response(jsonify(error='User ID and content are required'), 400)

            # Check if the user exists
            user = User.query.get(user_id)
            if not user:
                return make_response(jsonify(error='User not found'), 404)
            
            # Create and save the new happy note
            new_note = HappyNote(user_id=user_id, content=content)
            db.session.add(new_note)
            db.session.commit()
            
            return make_response(jsonify(message='Happy note added successfully'), 200)
        except Exception as e:
            app.logger.error(e)
            return make_response(jsonify(error='Internal server error'), 500)
    
    def get(self, user_id):
        # This method will fetch and return a user's happy notes history
        try:
            # Check if the user exists
            user = User.query.get(user_id)
            if not user:
                return make_response(jsonify(error='User not found'), 404)
            
            # Fetch and return the user's happy notes
            notes = HappyNote.query.filter_by(user_id=user_id).all()
            notes_list = [note.serialize() for note in notes]
            return make_response(jsonify(notes_list), 200)
        except Exception as e:
            app.logger.error(e)
            return make_response(jsonify(error='Internal server error'), 500)


class RelaxationTechniques(Resource):
    def get(self):
        main_category = MainCategory.query.filter_by(name='Relaxation Techniques').first()
        if not main_category:
            return make_response(jsonify(error="Relaxation Techniques category not found"), 404)

        techniques = SubCategory.query.filter_by(main_category_id=main_category.id).all()
        all_techniques = []
        for technique in techniques:
            activities = Activity.query.filter_by(subcategory_id=technique.id).all()
            activities_list = [{"id": a.id, "name": a.name, "description": a.description} for a in activities]
            all_techniques.append({"id": technique.id, "name": technique.name, "activities": activities_list})
        return make_response(jsonify(all_techniques), 200)


class StressManagementActivities(Resource):
    def get(self):
        main_category = MainCategory.query.filter_by(name='Stress Management Activities').first()
        if not main_category:
            return make_response(jsonify(error="Stress Management Activities category not found"), 404)

        activities = SubCategory.query.filter_by(main_category_id=main_category.id).all()
        all_activities = []
        for activity in activities:
            acts = Activity.query.filter_by(subcategory_id=activity.id).all()
            activities_list = [{"id": a.id, "name": a.name, "description": a.description} for a in acts]
            all_activities.append({"id": activity.id, "name": activity.name, "activities": activities_list})
        return make_response(jsonify(all_activities), 200)


api.add_resource(UserResource, '/user/<int:user_id>')
api.add_resource(UserPasswordResource, '/user/<string:username>/password')
api.add_resource(UserUsernameResource, '/user/<int:user_id>/username')
api.add_resource(UserAvatarResource, '/user/<string:username>/avatar')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Register, '/register')
api.add_resource(RelaxationTechniques, '/relaxation_techniques')
api.add_resource(StressManagementActivities, '/stress_management_activities')
api.add_resource(HappyNotes, '/happynotes', '/happynotes/<int:user_id>')

@app.route('/protected_endpoint', methods=['GET'])
@jwt_required()
def protected_function():
    return jsonify(message="You've accessed a protected endpoint!")

@app.route('/verify_token', methods=['GET', 'POST'])  # Add 'GET' here
@jwt_required()
def verify_token():
    print("JWT Secret Key during token verification:", app.config['JWT_SECRET_KEY'])
    # If we reach this point, the token is valid.
    current_user = get_jwt_identity()  # This fetches the identity (usually user_id) from the token
    user_data = User.query.get(current_user)
    if not user_data:
        print("User not found for token")
        return jsonify(error="User not found"), 404
    print("Token is valid for user:", user_data.username)
    return jsonify(valid=True, user=user_data.serialize()), 200

if __name__ == '__main__':
    app.run(port=5555, debug=True)
