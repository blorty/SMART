from config import app, db
from models import User, Message

if __name__ == '__main__':
    with app.app_context():
        print('Seeding...')
        db.create_all()

        # Sample users and messages data
        users = [
            User(username="user1", email="user1@example.com", password_hash="password1"),
            User(username="user2", email="user2@example.com", password_hash="password2"),
            # Add more users as needed
        ]

        messages = [
            Message(content="Hello", role="user"),
            Message(content="Hi there! How can I assist you today?", role="bot"),
            # Add more messages as needed
        ]

        for user in users:
            db.session.add(user)

        for message in messages:
            db.session.add(message)

        db.session.commit()

        print('Seeding complete!')
