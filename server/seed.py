from config import app, db
from models import User, Session, Contact

if __name__ == '__main__':
    with app.app_context():
        print('Seeding...')
        db.create_all()

         # Clear existing data
        db.session.query(User).delete()
        db.session.query(Session).delete()

        users = []
        # Seed users
        for user_data in users:
            user = User(**user_data)
            db.session.add(user)

            session_log = Session(user_id=user.id, user_data=user_data)
            db.session.add(session_log)

        db.session.commit()

        # Seed the Contact class
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
