from flask import Flask, current_app
from .models import db
from .views import main, jwt,Bcrypt,UPLOAD_FOLDER
from flask_cors import CORS


def create_app():
    app=Flask(__name__)
    app.config['MYSQL_CHARSET'] = 'utf8mb4'
    app.config['SQLALCHEMY_DATABASE_URI']='mysql://root:test@localhost/jimmy?charset=utf8'
    app.config['UPLOAD_FOLDER']=UPLOAD_FOLDER 
    app.config['SECRET_KEY']="G:\x8d\xa5q\xec\xa9\xc3\x86v\tmMV\xcd\x15\xb8#\x07B\xcb\xbc\\\xfd\x1d\x07$p\xcd]\xc4qC\xf7 \xca(\xff\xc9\xcd\xea\xe3\xc3\x07[\x03\xdaef\xcc<q\xe8Pi:\xaab.\x8f\x03Z{\xab"
    SESSION_COOKIE_SECURE = True
    REMEMBER_COOKIE_SECURE = True 
    with app.app_context():
        db.init_app(app)
        db.create_all()
        jwt.init_app(app)
        Bcrypt.init_app(app)
        CORS(app)
    from .views import main
    app.register_blueprint(main)
    
    return app