from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import validates, backref
from sqlalchemy import MetaData
import flask_bcrypt as bcrypt
from datetime import datetime
import base64

from config import db

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    email = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    avatar_data = db.Column(db.LargeBinary, nullable=True)
    
    happy_notes = db.relationship('HappyNote', backref='user', lazy=True)

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        if password is not None:
            password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
            self._password_hash = password_hash.decode('utf-8')
        else:
            self._password_hash = None

    def authenticate(self, password):
        hashed_input_password = bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')
        print("Stored Hash:", self.password_hash)
        print("Input Password Hash:", hashed_input_password)
        return bcrypt.check_password_hash(self.password_hash, password)


    def serialize(self):
        avatar_data_encoded = base64.b64encode(self.avatar_data).decode('utf-8') if self.avatar_data else None
        return {
            'user_id': self.user_id,
            'username': self.username,
            'email': self.email,
            'avatar_data': avatar_data_encoded  # This will now be a base64 encoded string
        }


class HappyNote(db.Model, SerializerMixin):
    __tablename__ = 'happynotes'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    serialize_rules = ('-user',)  # Exclude the user relationship from serialization


class MainCategory(db.Model):
    __tablename__ = 'main_categories'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, unique=True, nullable=False)
    
    subcategories = db.relationship('SubCategory', backref='main_category', lazy=True)


class SubCategory(db.Model):
    __tablename__ = 'subcategories'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    
    main_category_id = db.Column(db.Integer, db.ForeignKey('main_categories.id'), nullable=False)
    activities = db.relationship('Activity', backref='subcategory', lazy=True)


class Activity(db.Model):
    __tablename__ = 'activities'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    
    subcategory_id = db.Column(db.Integer, db.ForeignKey('subcategories.id'), nullable=False)


def __init__(self, name, description, subcategory_id):
    self.name = name
    self.description = description
    self.subcategory_id = subcategory_id


