
from config import app, db
from models import MainCategory, SubCategory, Activity
from datetime import datetime

stress_management_activities = {

    "Physical" : [
            {"name": "Exercise", "description": "Engage in physical activity to boost mood and health."},
            {"name": "Practice Yoga", "description": "Combine physical postures and meditation for holistic health."},
            {"name": "Practice Good Posture", "description": "Maintain alignment to reduce physical stress."},
            {"name": "Stay Active", "description": "Maintain regular movement for health benefits."},
        ],

    "Mental" : [
            {"name": "Meditate", "description": "Practice mindfulness to calm the mind and reduce stress."},
            {"name": "Avoid Procrastination", "description": "Tackle tasks promptly to reduce future stress."},
            {"name": "Prioritize Tasks", "description": "Order tasks based on importance to manage workload."},
            {"name": "Challenge Negative Thoughts", "description": "Reframe unhelpful patterns of thinking."},
            {"name": "Learn Something New", "description": "Engage the brain and expand knowledge."},
        ],

    "Emotional" : [
            {"name": "Practice Gratitude", "description": "Regularly acknowledge and appreciate the good in life."},
            {"name": "Practice Forgiveness", "description": "Release grudges and past hurts for emotional freedom."},
            {"name": "Visualize", "description": "Imagine positive scenarios and outcomes."},
            {"name": "Practice Acceptance", "description": "Embrace life's events without judgment."},
    ],

    "Social" : [
            {"name": "Spend Time with Friends or Family", "description": "Connect with loved ones for emotional support."},
            {"name": "Volunteer", "description": "Give back to the community and find purpose."},
            {"name": "Stay Connected", "description": "Maintain social connections for emotional support."},
        ],

    "Nutritional" : [
            {"name": "Eat Right", "description": "Consume a balanced diet for physical health and mental well-being."},
            {"name": "Listen to Your Body", "description": "Tune into physical cues for overall well-being."},
            {"name": "Stay Hydrated", "description": "Drink water regularly for physical and mental well-being."},
            {"name": "Consume Omega-3 Fatty Acids", "description": "Eat foods rich in omega-3s for brain health."},
            {"name": "Eat More Greens", "description": "Incorporate more vegetables into your diet for essential nutrients."},
        ]
}


def seed_stress_management_activities():
    # Step 1: Create and add main category
    sma_main_category = MainCategory.query.filter_by(name='Stress Management Activities').first()
    if not sma_main_category:
        sma_main_category = MainCategory(name='Stress Management Activities')
        db.session.add(sma_main_category)
        db.session.commit()
    
    for subcategory_name, activities_data in stress_management_activities.items():
        # Check if subcategory already exists
        subcategory = SubCategory.query.filter_by(name=subcategory_name, main_category_id=sma_main_category.id).first()
        print(f"Found subcategory: {subcategory}")
        if not subcategory:
            # Create and add subcategory
            subcategory = SubCategory(name=subcategory_name, main_category_id=sma_main_category.id)
            db.session.add(subcategory)
            db.session.commit()

        # Create and add activities
        for activity_data in activities_data:
            # Check if activity already exists
            activity = Activity.query.filter_by(name=activity_data['name'], subcategory_id=subcategory.id).first()
            if not activity:
                # Create and add activity
                activity = Activity(name=activity_data['name'], description=activity_data['description'], subcategory_id=subcategory.id)
                db.session.add(activity)
        db.session.commit()


if __name__ == "__main__":
    from app import app
    with app.app_context():
        seed_stress_management_activities()
        print("Stress Management Activities have been seeded.")