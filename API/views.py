from flask import Blueprint, jsonify, request
from .models import db,Users,Category,SubCategory,Type,Product, SiteSettings,Order,Delivrer,Caisse,Confermatrice,Contact
from flask_jwt_extended import JWTManager, create_access_token,jwt_required,create_refresh_token,get_jwt_identity, get_jwt_claims
from flask_bcrypt import Bcrypt
import bcrypt
from werkzeug.utils import secure_filename
import uuid
import os
import io
import base64
from PIL import Image
from os.path import join, dirname, realpath
import json
from PIL import Image
import datetime
import time

UPLOADS_PATH = join(dirname(realpath(__file__)), 'static/products/')
UPLOAD_FOLDER=UPLOADS_PATH
main = Blueprint('main',__name__)
jwt= JWTManager()
Bcrypt=Bcrypt()
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}



@jwt.user_claims_loader
def add_claims_to_access_token(identity):
    return {
        'hello': identity,
        'foo': ['bar', 'baz']
    }

def get_encoded_img(image_path):
    img = Image.open(image_path, mode='r')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    my_encoded_img = base64.encodebytes(img_byte_arr.getvalue()).decode('ascii')
    return my_encoded_img

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@main.route('/AddUser',methods=['POST'])
@jwt_required
def AddUser():
    if request.method=="POST":
        password=request.form['password'].encode('utf-8')
        salt=bcrypt.gensalt()
        hashed = bcrypt.hashpw(password, salt)
        new_user= Users(FirstName=request.form['first_name'], Lastname=request.form['last_name'] , Email=request.form['email'] , Phone=request.form['phone'] , Password=hashed,Birth=request.form['birth'])
        db.session.add(new_user)
        db.session.commit()
    return 'Done',201

@main.route('/AllUsers',methods=['GET','POST'])
@jwt_required
def AllUsers():
    if request.method=="POST":
        user1=Users.query.filter_by(id=int(request.form["id"])).first()
        db.session.delete(user1)
        db.session.commit()
    users=[]
    users_object_list=Users.query.all()
    for i in users_object_list:
        users.append({"id":i.id,"Nom": i.FirstName , "Prénom":i.Lastname, "Email" : i.Email , "Num" : i.Phone, "Birth" : i.Birth })
    
    return jsonify({'users' : users})


@main.route('/login' , methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']
    user = Users.query.filter_by(Email=email).first()
    livreur = Delivrer.query.filter_by(Mail=email).first()
    confermatrice = Confermatrice.query.filter_by(Mail=email).first()
    if user:
        if Bcrypt.check_password_hash(user.Password,password):
            expires = datetime.timedelta(days=2)
            acess_token = create_access_token(identity = {'firstname': user.FirstName, 'lastname': user.Lastname,'email': user.Email,'role':user.Role,'id': user.id },expires_delta=expires)
            result = jsonify({'token':acess_token,"user":get_jwt_identity()},201)
        else:
            
            result = jsonify({"error" : "invalid email or password"},401)
        return result
    if livreur:
        if Bcrypt.check_password_hash(livreur.Password,password):
            acess_token = create_access_token(identity = {'firstname': livreur.Name, 'lastname': livreur.LastName,'email': livreur.Mail,'role':"Livreur",'id':livreur.id })
            result = jsonify({'token':acess_token,"user":get_jwt_identity()},201)
        else:
            
            result = jsonify({"error" : "invalid email or password"},401)
        return result
    if confermatrice:
        if Bcrypt.check_password_hash(confermatrice.Password,password):
            acess_token = create_access_token(identity = {'firstname': confermatrice.Name, 'lastname': confermatrice.LastName,'email': confermatrice.Mail,'role':"Confermatrice",'id':confermatrice.id })
            result = jsonify({'token':acess_token,"user":get_jwt_identity()},201)
        else:
            
            result = jsonify({"error" : "invalid email or password"},401)
        return result

    
    
    else:
        return jsonify({"error" : "invalid email or password"},401)

@main.route('/Dashboard/AddCategory',methods=['POST'])
@jwt_required
def AddCategory():
    if request.method=="POST":
        if request.files:
            file = request.files['file']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(UPLOAD_FOLDER, filename))
                new_categorie=Category(Name=request.form['name'],Color=request.form["couleur"],Icon=filename)
                db.session.add(new_categorie)
                db.session.commit()
    return 'Done',201

@main.route('/Dashboard/ManageCategories',methods=['GET','POST'])
@jwt_required
def ManageCategories():
    current_user = get_jwt_identity()
    if request.method=="POST":
        Categories=Category.query.filter_by(id=int(request.form["id"])).first()
        path = os.path.join(UPLOAD_FOLDER, Categories.Icon)
        db.session.delete(Categories)
        db.session.commit()
        os.remove(path)
    Categories=Category.query.all()
    Categories_list=[]
    for i in Categories:
        Categories_list.append({"id": i.id , "Name":i.Name,"Color":i.Color,"Icon":i.Icon})
    return jsonify({'Categories': Categories_list})

@main.route('/Dashboard/ManageCategories2',methods=['GET'])
def ManageCategories2():
    Categories=Category.query.all()
    Categories_list=[]
    for i in Categories:
        Categories_list.append({"id": i.id , "Name":i.Name,"Color":i.Color,"Icon":i.Icon})
    return jsonify({'Categories': Categories_list})

@main.route('/Dashboard/EditCategories/<int:id>',methods=['GET','POST'])
@jwt_required
def EditCategories(id):
    Categories=Category.query.filter_by(id=id).first()
    Categories_list=[]
    if request.method =="POST":
        Categories.Name=request.form["name"]
        db.session.add(Categories)
        db.session.commit()
    Categories_list.append({"id": Categories.id , "Name":Categories.Name})
    return jsonify({'Categories_list': [{'id' : Categories.id, 'Name': Categories.Name}]})
@main.route('/Dashboard/DeleteCategories/<int:id>',methods=['GET','POST'])
@jwt_required
def DeleteCategories(id):
    Categories_list=[]
    Categories=Category.query.filter_by(id=id).first()
    Categories_list.append({"id": Categories.id , "Name":Categories.Name})
    if request.method=="POST":
        db.session.delete(Categories)
        db.session.commit()
        return "Done", 201
    return jsonify({"Categories_list" : Categories_list})

@main.route('/Dashboard/AddSubCategory',methods=['GET','POST'])
@jwt_required
def AddSubCategory():
    if request.method=="POST":
        new_sub_category = SubCategory(Name=request.form['name'],CategoryId=request.form['mother_name'])
        db.session.add(new_sub_category)
        db.session.commit()
    return 'Done',201

@main.route('/Dashboard/ManageSubCategories',methods=['GET','POST'])
def ManageSubCategories():
    Categories_list=[]
    temp=Category.query.all()
    Categories=SubCategory.query.all()
    for i in temp:
        for k in Categories:
            if k.CategoryId == i.id:
                Categories_list.append({"id": k.id , "Name": k.Name, "Mother": i.Name,"Motherid":i.id})
    
        
    return jsonify({'Categories': Categories_list})

@main.route('/Dashboard/EditSubCategories/<int:id>',methods=['GET','POST'])
@jwt_required
def EditSubCategories(id):
    SubCategories=SubCategory.query.filter_by(id=id).first()
    Categories_list=[]
    Categories_list.append({"id": SubCategories.id , "Name": SubCategories.Name, "Mother": SubCategories.Name})
    if request.method=="POST":
        SubCategories.Name=request.form["name"]
        SubCategories.CategoryId=request.form["Mother"]
        db.session.add(SubCategories)
        db.session.commit()
        Categories_list=[]
        Categories_list.append({"id": SubCategories.id , "Name": SubCategories.Name, "Mother": SubCategories.Name})
        return jsonify({'Categories_list':Categories_list})
    return jsonify({'Categories_list':Categories_list})

@main.route('/Dashboard/DeleteSubCategories/<int:id>',methods=['GET','POST'])
@jwt_required
def DeleteSubCategories(id):    
    Categories_list=[]
    Categories=SubCategory.query.filter_by(id=id).first()
    Categories_list.append({"id": Categories.id , "Name":Categories.Name})
    if request.method=="POST":
        db.session.delete(Categories)
        db.session.commit()
        return "Done", 201
    return jsonify({"Categories_list" : Categories_list})

@main.route('/Dashboard/AddType',methods=['GET','POST'])
@jwt_required
def AddType():
    categories=Category.query.all()
    subcategories=SubCategory.query.all()
    if request.method=="POST":
        new_type=Type(Name=request.form['name'],CategoryId=request.form['mother_name'],SubCategoryId=request.form['subcategorie'])
        db.session.add(new_type)
        db.session.commit()
    return 'Done',201

@main.route('/Dashboard/ManageTypes',methods=['GET','POST'])
def ManageTypes():
    types_list=[]
    Categories=Category.query.all()
    types=Type.query.all()
    SubCategories=SubCategory.query.all()
    for i in Categories:
        for k in SubCategories:
            for z in types:
                if z.SubCategoryId == k.id and z.CategoryId == i.id:
                    types_list.append({"id": z.id , "Name": z.Name,"Subcategory":k.Name ,"Mother": i.Name , "Subid":k.id})
    return jsonify({'types': types_list})

@main.route('/Dashboard/EditTypes/<int:id>',methods=['GET','POST'])
@jwt_required
def EditTypes(id):
    types=Type.query.filter_by(id=id).first()
    Categories_list=[]
    Categories_list.append({"id": types.id , "Name": types.Name, "SubCategorie": types.SubCategoryId, "Category": types.CategoryId})
    if request.method=="POST":
        types.Name=request.form["name"]
        types.SubCategoryId=request.form["subcategorie"]
        types.CategoryId=request.form["Mother"]
        db.session.add(types)
        db.session.commit()
        Categories_list=[]
        Categories_list.append({"id": types.id , "Name": types.Name, "SubCategorie": types.SubCategoryId, "Category": types.CategoryId})
        return jsonify({"Categories_list" : Categories_list})
        
    return jsonify({"Categories_list" : Categories_list})

@main.route('/Dashboard/DeleteType/<int:id>',methods=['GET','POST'])
@jwt_required
def DeleteType(id):
    Categories_list=[]
    Categories=Type.query.filter_by(id=id).first()
    Categories_list.append({"id": Categories.id , "Name":Categories.Name})
    if request.method=="POST":
        db.session.delete(Categories)
        db.session.commit()
        return "Done", 201
    return 'Done',201

@main.route('/Dashboard/AddProduct',methods=['POST'])
@jwt_required
def AddProduct():
    if request.method=="POST":
        filelist=[]
        for i in range(len(request.files)):
            filelist.append(request.files["images["+str(i)+"]"])    
        details=json.loads(request.form["SpecialProducts"])
        for i in filelist:
            verifying = secure_filename(i.filename)
            filename_extention = i.filename.split('.')[1]
            unique_filename=uuid.uuid4()
            i.filename = str(unique_filename)+'.'+filename_extention
            details["multipleproducts"][filelist.index(i)]["Photo"]=i.filename
            image=Image.open(i)
            new_image = image.resize((400, 400))
            new_image.save(os.path.join(UPLOAD_FOLDER, i.filename))
            photo=details["multipleproducts"][0]["Photo"]
        
        new_product=Product(Name=request.form['name'],Photo=photo,Details=json.dumps(details),Description=request.form['descrption'],categorie_id=request.form['mother_name'],sub_categorie_id=request.form['subcategorie'],type_id=request.form['type'],Qte=request.form['qte'],QteAlert=request.form['qtea'],BuyPrice=request.form['buyprice'],SellPrice=request.form['sellprice'],AddedBy="1")
        db.session.add(new_product)
        db.session.commit()
        
        return "Done",201

@main.route('/Dashboard/ManageProducts',methods=['GET','POST'])
@jwt_required
def ManageProducts():
    if request.method=="POST":
        tobedeleted=Product.query.filter_by(id=int(request.form["id"])).first()
        db.session.delete(tobedeleted)
        db.session.commit()
    product_list=[]
    Categories=Category.query.all()
    types=Type.query.all()
    SubCategories=SubCategory.query.all()
    products = Product.query.all()
    for i in Categories:
        for k in SubCategories:
            for z in types:
                for x in products:
                    if x.type_id == z.id  and x.sub_categorie_id == k.id and x.categorie_id == i.id:
                        product_list.append({"id": x.id , "Name": x.Name,"Type":z.Name ,"Subcategory":k.Name ,"Mother": i.Name,"SellPrice":x.SellPrice , "Photos":x.Photo})

    
    return jsonify({'products': product_list})


@main.route('/Dashboard/EditProduct/<int:id>',methods=['GET', 'POST'])
@jwt_required
def EditProduct(id):
    product=Product.query.filter_by(id=id).first_or_404()
    Categories_list=[]
    if request.method=="POST":
        product.Name=request.form['name']
        product.Description=request.form['descrption']
        product.Qte= request.form['qte']
        product.QteAlert=request.form['qtea']
        product.BuyPrice=request.form['buyprice']
        product.SellPrice=request.form['sellprice']
  
        db.session.add(product)
        db.session.commit()
        
    Categories_list.append({"id": product.id , "Name": product.Name,"description": product.Description,"Type":product.type_id ,"Subcategory": product.sub_categorie_id ,"Mother": product.categorie_id , "BuyPrice": product.BuyPrice ,"SellPrice" : product.SellPrice,"Qtea": product.QteAlert, "Qte": product.Qte ,"Photos" : product.Photos,"Détails":product.Details})
    return jsonify({'Product' : Categories_list})


@main.route('/Settings',methods=['POST','GET'])
@jwt_required
def Settings():    
    photoList=""
    if request.method=="POST":
        if request.files:
            filelist=[]
            for i in range(len(request.files)):
                filelist.append(request.files["images["+str(i)+"]"])
            for i in filelist:
                verifying = secure_filename(i.filename)
                filename_extention = i.filename.split('.')[1]
                unique_filename=uuid.uuid4()
                i.filename = str(unique_filename)+'.'+filename_extention
                photoList=photoList+";"+i.filename
                i.save(os.path.join(UPLOAD_FOLDER, i.filename))
            newSlide=SiteSettings(SlidePhotos=photoList,photosnumber=len(filelist))
            db.session.add(newSlide)
            db.session.commit()
                
    return "Done",201

@main.route('/Slider',methods=['GET'])
def Slider():
    slides=SiteSettings.query.order_by(SiteSettings.id.desc()).first()
    if slides:
        splitedimgs=slides.SlidePhotos.split(";")
        splitedimgs=list(filter(None, splitedimgs))
        return jsonify({"Slides":splitedimgs})
    return jsonify({"Slides":[]})
@main.route('/Dashboard/EditUser/<int:id>',methods=['GET', 'POST'])
@jwt_required
def EditUser(id):
    users=Users.query.filter_by(id=int(id)).first_or_404()
    if request.method=="POST":
        firstname=request.form["first_name"]
        lastname=request.form["last_name"]
        email=request.form["email"]
        phone=request.form["phone"]
        password=request.form["password"].encode('utf-8')
        birth=request.form["birth"]
        users.FirstName=firstname
        users.Lastname=lastname
        users.Email=email
        users.Phone=phone
        users.Birth=birth
        salt=bcrypt.gensalt()
        hashed = bcrypt.hashpw(password, salt)
        users.Password=hashed
        db.session.add(users)
        db.session.commit()
    user={"id":users.id,"Name":users.FirstName,"Lastname":users.Lastname,"Email":users.Email,"Phone":users.Phone,"Password":users.Password,"Birth":users.Birth}
    
    return jsonify({"User":user})

@main.route('/Dashboard/DeleteUser/<int:id>',methods=['GET', 'POST'])
@jwt_required
def DeleteUser(id):
    if request.method=="POST":
        users=Userr.query.filter_by(id=id).first_or_404()
        db.session.delete(users)
        db.session.commit()
    return 'Done',201


@main.route('/ViewCategoryProducts/<string:category>/',methods=['GET','POST'])
def ViewCategoryProducts(category):
    Categories=Category.query.all()
    SubCategories=SubCategory.query.all()
    types=Type.query.all()
    ProductCategorie=Category.query.filter_by(Name=category).first()
    product=Product.query.filter_by(categorie_id=ProductCategorie.id).all()
    return 'Done',201

@main.route('/ViewSubCategoryProducts/<string:category>/<string:subcategory>/',methods=['GET','POST'])
def ViewSubCategoryProducts(category,subcategory):
    ProductCategorie=Category.query.filter_by(Name=category).first()
    ProductSubCategorie=SubCategory.query.filter_by(Name=subcategory).first()
    types=Type.query.all()
    product=Product.query.filter_by(categorie_id=ProductCategorie.id , sub_categorie_id=ProductSubCategorie.id).first()
    Categories=Category.query.all()
    SubCategories=SubCategory.query.all()
    return 'Done',201

@main.route('/FirstCategoryProducts',methods=['GET','POST'])
def FirstCategoryProducts():
    ProductList=[]
    FirstCategory=Category.query.first()
    if FirstCategory:
        FirstCategoryProducts=Product.query.filter_by(categorie_id=FirstCategory.id).all()
    if FirstCategory:
        for i in FirstCategoryProducts:
            ProductList.append({"id" : i.id , "Name" : i.Name , "Description" : i.Description ,"SellPrice" : i.SellPrice,"Photos":i.Photo,"Category":i.categorie_id,"SubCategory":i.sub_categorie_id , "Type":i.type_id,"Pourcentage":i.pourcentage,"PrixPromo":i.prixpromo})
        return jsonify({'products':ProductList})
    else:
        return jsonify({'products': []})


@main.route('/ViewTypeProducts/<int:category>/<int:subcategory>/<int:types>',methods=['GET','POST'])
def ViewTypeProducts(category,subcategory,types):
    ProductCategorie=Category.query.filter_by(id=int(category)).first()
    ProductSubCategorie=SubCategory.query.filter_by(id=int(subcategory)).first()
    ProductTypes=Type.query.filter_by(id=int(types)).first()
    products=Product.query.filter_by(categorie_id=ProductCategorie.id , sub_categorie_id=ProductSubCategorie.id,type_id=ProductTypes.id)
    products_list=[]
    if products:
        for i in products:
            products_list.append({"id" : i.id , "Name" : i.Name , "Description" : i.Description ,"SellPrice" : i.SellPrice,"Photos":i.Photo,"Category":i.categorie_id,"SubCategory":i.sub_categorie_id , "Type":i.type_id,"Pourcentage":i.pourcentage,"PrixPromo":i.prixpromo})
        return jsonify({'products':products_list})
    else:
        return jsonify({'products': []})

@main.route('/ProductView/<int:id>',methods=['GET','POST'])
def ProductView(id):
    Categories=Category.query.all()
    SubCategories=SubCategory.query.all()
    types=Type.query.all()
    product=Product.query.filter_by(id=id).first()
    oneproduct={"id":product.id,"Name":product.Name,"Details":product.Details,"Description":product.Description,"Photo":product.Photo,"SellPrice":product.SellPrice,"Qte":product.Qte}
   
    return jsonify({"Product":oneproduct})


@main.route('/Dashboard/HomePageProducts',methods=['GET','POST'])
def HomePageProducts():
    HomePageProductsList=[]
    categories=Category.query.all()
    for i in categories:
        Products=Product.query.filter_by(categorie_id=i.id).limit(10).all()
        if Products:
            for j in Products:
                HomePageProductsList.append({'id':j.id,'Name':j.Name,"Photo":j.Photo,"SellPrice":j.SellPrice,"Category":i.id,"Pourcentage":j.pourcentage,"Promo":j.prixpromo})
    newlist = sorted(HomePageProductsList, key=lambda k: k['Category']) 
 
    return jsonify({'HomePageProductsList':newlist})

@main.route('/Dashboard/AddOrder',methods=['POST'])
def AddOrder():
    y=request.form["Products"].encode("utf-8")
    final_json=eval(y)
    orderedProducts=[] 
    s=0
    cpt=0
    valide=False
    if len(final_json)==7:
        product=Product.query.filter_by(id=int(final_json["id"])).first()
        productjson=json.loads(product.Details)
        details=productjson["multipleproducts"]
        
        if product.id == final_json["id"]:
            if product.SellPrice==final_json["SellPrice"]:
                for j in details:
                    if j["Photo"] == final_json["Photos"]:
                        for k in j["detailed"]:
                            if k["Taille"]==final_json["Taille"]:
                                if int(k["Quantité"]) >= int(final_json["count"]):
                                    valide=True
                                    newqte=int(k["Quantité"])-int(final_json["count"])
                                    k["Quantité"]=str(newqte)
                                    
                    
                        product.Details=json.dumps(productjson)
                        db.session.add(product)
                        db.session.commit()
                        s=s+(int(final_json["count"])*int(final_json["SellPrice"]))
                    
    else:
        for i in final_json:
            orderedProducts.append(Product.query.filter_by(id=int(i["id"])).first())
            s=s+(int(i["count"])*int(i["SellPrice"]))
      
        myjson=[]
        cpt=0
        for i in orderedProducts:
            productjson=json.loads(i.Details)
            for j in productjson["multipleproducts"]:
                if i.id == final_json[cpt]["id"]:
                    if j["Photo"] == final_json[cpt]["Photos"]:
                        for k in j["detailed"]:
                            if k["Taille"]==final_json[cpt]["Taille"]:
                                if int(k["Quantité"]) >= int(final_json[cpt]["count"]):
                                    valide=True
                                    i.Qte=int(i.Qte)-int(final_json[cpt]["count"])
                                    newqte=int(k["Quantité"])-int(final_json[cpt]["count"])
                                    k["Quantité"]=str(newqte)
                                    i.Details=json.dumps(productjson)
                                    db.session.add(i)
                                    db.session.commit()
                                
            cpt=cpt+1
    if valide==True:        
        newOrder=Order(FirstName=request.form["nom"],LastName=request.form["Prenom"],Phone=request.form["Num"] ,wilaya=request.form["Wilaya"],commune=request.form["Commune"],Address=request.form["Adresse"],products_detailes=json.dumps(final_json),Totale=s)
        db.session.add(newOrder)
        db.session.commit()
        return "Done",201
    else:
        return jsonify({"Error":404})
@main.route('/Dashboard/ManageOrders',methods=['GET','POST'])
@jwt_required
def ManageOrders():
    PandingOrders=[]
    CancelledOrders=[]
    NotResponding=[]
    if request.method=="POST":
        updated=Order.query.filter_by(id=int(request.form["id"])).first()
        allDelivrer = Delivrer.query.all()
        delivrersid=[]
        whohaslessdelivery=[]
        finaldelivrer=[]
        if request.form["State"] == "Confirmer":
            if len(allDelivrer) > 1:
                for i in allDelivrer:
                    regions = i.Region.split(',')
                    if updated.wilaya in regions:
                        delivrersid.append(i)
                for i in delivrersid:
                    if i.Orders !=None and i.Orders !="":
                        x=i.Orders.split(";")
                        whohaslessdelivery.append({"id":i.id,"nbd":len(x)})
                    else:
                        whohaslessdelivery.append({"id":i.id,"nbd":0})
 
              
                if len(whohaslessdelivery)==1:
                    concerneddelivrer=Delivrer.query.filter_by(id=whohaslessdelivery[0]["id"]).first()
                    if concerneddelivrer.Orders ==None and concerneddelivrer.Orders =="":
                        concerneddelivrer.Orders=str(updated.id)
                        db.session.add(concerneddelivrer)
                        db.session.commit()
                    else:
                        x=concerneddelivrer.Orders.split(";")
                        x.append(str(updated.id))
                        updatedOrders=';'.join(x)
                        concerneddelivrer.Orders=updatedOrders
                        db.session.add(concerneddelivrer)
                        db.session.commit()
                else:
                    mine=whohaslessdelivery[0]
                    for j in range(len(whohaslessdelivery)):
                        for i in whohaslessdelivery:
                            x=int(i["nbd"])
                            y=int(mine["nbd"])
                            if y > x:
                                mine=i
                    
                    concerneddelivrer=Delivrer.query.filter_by(id=mine["id"]).first()
                    if concerneddelivrer.Orders ==None or concerneddelivrer.Orders =="":
                        concerneddelivrer.Orders=str(updated.id)
                        db.session.add(concerneddelivrer)
                        db.session.commit()
                    else:
                        x=concerneddelivrer.Orders.split(";")
                        x.append(str(updated.id))
                        updatedOrders=';'.join(x)
                        concerneddelivrer.Orders=updatedOrders 
                        db.session.add(concerneddelivrer)
                        db.session.commit()
            if len(allDelivrer)==1:
                regionList=allDelivrer[0].Region.split(',')
                passedOrders=allDelivrer[0].Orders
                if updated.wilaya in regionList:
                    if passedOrders == None or passedOrders=="":
                        
                        passedOrders=str(updated.id)
                        allDelivrer[0].Orders=passedOrders
                        db.session.add(allDelivrer[0])
                        db.session.commit()
                    else:
                        passedOrders=passedOrders.split(';')
                        passedOrders.append(str(updated.id))
                        updatedOrders=';'.join(passedOrders)
                        allDelivrer[0].Orders=updatedOrders
                        db.session.add(allDelivrer[0])
                        db.session.commit()
            updated.Status=request.form["State"]
            db.session.add(updated)
            db.session.commit()
        else:
            if request.form["State"] =="Annuler":
                db.session.delete(updated)
                db.session.commit()
            else:
                notorder=Order.query.filter_by(id=int(request.form["id"])).first()
                orderProducts=json.loads(notorder.products_detailes)
                if len(orderProducts) == 7:
                    willBeBackProduct=Product.query.filter_by(id=int(orderProducts["id"])).first()
                    details=json.loads(willBeBackProduct.Details)
                    details2=details["multipleproducts"]
                    for i in details2:
                        if i["Photo"]==orderProducts["Photos"]:
                            for j in i["detailed"]:
                                if j["Taille"]==orderProducts["Taille"]:
                                    newQte=int(j["Quantité"])+int(orderProducts["count"])
                                    j["Quantité"]=newQte
                                    details["multipleproducts"]=details2
                                    willBeBackProduct.Details=json.dumps(details)
                                    willBeBackProduct.Qte=willBeBackProduct.Qte+int(orderProducts["count"])
                                    db.session.add(willBeBackProduct)
                
                else:
                    willBeBackProducts=[]
                    for i in orderProducts:
                        temp=Product.query.filter_by(id=int(i["id"])).first()
                        details=json.loads(temp.Details)
                        details2=details["multipleproducts"]
                        for j in details2:
                            if i["Photos"] == j["Photo"]:
                                for k in j["detailed"]:
                                    if k["Taille"]== i["Taille"]:
                                        newQte=int(k["Quantité"])+int(i["count"])
                                        k["Quantité"]=newQte
                                        details["multipleproducts"]=details2
                                        temp.Details=json.dumps(details)
                                        temp.Qte=temp.Qte+int(i["count"])
                                        db.session.add(temp)
                                        db.session.commit()
                updated.Status=request.form["State"]
                db.session.add(updated)
                db.session.commit()        

            
        
    pandingOrders=Order.query.filter_by(Status='En attente').all()
    cancelledOrders=Order.query.filter_by(Status='Annuler').all()
    notResponding=Order.query.filter_by(Status='Pas de reponse').all()
    for i in pandingOrders:
        PandingOrders.append({'id':i.id,"FirstName":i.FirstName,"LastName":i.LastName,"Phone":i.Phone,"Wilaya":i.wilaya,"Commune":i.commune})
    for i in cancelledOrders:
        CancelledOrders.append({'id':i.id,"FirstName":i.FirstName,"LastName":i.LastName,"Phone":i.Phone,"Wilaya":i.wilaya,"Commune":i.commune})
    for i in notResponding:
        NotResponding.append({'id':i.id,"FirstName":i.FirstName,"LastName":i.LastName,"Phone":i.Phone,"Wilaya":i.wilaya,"Commune":i.commune})
   
    return jsonify({"Orders":PandingOrders,"CancelledOrders":CancelledOrders,"NotResponding":NotResponding})


@main.route('/Dashboard/EditOrder/<int:id>',methods=['GET','POST'])
@jwt_required
def EditOrder(id):
    order=Order.query.filter_by(id=id).first()
    orderdetailled={"id":order.id,"FirstName":order.FirstName,"LastName":order.LastName,"Address":order.Address,"Phone":order.Phone,"Products":json.loads(order.products_detailes),"wilaya":order.wilaya,"commune":order.commune}
    return jsonify({"Order":orderdetailled})


@main.route('/Dashboard/AddConfermatrice',methods=['POST'])
@jwt_required
def AddConfermatrice():
    if request.method=="POST":
        password=request.form['password'].encode('utf-8')
        salt=bcrypt.gensalt()
        hashed = bcrypt.hashpw(password, salt)
        if request.files:
            file = request.files['photo']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(UPLOAD_FOLDER, filename))
                new_user= Confermatrice(Name=request.form['first_name'], LastName=request.form['last_name'] , Mail=request.form['email'] , Phone=request.form['phone'] , Password=hashed,Photo=filename)
        else:
            new_user= Confermatrice(Name=request.form['first_name'], LastName=request.form['last_name'] , Mail=request.form['email'] , Phone=request.form['phone'] , Password=hashed)
        
        db.session.add(new_user)
        db.session.commit()
    return 'Done',201


@main.route('/Dashboard/AddDelivrer',methods=['POST'])
@jwt_required
def AddDelivrer():
    if request.method=="POST":
        password=request.form['password'].encode('utf-8')
        salt=bcrypt.gensalt()
        hashed = bcrypt.hashpw(password, salt)
        if request.files:
            file = request.files['photo']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(UPLOAD_FOLDER, filename))
                new_user= Delivrer(Name=request.form['first_name'], LastName=request.form['last_name'] , Mail=request.form['email'] , Phone=request.form['phone'] ,Region=request.form["wilaya"], Password=hashed,Photo=filename)
        else:
            new_user= Delivrer(Name=request.form['first_name'], LastName=request.form['last_name'] , Mail=request.form['email'] , Phone=request.form['phone'] ,Region=request.form["wilaya"], Password=hashed)
        
        db.session.add(new_user)
        db.session.commit()
    return 'Done',201

@main.route('/Dashboard/ManageDelivrer',methods=['GET','POST'])
@jwt_required
def ManageDelivrer():
    if request.method=="POST":
        tobedeleted=Delivrer.query.filter_by(id=int(request.form["id"])).first()
        db.session.delete(tobedeleted)
        db.session.commit()
    alldeliveres=Delivrer.query.all()
    delivrerlist=[]
    
    if alldeliveres:
        for i in alldeliveres:
            delivrerlist.append({'id':i.id,'first_name':i.Name,'last_name':i.LastName,'phone':i.Phone})
        return jsonify({"DelivrerList":delivrerlist})
    else:
        return jsonify({"DelivrerList":{}})

@main.route('/Dashboard/ManageConfermatrice',methods=['GET','POST'])
@jwt_required
def ManageConfermatrice():
    if request.method=="POST":
        tobedeleted=Confermatrice.query.filter_by(id=int(request.form["id"])).first()
        db.session.delete(tobedeleted)
        db.session.commit()
    allConfermatrice=Confermatrice.query.all()
    Confermatricelist=[]
    
    if allConfermatrice:
        for i in allConfermatrice:
            Confermatricelist.append({'id':i.id,'first_name':i.Name,'last_name':i.LastName,'phone':i.Phone})
        return jsonify({"Confermatricelist":Confermatricelist})
    else:
        return jsonify({"Confermatricelist":{}})


@main.route('/Dashboard/EditConfermatrice/<int:id>',methods=['GET',"POST"])
@jwt_required
def EditConfermatrice(id):
    confermatrice=Confermatrice.query.filter_by(id=id).first()
    if request.method=="POST":
        password=request.form['password'].encode('utf-8')
        salt=bcrypt.gensalt()
        hashed = bcrypt.hashpw(password, salt)
        if request.files:
            file = request.files['photo']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(UPLOAD_FOLDER, filename))
                confermatrice.Name=request.form['first_name']
                confermatrice.LastName=request.form['last_name']
                confermatrice.Mail=request.form['email']
                confermatrice.Phone=request.form['phone']
                confermatrice.Password=hashed
                confermatrice.Photo=filename
        else:
            confermatrice.Name=request.form['first_name']
            confermatrice.LastName=request.form['last_name']
            confermatrice.Mail=request.form['email']
            confermatrice.Phone=request.form['phone']
            confermatrice.Password=hashed
        db.session.add(confermatrice)
        db.session.commit()
    x={'id':confermatrice.id,'first_name':confermatrice.Name,'last_name':confermatrice.LastName,'phone':confermatrice.Phone,"email":confermatrice.Mail,"password":confermatrice.Password}
    return jsonify({"Delivrer":x})


@main.route('/Dashboard/EditDelivrer/<int:id>',methods=['GET',"POST"])
@jwt_required
def EditDelivrer(id):
    delivrer=Delivrer.query.filter_by(id=id).first()
    if request.method=="POST":
        password=request.form['password'].encode('utf-8')
        salt=bcrypt.gensalt()
        hashed = bcrypt.hashpw(password, salt)
        if request.files:
            file = request.files['photo']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(UPLOAD_FOLDER, filename))
                delivrer.Name=request.form['first_name']
                delivrer.LastName=request.form['last_name']
                delivrer.Mail=request.form['email']
                delivrer.Phone=request.form['phone']
                delivrer.Region=request.form["wilaya"]
                delivrer.Password=hashed
                delivrer.Photo=filename
        else:
            delivrer.Name=request.form['first_name']
            delivrer.LastName=request.form['last_name']
            delivrer.Mail=request.form['email']
            delivrer.Phone=request.form['phone']
            delivrer.Region=request.form["wilaya"]
            delivrer.Password=hashed
        db.session.add(delivrer)
        db.session.commit()
    region=delivrer.Region.split(',')
    x={'id':delivrer.id,'first_name':delivrer.Name,'last_name':delivrer.LastName,'phone':delivrer.Phone,"email":delivrer.Mail,"wilaya":region}
    return jsonify({"Delivrer":x})

@main.route('/Dashboard/panel',methods=['GET'])
@jwt_required
def panel():
    return jsonify({"user":get_jwt_identity(),"status":200})

@main.route('/Dashboard/Livreur',methods=['GET','POST'])
@jwt_required
def Livreur():
    id=int(get_jwt_identity()["id"])
    ThisDelivrer=Delivrer.query.filter_by(id=id).first()
    orders=ThisDelivrer.Orders.split(';')
    if request.method=="POST":
        if request.form["State"]=="Livré":
            order=Order.query.filter_by(id=int(request.form["id"])).first()
            order.Status=request.form["State"]
            order.Shipped_by=int(id)
            order.Edited_at=datetime.date.today()
            orders.remove(request.form["id"])
            updatedOrders=';'.join(orders)
            ThisDelivrer.Orders=updatedOrders
            db.session.add(ThisDelivrer)
            db.session.add(order)
            db.session.commit()
        else:
            notorder=Order.query.filter_by(id=int(request.form["id"])).first()
            orderProducts=json.loads(notorder.products_detailes)
            if len(orderProducts) == 7:
                willBeBackProduct=Product.query.filter_by(id=int(orderProducts["id"])).first()
                details=json.loads(willBeBackProduct.Details)
                details2=details["multipleproducts"]
                for i in details2:
                    if i["Photo"]==orderProducts["Photos"]:
                        for j in i["detailed"]:
                            if j["Taille"]==orderProducts["Taille"]:
                                newQte=int(j["Quantité"])+int(orderProducts["count"])
                                j["Quantité"]=newQte
                                details["multipleproducts"]=details2
                                willBeBackProduct.Details=json.dumps(details)
                                willBeBackProduct.Qte=willBeBackProduct.Qte+int(orderProducts["count"])
                                db.session.add(willBeBackProduct)
                notorder.Status=request.form["State"]
                notorder.Shipped_by=int(id)
                orders.remove(request.form["id"])
                updatedOrders=';'.join(orders)
                ThisDelivrer.Orders=updatedOrders
                db.session.add(ThisDelivrer)
                db.session.add(notorder)
                db.session.commit()
            else:
                willBeBackProducts=[]
                for i in orderProducts:
                    temp=Product.query.filter_by(id=int(i["id"])).first()
                    details=json.loads(temp.Details)
                    details2=details["multipleproducts"]
                    for j in details2:
                        if i["Photos"] == j["Photo"]:
                            for k in j["detailed"]:
                                if k["Taille"]== i["Taille"]:
                                    newQte=int(k["Quantité"])+int(i["count"])
                                    k["Quantité"]=newQte
                                    details["multipleproducts"]=details2
                                    temp.Details=json.dumps(details)
                                    temp.Qte=temp.Qte+int(i["count"])
                                    db.session.add(temp)
                                    db.session.commit()
                notorder.Status=request.form["State"]
                notorder.Shipped_by=int(id)
                orders.remove(request.form["id"])
                updatedOrders=';'.join(orders)
                ThisDelivrer.Orders=updatedOrders
                db.session.add(ThisDelivrer)
                db.session.add(notorder)
                db.session.commit()
                                    
                


    PandingOrders=[]
    temp=''
    for i in orders:
        if i != '':
            temp=Order.query.filter_by(id=int(i)).first()
            PandingOrders.append({'id':temp.id,"FirstName":temp.FirstName,"LastName":temp.LastName,"Phone":temp.Phone,"Wilaya":temp.wilaya,"Commune":temp.commune})
    refreshed=create_access_token(identity = {'firstname': ThisDelivrer.Name, 'lastname': ThisDelivrer.LastName,'email': ThisDelivrer.Mail,'role':"Livreur",'id':ThisDelivrer.id })
            
    return jsonify({"user":refreshed,"status":200,"Orders":PandingOrders})


@main.route('/Dashboard/Delivred',methods=['GET','POST'])
@jwt_required
def Delivred():
    AllDelivrers=Delivrer.query.all()
    DelivredOrders=[]
    alldatajson=[]
    cpt=0
    for i in AllDelivrers:
        totallivreur=0
        temp = Order.query.filter_by(Shipped_by=int(i.id)).all()
        alldatajson.append({"idLivreur":i.id,"NameLivreur":i.Name,"LastNameLivreur":i.LastName,"laivrason":[],"totalelivreur":0,"nbc":0})
        temp2=alldatajson[cpt]["laivrason"]
        for j in temp:
            totallivreur=totallivreur+int(j.Totale)
            y={"ID":j.id,"Nom":j.FirstName,"Prénom":j.LastName,"Num Tél":j.Phone,"Totale":j.Totale,"Date":j.Created_at}
            temp2.append(y)
        alldatajson[cpt]["nbc"]=len(temp2)
        alldatajson[cpt]["laivrason"]=temp2
        alldatajson[cpt]["totalelivreur"]=totallivreur
        cpt=cpt+1

    return jsonify({"AllData":alldatajson})


@main.route('/Dashboard/Caisse',methods=['GET','POST'])
@jwt_required
def Caissemarket():
    if request.method=="POST":
        x=request.form["Details"]
        y=json.loads(x)
        for i in y["laivrason"]:
            willbedeleted=Order.query.filter_by(id=int(i["ID"])).first()
            db.session.delete(willbedeleted)
        db.session.commit()
        newCaisse=Caisse(DelivryPrice=request.form["delivryPrice"],TotaleLivreur=request.form["TotaleLivreur"],Benifice=request.form["Benifice"],Details=request.form["Details"])
        db.session.add(newCaisse)
        db.session.commit()
    AllDelivrers=Delivrer.query.all()
    DelivredOrders=[]
    alldatajson=[]
    cpt=0
    for i in AllDelivrers:
        totallivreur=0
        temp = Order.query.filter_by(Shipped_by=int(i.id)).all()
        alldatajson.append({"idLivreur":i.id,"NameLivreur":i.Name,"LastNameLivreur":i.LastName,"laivrason":[],"totalelivreur":0,"nbc":0})
        temp2=alldatajson[cpt]["laivrason"]
        for j in temp:
            totallivreur=totallivreur+int(j.Totale)
            y={"ID":j.id,"Nom":j.FirstName,"Prénom":j.LastName,"Num Tél":j.Phone,"Totale":j.Totale,"Date":j.Created_at}
            temp2.append(y)
        alldatajson[cpt]["nbc"]=len(temp2)
        alldatajson[cpt]["laivrason"]=temp2
        alldatajson[cpt]["totalelivreur"]=totallivreur
        cpt=cpt+1
    
    today = datetime.datetime.now().date()
    week_ago = today - datetime.timedelta(days=7)
    month_ago= today - datetime.timedelta(days=30)
    year_ago= today - datetime.timedelta(days=365)
    
    thisWeek=Caisse.query.all()
    caisseweek=[]
    caissemonth=[]
    caisseyear=[]
    for i in thisWeek:
        if i.Date.date() > week_ago :
            caisseweek.append({"id":i.id,"DelivryPrice":i.DelivryPrice,"TotaleLivreur":i.TotaleLivreur,"Benifice":i.Benifice,"Date":i.Date.date()})
    
    for i in thisWeek:
        if i.Date.date() > month_ago :
            caissemonth.append({"id":i.id,"DelivryPrice":i.DelivryPrice,"TotaleLivreur":i.TotaleLivreur,"Benifice":i.Benifice,"Date":i.Date.date()})
    

    for i in thisWeek:
        if i.Date.date() > year_ago :
            caisseyear.append({"id":i.id,"DelivryPrice":i.DelivryPrice,"TotaleLivreur":i.TotaleLivreur,"Benifice":i.Benifice,"Date":i.Date.date()})
    
    return jsonify({"AllData":alldatajson,"Week":caisseweek,"Month":caissemonth,"Year":caisseyear})


@main.route('/Dashboard/AddPromotion',methods=['GET','POST'])
@jwt_required
def AddPromotion():
    if request.method=="POST":
        promotionProduct=Product.query.filter_by(id=int(request.form["id"])).first()
        promotionProduct.pourcentage=request.form["pourcentage"]
        promotionProduct.prixpromo=request.form["prixpromo"]
        db.session.add(promotionProduct)
        db.session.commit()
    product_list=[]
    Categories=Category.query.all()
    types=Type.query.all()
    SubCategories=SubCategory.query.all()
    products = Product.query.all()
    for i in Categories:
        for k in SubCategories:
            for z in types:
                for x in products:
                    if x.type_id == z.id  and x.sub_categorie_id == k.id and x.categorie_id == i.id:
                        product_list.append({"id": x.id , "Name": x.Name,"Type":z.Name ,"Subcategory":k.Name ,"Mother": i.Name,"SellPrice":x.SellPrice})

    
    return jsonify({'products': product_list})

@main.route('/Dashboard/ManagePromotions',methods=['GET','POST'])
@jwt_required
def ManagePromotions():
    allProducts=Product.query.all()
    promoted=[]
    if request.method=="POST":
        product=Product.query.filter_by(id=int(request.form["id"])).first()
        product.pourcentage=0
        product.prixpromo=0
        db.session.add(product)
        db.session.commit()
    if allProducts:
        for i in allProducts:
            if i.pourcentage !=0:
                promoted.append({"id":i.id,"Name":i.Name,"Pourcentage":i.pourcentage,"Prix":i.prixpromo})
    if promoted:
        return jsonify({"promoted":promoted})
    else:
        return jsonify({"promoted":[]})
    
@main.route('/Dashboard/EditPromotions/<int:id>',methods=['GET','POST'])
@jwt_required
def EditPromotions(id):
    product=Product.query.filter_by(id=int(id)).first()
    if request.method=="POST":
        
        product.pourcentage=int(request.form["pourcentage"])
        product.prixpromo=int(request.form["prixpromo"])
        db.session.add(product)
        db.session.commit()
    thisproduct={"id":product.id,"Name":product.Name,"SellPrice":product.SellPrice,"Pourcentage":product.pourcentage,"Promo":product.prixpromo}
    return jsonify({"product":thisproduct})

@main.route('/Dashboard',methods=['GET'])
@jwt_required
def Dashboard():
    products=Product.query.all()
    lessProducts=[]
    for i in products:
        ProductJson=json.loads(i.Details)
        for j in ProductJson["multipleproducts"]:
            for k in j["detailed"]:
                if int(k["Quantité"]) < 5:
                    lessProducts.append({"id":i.id,"Name":i.Name,"Details":k,"Photo":j["Photo"]})
    
    return jsonify({"lessProducts":lessProducts})


@main.route('/Dashboard/Contacte',methods=['POST'])
def Contacte():
    if request.method=="POST":
        fullname=request.form["fullname"] 
        email=request.form["phone"] 
        phone=request.form["email"] 
        msg=request.form["message"]
        valid=True
        if "<" in fullname or "<" in email or "<" in phone or "<" in msg:
            valid=False    
        if valid ==True:
            newContact=Contact(Name=fullname,Mail=email,Phone=phone,Msg=msg)
            db.session.add(newContact)
            db.session.commit()
        else:
            pass
    return "Done",201
