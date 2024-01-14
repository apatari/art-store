from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

# Models go here!

class Seller(db.Model, SerializerMixin):
    __tablename__ = 'sellers'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    @validates('username')
    def validate_username(self, key, name):
        if not name or not 0 < len(name) <= 20:
            raise ValueError("Name must be 1-20 characters")
        # if name in [seller.username for seller in Seller.query.all()]:
        if Seller.query.filter_by(username=name).first():
            raise ValueError("Sorry, that name is not available")
        return name
        
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        if len(password) < 4:
            raise ValueError("Passwords must be 4 or more characters")
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'Seller {self.username}, ID: {self.id}'
    

class Piece(db.Model, SerializerMixin):
    __tablename__ = 'pieces'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    image_url = db.Column(db.String)
    price = db.Column(db.Integer, nullable=False)


    @validates('name')
    def validate_name(self, key, name):
        if not name or not 0 < len(name) <= 30:
            raise ValueError("Name must be 1-30 characters")
        return name
    
    @validates('image_url')
    def validate_image(self, key, image):
        if len(image) < 1 or image == None:
            return 'https://placehold.co/400'
        return image
    #maybe add the placeholder image as part of the front end

    @validates('price')
    def validate_price(self, key, price):
        if price <= 0 or not type(price) == int:
            raise ValueError("Price must be an integer greater than zero")
        return price