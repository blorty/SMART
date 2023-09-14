from config import app, db

with app.app_context():
    db.create_all()
    print("All tables have been created.")
