from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.sql import func
import validators

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
    

class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    created_on = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_on = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    customer_email = db.Column(db.String)
    payment_intent = db.Column(db.String)
    completed = db.Column(db.Boolean, default=False, nullable=False )
    # all prices in cents of us dollar
    price_total = db.Column(db.Integer, nullable=False)

    selections = db.relationship('Selection', back_populates='order', cascade='all')
    pieces = association_proxy('selections', 'piece',
                               creator = lambda piece_obj: Selection(piece=piece_obj))

    serialize_rules = ('-selections',)

    

    # TODO - add validations for orders?  Not sure yet what best way to handle 
    # database validation errors is in payment intent flow.

    def __repr__(self):
        return f'Order {self.id}, price: {self.price_total}, piece(s): {self.pieces}'


class Piece(db.Model, SerializerMixin):
    __tablename__ = 'pieces'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)
    image_url = db.Column(db.String)
    price = db.Column(db.Integer, nullable=False)
    sold = db.Column(db.Boolean, default=False, nullable=False)

    selections = db.relationship('Selection', back_populates='piece', cascade='all')
    orders = association_proxy('selections', 'order',
                               creator = lambda order_obj: Selection(order=order_obj))

    serialize_rules = ('-selections.piece',)

    @validates('name')
    def validate_name(self, key, name):
        if not name or not type(name) == str or not 0 < len(name) <= 30:
            raise ValueError("Name must be 1-30 characters")
        return name  

    @validates('price')
    def validate_price(self, key, price):
        if not type(price) == int or price <= 0:
            raise ValueError("Price must be an integer greater than zero")
        return price
    
class Selection(db.Model, SerializerMixin):
    __tablename__ = 'selections'

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    piece_id = db.Column(db.Integer, db.ForeignKey('pieces.id'))

    order = db.relationship('Order', back_populates='selections')
    piece = db.relationship('Piece', back_populates='selections')

    serialize_rules = ('-order.selections', '-piece.selections')

    def __repr__(self):
        return f'Selection {self.id}, order: {self.order}, piece: {self.piece}'