# Local imports
from app import app
from models import db, Category, Activity

categories = {
    #Focus on activities that have a direct physical impact or are related to body care.
    "Physical": 
    [
        {"name": "Exercise", "description": "Engage in physical activity to boost mood and health."},
        {"name": "Deep Breathing", "description": "Regulate breathing to manage stress and anxiety."},
        {"name": "Take a Nap", "description": "A short rest to rejuvenate energy and mood."},
        {"name": "Get a Massage", "description": "Relieve physical tension and relax."},
        {"name": "Practice Yoga", "description": "Combine physical postures and meditation for holistic health."},
        {"name": "Take a Hot Bath or Shower", "description": "Relax muscles and calm the mind."},
        {"name": "Practice Good Posture", "description": "Maintain alignment to reduce physical stress."},
        {"name": "Stay Active", "description": "Maintain regular movement for health benefits."},
        {"name": "Eat Right", "description": "Consume a balanced diet for physical health and mental well-being."},
        {"name": "Drink Tea", "description": "Sip on herbal teas that can calm the nervous system."},
        {"name": "Stay Hydrated", "description": "Drink water regularly for physical and mental well-being."},
        {"name": "Limit Light at Night", "description": "Maintain a dark environment for better sleep."},
        {"name": "Go to Bed Early", "description": "Prioritize rest to rejuvenate mind and body."},
        {"name": "Wake Up Early", "description": "Start the day with a fresh perspective."},
        {"name": "Listen to Your Body", "description": "Tune into physical cues for overall well-being."},
        {"name": "Treat Yourself", "description": "Indulge in a treat or activity to boost mood."}
    ],

    #Activities related to mental well-being, thinking patterns, and cognitive tasks.
    "Mental": 
    [
        {"name": "Meditate", "description": "Practice mindfulness to calm the mind and reduce stress."},
        {"name": "Limit Social Media", "description": "Reduce digital distractions and potential sources of stress."},
        {"name": "Avoid Procrastination", "description": "Tackle tasks promptly to reduce future stress."},
        {"name": "Prioritize Tasks", "description": "Order tasks based on importance to manage workload."},
        {"name": "Limit Multitasking", "description": "Focus on one task at a time to improve efficiency."},
        {"name": "Face Your Financial Fears", "description": "Address financial concerns proactively to reduce stress."},
        {"name": "Clean and Organize", "description": "Maintain a tidy space for clarity and productivity."},
        {"name": "Look for Positive News", "description": "Seek uplifting stories to foster a positive mindset."},
        {"name": "Limit News Intake", "description": "Reduce exposure to potentially distressing news."},
        {"name": "Unplug from Technology", "description": "Take breaks from digital devices to mentally recharge."},
        {"name": "Read", "description": "Dive into books or articles to distract and enlighten the mind."},
        {"name": "Write", "description": "Pen down thoughts or engage in creative writing."},
        {"name": "Set Boundaries", "description": "Establish limits to maintain personal space and energy."},
        {"name": "Challenge Negative Thoughts", "description": "Reframe unhelpful patterns of thinking."},
        {"name": "Learn Something New", "description": "Engage the brain and expand knowledge."},
        {"name": "Do Puzzles", "description": "Challenge the brain and focus on a task."},
        {"name": "Look for the Good", "description": "Seek positivity in every situation."},
        {"name": "Be Yourself", "description": "Embrace authenticity and individuality."},
    ],

    #Activities that focus on emotional well-being and self-awareness
    "Emotional": 
    [
        {"name": "Laugh", "description": "Seek humor to lighten mood and reduce stress."},
        {"name": "Practice Gratitude", "description": "Regularly acknowledge and appreciate the good in life."},
        {"name": "Practice Forgiveness", "description": "Release grudges and past hurts for emotional freedom."},
        {"name": "Visualize", "description": "Imagine positive scenarios and outcomes."},
        {"name": "Dream", "description": "Allow oneself to hope and aspire."},
        {"name": "Do Something Kind for Someone Else", "description": "Engage in acts of kindness to uplift oneself and others."},
        {"name": "Avoid Alcohol", "description": "Limit or eliminate alcohol to maintain emotional balance."},
        {"name": "Limit Caffeine", "description": "Reduce caffeine to prevent jitters and anxiety."},
        {"name": "Avoid Sugar", "description": "Limit sugar intake to prevent mood swings."},
        {"name": "Eat Chocolate", "description": "Consume in moderation for mood-enhancing benefits."},
        {"name": "Chew Gum", "description": "A simple act to reduce anxiety and stress."},
        {"name": "Color", "description": "Engage in coloring to focus and relax the mind."},
        {"name": "Practice Acceptance", "description": "Embrace life's events without judgment."},
        {"name": "Engage in a Hobby", "description": "Spend time on a personal interest or passion."},
        {"name": "Listen to Music", "description": "Enjoy melodies to relax and elevate mood."},
        {"name": "Take Breaks", "description": "Pause regularly to recharge during work or tasks."},
        {"name": "Take a Vacation or Day Trip", "description": "Change scenery to break routine and refresh."}
    ],

    #Activities related to social interaction, community engagement, and relationships.
    "Social": 
    [
        {"name": "Spend Time with Friends or Family", "description": "Connect with loved ones for emotional support."},
        {"name": "Volunteer", "description": "Give back to the community and find purpose."},
        {"name": "Seek Out Beauty", "description": "Appreciate aesthetics in nature and art."},
        {"name": "Sing", "description": "Express oneself and release emotions through song."},
        {"name": "Dance", "description": "Move rhythmically to express emotion and release tension."},
        {"name": "Travel", "description": "Explore new places and cultures to gain perspective."},
        {"name": "Create Art", "description": "Express oneself creatively through various mediums."},
        {"name": "Garden", "description": "Connect with nature and nurture growth."},
        {"name": "Play Games", "description": "Engage in playful activities to relax and have fun."},
        {"name": "Listen to Podcasts or Audiobooks", "description": "Consume content that educates and entertains."},
        {"name": "Limit Time on Your Phone", "description": "Reduce screen time to be present in the moment."},
        {"name": "Seek Out Inspiration", "description": "Find sources of motivation and creativity."},
        {"name": "Stay Connected", "description": "Maintain social connections for emotional support."},
        {"name": "Attend Religious Services", "description": "Engage in spiritual practices for solace and community."},
        {"name": "Pray or Meditate", "description": "Connect spiritually or practice mindfulness for inner peace."},
        {"name": "Use Essential Oils", "description": "Engage the senses with calming or invigorating scents."},
    ],

    #Activities related to nutrition.
    "Nutritional": 
    [
        {"name": "Eat Right", "description": "Consume a balanced diet for physical health and mental well-being."},
        {"name": "Limit Stimulants", "description": "Reduce intake of substances that can increase stress."},
        {"name": "Listen to Your Body", "description": "Tune into physical cues for overall well-being."},
        {"name": "Limit Caffeine", "description": "Reduce caffeine to prevent jitters and anxiety."},
        {"name": "Avoid Sugar", "description": "Limit sugar intake to prevent mood swings."},
        {"name": "Stay Hydrated", "description": "Drink water regularly for physical and mental well-being."},
        {"name": "Consume Omega-3 Fatty Acids", "description": "Eat foods rich in omega-3s for brain health."},
        {"name": "Eat More Greens", "description": "Incorporate more vegetables into your diet for essential nutrients."},
        {"name": "Limit Processed Foods", "description": "Avoid foods with added preservatives and chemicals."},
        {"name": "Treat Yourself", "description": "Indulge in a treat or activity to boost mood, but in moderation."},
    ]
}


if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")

        # Seeding categories and associated activities
        for category_name, activities in categories.items():
            category = Category(name=category_name)
            db.session.add(category)
            db.session.flush()  # Flush to get the category id

            for activity_data in activities:
                activity = Activity(name=activity_data["name"], description=activity_data["description"], category_id=category.id)
                db.session.add(activity)

        db.session.commit()
        print("Seeding complete!")

