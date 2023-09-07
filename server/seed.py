# Local imports
from config import app, db
from models import db, Category, Activity

categories = {
    "Stress Management Activities": {
        "Physical": [
            {"name": "Exercise", "description": "Engage in physical activity to boost mood and health."},
            {"name": "Practice Yoga", "description": "Combine physical postures and meditation for holistic health."},
            {"name": "Practice Good Posture", "description": "Maintain alignment to reduce physical stress."},
            {"name": "Stay Active", "description": "Maintain regular movement for health benefits."},
        ],
        "Mental": [
            {"name": "Meditate", "description": "Practice mindfulness to calm the mind and reduce stress."},
            {"name": "Avoid Procrastination", "description": "Tackle tasks promptly to reduce future stress."},
            {"name": "Prioritize Tasks", "description": "Order tasks based on importance to manage workload."},
            {"name": "Challenge Negative Thoughts", "description": "Reframe unhelpful patterns of thinking."},
            {"name": "Learn Something New", "description": "Engage the brain and expand knowledge."},
        ],
        "Emotional": [
            {"name": "Practice Gratitude", "description": "Regularly acknowledge and appreciate the good in life."},
            {"name": "Practice Forgiveness", "description": "Release grudges and past hurts for emotional freedom."},
            {"name": "Visualize", "description": "Imagine positive scenarios and outcomes."},
            {"name": "Practice Acceptance", "description": "Embrace life's events without judgment."},
        ],
        "Social": [
            {"name": "Spend Time with Friends or Family", "description": "Connect with loved ones for emotional support."},
            {"name": "Volunteer", "description": "Give back to the community and find purpose."},
            {"name": "Stay Connected", "description": "Maintain social connections for emotional support."},
        ],
        "Nutritional": [
            {"name": "Eat Right", "description": "Consume a balanced diet for physical health and mental well-being."},
            {"name": "Listen to Your Body", "description": "Tune into physical cues for overall well-being."},
            {"name": "Stay Hydrated", "description": "Drink water regularly for physical and mental well-being."},
            {"name": "Consume Omega-3 Fatty Acids", "description": "Eat foods rich in omega-3s for brain health."},
            {"name": "Eat More Greens", "description": "Incorporate more vegetables into your diet for essential nutrients."},
        ],
    },
    # ------------------------------------------------------------ #
    "Relaxation Techniques": {
        "Physical": [
            {"name": "Deep Breathing", "description": "Regulate breathing to manage stress and anxiety."},
            {"name": "Take a Nap", "description": "A short rest to rejuvenate energy and mood."},
            {"name": "Get a Massage", "description": "Relieve physical tension and relax."},
            {"name": "Take a Hot Bath or Shower", "description": "Relax muscles and calm the mind."},
        ],
        "Mental": [
            {"name": "Limit Social Media", "description": "Reduce digital distractions and potential sources of stress."},
            {"name": "Clean and Organize", "description": "Maintain a tidy space for clarity and productivity."},
            {"name": "Read", "description": "Dive into books or articles to distract and enlighten the mind."},
            {"name": "Write", "description": "Pen down thoughts or engage in creative writing."},
            {"name": "Do Puzzles", "description": "Challenge the brain and focus on a task."},
            {"name": "Be Yourself", "description": "Embrace authenticity and individuality."},
        ],
        "Emotional": [
            {"name": "Laugh", "description": "Seek humor to lighten mood and reduce stress."},
            {"name": "Dream", "description": "Allow oneself to hope and aspire."},
            {"name": "Engage in a Hobby", "description": "Spend time on a personal interest or passion."},
            {"name": "Listen to Music", "description": "Enjoy melodies to relax and elevate mood."},
            {"name": "Take Breaks", "description": "Pause regularly to recharge during work or tasks."},
        ],
        "Social": [
            {"name": "Seek Out Beauty", "description": "Appreciate aesthetics in nature and art."},
            {"name": "Sing", "description": "Express oneself and release emotions through song."},
            {"name": "Dance", "description": "Move rhythmically to express emotion and release tension."},
            {"name": "Travel", "description": "Explore new places and cultures to gain perspective."},
            {"name": "Create Art", "description": "Express oneself creatively through various mediums."},
            {"name": "Garden", "description": "Connect with nature and nurture growth."},
            {"name": "Play Games", "description": "Engage in playful activities to relax and have fun."},
            {"name": "Listen to Podcasts or Audiobooks", "description": "Consume content that educates and entertains."},
            {"name": "Attend Religious Services", "description": "Engage in spiritual practices for solace and community."},
            {"name": "Pray or Meditate", "description": "Connect spiritually or practice mindfulness for inner peace."},
            {"name": "Use Essential Oils", "description": "Engage the senses with calming or invigorating scents."},
        ],
        "Nutritional": [
            {"name": "Drink Tea", "description": "Sip on herbal teas that can calm the nervous system."},
            {"name": "Limit Light at Night", "description": "Maintain a dark environment for better sleep."},
            {"name": "Go to Bed Early", "description": "Prioritize rest to rejuvenate mind and body."},
            {"name": "Wake Up Early", "description": "Start the day with a fresh perspective."},
            {"name": "Treat Yourself", "description": "Indulge in a treat or activity to boost mood."},
        ],
    }
}



if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")

        # Seeding categories and associated activities
        for category_name, activities in categories.items():
            category = Category.query.filter_by(name=category_name).first()
            if not category:  # If category doesn't already exist
                category = Category(name=category_name)
                db.session.add(category)
                db.session.flush()  # Flush to get the category id

            for activity_data in activities:
                activity = Activity.query.filter_by(name=activity_data["name"]).first()
                if not activity:  # If activity doesn't already exist
                    activity = Activity(name=activity_data["name"], description=activity_data["description"], category_id=category.id)
                    db.session.add(activity)

        db.session.commit()
        print("Seeding complete!")

