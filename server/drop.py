from config import app, db

with app.app_context():
    db.drop_all()
    print("All tables have been dropped.")
