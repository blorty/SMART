from flask import jsonify, make_response
from werkzeug.exceptions import HTTPException
from flask_restful import Resource
from flask_cors import CORS

from models import MainCategory, SubCategory, Activity
from config import app, db, api

CORS(app)

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


api.add_resource(RelaxationTechniques, '/relaxation_techniques')
api.add_resource(StressManagementActivities, '/stress_management_activities')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
