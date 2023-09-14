
from config import app, db
from models import MainCategory, SubCategory, Activity
from datetime import datetime

relaxation_techniques_data = {
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

def seed_relaxation_techniques():
    # Step 1: Create main category for Relaxation Techniques
    rt_category = MainCategory.query.filter_by(name="Relaxation Techniques").first()
    if not rt_category:
        rt_category = MainCategory(name="Relaxation Techniques")
        db.session.add(rt_category)
        db.session.commit()

# Step 2: Create subcategories under Relaxation Techniques
    for subcategory_name, activities in relaxation_techniques_data.items():
        subcategory = SubCategory.query.filter_by(name=subcategory_name).first()
        if not subcategory:
            subcategory = SubCategory(name=subcategory_name, main_category_id=rt_category.id)
            db.session.add(subcategory)
            db.session.commit()
        
        for activity_data in activities:
            activity = Activity.query.filter_by(name=activity_data["name"]).first()
            if not activity:
                activity = Activity(
                    name=activity_data["name"],
                    description=activity_data["description"],
                    subcategory_id=subcategory.id, 
                )
                db.session.add(activity)
        db.session.commit()


if __name__ == "__main__":
    with app.app_context():
        seed_relaxation_techniques()
        print("Relaxation Techniques seeded!")


