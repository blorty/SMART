from flask import Flask
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, TIMESTAMP
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy
import flask_bcrypt as bcrypt
from flask_bcrypt import generate_password_hash, check_password_hash
from datetime import datetime 
from sqlalchemy import UniqueConstraint

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
        return generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

# Category Table
class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    name = Column(String(120), unique=True, nullable=False)
    activities = db.relationship('Activity', backref='category', lazy=True)

# Activity Table
class Activity(db.Model, SerializerMixin):
    __tablename__ = 'activities'

    id = Column(Integer, primary_key=True)
    name = Column(String(120), nullable=False)
    description = Column(String(500), nullable=True)
    category_id = Column(Integer, ForeignKey('categories.id'), nullable=False)

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
