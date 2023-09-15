from config import app, db
from models import User, Contact

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

        # Seed the Nutrition class
        contacts = [
            {'name': 'testing', 'email': 'testing', 'message': 'testing'},
            {'name': 'testing', 'email': 'testing', 'message': 'testing'},
            # Add more contact data as needed
        ]

        for data in contacts:
            contact = Contact(
                name='',
                email=data['email'],
                message=data['message'],
            )
            db.session.add(contact)

        db.session.commit()

        for user in users:
            db.session.add(user)
        print('Seeding complete!')
