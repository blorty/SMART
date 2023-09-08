from flask import request, jsonify
from flask_restful import Resource
from models import User, Category, Activity, Session, Reminder, Feedback, Progress
from config import app, db, api


@app.route('/')
def home():
    return "SMART App Home"

@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'error': 'Internal server error'}), 500

# -------------------------------------------------- #
#                     API Routes                     #
# -------------------------------------------------- #

class CategoryResource(Resource):
    def get(self, id=None):
        if id:
            category = Category.query.get_or_404(id)
            return category.to_dict(), 200
        else:
            categories = Category.query.all()
        return [category.to_dict() for category in categories], 200

    def post(self):
        data = request.get_json()
        if not data or not data.get('name'):
            return {"message": "Invalid input"}, 400
        
        new_category = Category(name=data['name'], description=data.get('description'))
        db.session.add(new_category)
        db.session.commit()
        return {"message": "Category created successfully", "category": new_category.serialize()}, 201
    
    def put(self, id):
        data = request.get_json()
        if not data or not data.get('name'):
            return {"message": "Invalid input"}, 400
        
        category = Category.query.get_or_404(id)
        category.name = data['name']
        category.description = data.get('description')
        db.session.commit()
        return {"message": "Category updated successfully", "category": category.serialize()}, 200

    def delete(self, id):
        category = Category.query.get_or_404(id)
        db.session.delete(category)
        db.session.commit()
        return {"message": "Category deleted successfully"}, 200

class ActivityResource(Resource):
    def get(self, id=None):
        if id:
            activity = Activity.query.get_or_404(id)
            return activity.to_dict(), 200  # Use the to_dict method to get a serializable dictionary
        else:
            activities = Activity.query.all()
        return [activity.to_dict() for activity in activities], 200  # Return a list of dictionaries


    def post(self):
        data = request.get_json()
        if not data or not data.get('name') or not data.get('category_id'):
            return {"message": "Invalid input"}, 400
        
        new_activity = Activity(name=data['name'], description=data.get('description'), category_id=data['category_id'])
        db.session.add(new_activity)
        db.session.commit()
        return {"message": "Activity created successfully", "activity": new_activity.serialize()}, 201

    def put(self, id):
        data = request.get_json()
        if not data or not data.get('name') or not data.get('category_id'):
            return {"message": "Invalid input"}, 400
        
        activity = Activity.query.get_or_404(id)
        activity.name = data['name']
        activity.description = data.get('description')
        activity.category_id = data['category_id']
        db.session.commit()
        return {"message": "Activity updated successfully", "activity": activity.serialize()}, 200

    def delete(self, id):
        activity = Activity.query.get_or_404(id)
        db.session.delete(activity)
        db.session.commit()
        return {"message": "Activity deleted successfully"}, 200

# Adding resources to the API
api.add_resource(CategoryResource, '/categories', '/categories/<int:id>')
api.add_resource(ActivityResource, '/activities', '/activities/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)