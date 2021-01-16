from sqlalchemy import Column
from flask_sqlalchemy import SQLAlchemy
import datetime
import time
from datetime import datetime as dt

db=SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    FirstName = db.Column(db.String(255),nullable=False)
    Lastname = db.Column(db.String(255),nullable=False)
    Email = db.Column(db.String(255),unique=False,nullable=False)
    Phone = db.Column(db.String(255),nullable=False)
    Password = db.Column(db.String(255),nullable=False)
    Birth = db.Column(db.String(255),nullable=False)
    Photo = db.Column(db.Text, nullable=True)
    Role = db.Column(db.String(255), default='Admin')
    Created_at = db.Column(db.DateTime,default=datetime.date.today())


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer , primary_key=True)
    Name = db.Column(db.String(255), nullable=False)
    Color = db.Column(db.String(255), nullable=True)
    Icon= db.Column(db.String(255), nullable=True)
    products = db.relationship('Product', backref='category')
    subCategories = db.relationship('SubCategory', backref='Category', lazy=True)

class SubCategory(db.Model):
    __tablename__ = 'sub_categories'

    id = db.Column(db.Integer , primary_key=True)
    Name = db.Column(db.String(255), nullable=False)
    products = db.relationship('Product', backref='subCategory')
    CategoryId = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)

class Type(db.Model):
    __tablename__ = 'types'
    
    id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(255), nullable=False)
    CategoryId = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    SubCategoryId = db.Column(db.Integer, db.ForeignKey('sub_categories.id'), nullable=False)


    

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer , primary_key=True)
    FirstName = db.Column(db.String(255), nullable=False)
    LastName = db.Column(db.String(255), nullable=False)
    Address = db.Column(db.String(255), nullable=False)
    Phone = db.Column(db.String(255), nullable=False)
    products_detailes = db.Column(db.Text, nullable=False)
    wilaya = db.Column(db.String(255),nullable=False)
    commune = db.Column(db.String(255),nullable=False)
    Ordered_at = db.Column(db.DateTime,nullable=False,default=datetime.date.today())
    Status = db.Column(db.String(255),nullable=False, default='En attente')
    Totale = db.Column(db.String(500),nullable=False,default="0")
    Shipped_by = db.Column(db.Integer, default=-1, nullable=True)
    Created_at = db.Column(db.DateTime,nullable=False,default=datetime.date.today())
    Edited_at = db.Column(db.DateTime,nullable=False,default=datetime.date.today())
    
class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer , primary_key=True)
    Name = db.Column(db.String(255), nullable=False)
    Details=db.Column(db.Text,nullable=True)
    Description = db.Column(db.Text , nullable=True)
    Photo = db.Column(db.String(255), nullable=True)
    BuyPrice = db.Column(db.String(255), nullable=False)
    SellPrice = db.Column(db.String(255), nullable=False)
    Qte = db.Column(db.Integer)
    QteAlert = db.Column(db.Integer)
    Photos = db.Column(db.Text, nullable=True)
    AddedBy = db.Column(db.String(255), nullable=False)
    Created_at = db.Column(db.DateTime,nullable=False,default=datetime.date.today())
    Edited_at = db.Column(db.DateTime,nullable=False,default=datetime.date.today())
    categorie_id = db.Column(db.Integer, db.ForeignKey(Category.id))
    sub_categorie_id = db.Column(db.Integer, db.ForeignKey(SubCategory.id))
    type_id = db.Column(db.Integer, db.ForeignKey(Type.id))
    pourcentage = db.Column(db.Integer, default=0)
    prixpromo = db.Column(db.Integer, default=0)


class SiteSettings(db.Model):
    __tablename__ = "sitesettings"
    
    id = db.Column(db.Integer , primary_key=True)
    SlidePhotos = db.Column(db.Text)
    photosnumber = db.Column(db.Integer)




class Delivrer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(255),nullable=True)
    LastName = db.Column(db.String(255),nullable=True)
    Mail = db.Column(db.String(255),nullable=True)
    Phone = db.Column(db.String(255), nullable=True)
    Region = db.Column(db.Text,nullable=True)
    Password = db.Column(db.String(1000),nullable=True)
    Photo = db.Column(db.String(1000),nullable=True)
    Orders = db.Column(db.Text,nullable=True)
    Date = db.Column(db.DateTime,nullable=False,default=datetime.date.today())

class Caisse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    DelivryPrice = db.Column(db.String(255),nullable=True)
    TotaleLivreur= db.Column(db.String(255),nullable=True)
    Benifice = db.Column(db.String(255),nullable=True)
    Details = db.Column(db.Text,nullable=True)
    Date = db.Column(db.DateTime,nullable=False,default=datetime.date.today())


class Confermatrice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(255),nullable=True)
    LastName = db.Column(db.String(255),nullable=True)
    Mail = db.Column(db.String(255),nullable=True)
    Phone = db.Column(db.String(255), nullable=True)
    Password = db.Column(db.String(1000),nullable=True)
    Photo = db.Column(db.String(1000),nullable=True)
    Orders = db.Column(db.Text,nullable=True)
    Date = db.Column(db.DateTime,nullable=False,default=datetime.date.today())
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(255),nullable=True)
    Mail = db.Column(db.String(255),nullable=True)
    Phone = db.Column(db.String(255), nullable=True)
    Msg = db.Column(db.Text,nullable=True)