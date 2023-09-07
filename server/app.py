from flask import jsonify, request, render_template
from flask_restful import Resource

from config import app, db, api
from models import User, Category, Activity, Session, Reminder, Feedback, Progress

@app.route('/')
def home():
    return "SMART App Home"

if __name__ == '__main__':
    app.run(port=5555, debug=True)

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure the SQLAlchemy part of the application instance
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///smart_app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Create the SQLAlchemy db instance
db = SQLAlchemy(app)

@app.route('/')
def home():
    return "SMART App Home"

# -------------------------------------------------- #
#                     API Routes                     #
# -------------------------------------------------- #

                    # POST ROUTES #

@app.route('/categories', methods=['POST'])
def create_category():
    try:
        data = request.get_json()
        if not data or not data.get('name'):
            return jsonify({"message": "Invalid input"}), 400
        
        new_category = Category(name=data['name'], description=data.get('description'))
        db.session.add(new_category)
        db.session.commit()
        return jsonify({"message": "Category created successfully", "category": new_category.serialize()}), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500


@app.route('/activities', methods=['POST'])
def create_activity():
    try:
        data = request.get_json()
        if not data or not data.get('name') or not data.get('category_id'):
            return jsonify({"message": "Invalid input"}), 400
        
        new_activity = Activity(name=data['name'], description=data.get('description'), category_id=data['category_id'])
        db.session.add(new_activity)
        db.session.commit()
        return jsonify({"message": "Activity created successfully", "activity": new_activity.serialize()}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

                    # GET ROUTES #

@app.route('/categories', methods=['GET'])
def get_categories():
    try:
        categories = Category.query.all()
        return jsonify([category.serialize() for category in categories]), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route('/categories/<int:id>', methods=['GET'])
def get_category(id):
    try:
        category = Category.query.get_or_404(id)
        return jsonify(category.serialize()), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route('/activities', methods=['GET'])
def get_activities():
    try:
        activities = Activity.query.all()
        return jsonify([activity.serialize() for activity in activities]), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@app.route('/activities/<int:id>', methods=['GET'])
def get_activity(id):
    try:
        activity = Activity.query.get_or_404(id)
        return jsonify(activity.serialize()), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

                    # PUT ROUTES #

@app.route('/categories/<int:id>', methods=['PUT'])
def update_category(id):
    try:
        data = request.get_json()
        if not data or not data.get('name'):
            return jsonify({"message": "Invalid input"}), 400
        
        category = Category.query.get_or_404(id)
        category.name = data['name']
        category.description = data.get('description')
        db.session.commit()
        return jsonify({"message": "Category updated successfully", "category": category.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500


@app.route('/activities/<int:id>', methods=['PUT'])
def update_activity(id):
    try:
        data = request.get_json()
        if not data or not data.get('name') or not data.get('category_id'):
            return jsonify({"message": "Invalid input"}), 400
        
        activity = Activity.query.get_or_404(id)
        activity.name = data['name']
        activity.description = data.get('description')
        activity.category_id = data['category_id']
        db.session.commit()
        return jsonify({"message": "Activity updated successfully", "activity": activity.serialize()}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

                    # DELETE ROUTES #

@app.route('/categories/<int:id>', methods=['DELETE'])
def delete_category(id):
    try:
        category = Category.query.get_or_404(id)
        db.session.delete(category)
        db.session.commit()
        return jsonify({"message": "Category deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500


@app.route('/activities/<int:id>', methods=['DELETE'])
def delete_activity(id):
    try:
        activity = Activity.query.get_or_404(id)
        db.session.delete(activity)
        db.session.commit()
        return jsonify({"message": "Activity deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

