from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from datetime import datetime
import flask_bcrypt as bcrypt
from config import db

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

# User Table
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(120), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(128), nullable=False)

    @validates('password')
    def convert_password(self, key, password):
        return bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

# Category Table
class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(120), unique=True, nullable=False)
    description = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=True)

    activities = db.relationship('Activity', back_populates='category', lazy=True, cascade="all, delete-orphan")

    serialize_rules = ('-activities',)  # Exclude activities from serialization to prevent circular references


    # Utility method example
    def get_all_activities(self):
        return [activity.name for activity in self.activities]

# Activity Table
class Activity(db.Model, SerializerMixin):
    __tablename__ = 'activities'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(120), nullable=False, index=True)
    description = Column(String(500), nullable=True)
    multimedia_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=True)
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)

    category = db.relationship('Category', back_populates='activities')

    serialize_rules = ('-category',)  # Exclude category from serialization to prevent circular references

# Session Table
class Session(db.Model, SerializerMixin):
    __tablename__ = 'sessions'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    activity_id = Column(Integer, ForeignKey('activities.id'))
    timestamp = Column(DateTime, default=datetime.utcnow)

# Reminder Table
class Reminder(db.Model, SerializerMixin):
    __tablename__ = 'reminders'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    session_id = Column(Integer, ForeignKey('sessions.id'))
    reminder_time = Column(DateTime, nullable=False)

# Feedback Table
class Feedback(db.Model, SerializerMixin):
    __tablename__ = 'feedbacks'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    session_id = Column(Integer, ForeignKey('sessions.id'))
    feedback_text = Column(String(500), nullable=False)
    rating = Column(Integer, nullable=False)

# Progress Table
class Progress(db.Model, SerializerMixin):
    __tablename__ = 'progresses'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    progress_description = Column(String(500), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
