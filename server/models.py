from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import validates, backref
from sqlalchemy import MetaData
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


