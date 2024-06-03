

# Remote library imports
from flask import request, session
from flask_restful import Resource


# Local imports

# Add your model imports
from models import Seller, Piece, Order


class Login(Resource):

    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']

        user = Seller.query.filter_by(username=username).first()

        if user and user.authenticate(password):
            session['user_id'] = user.id
            response_body = {
                "id": user.id,
                "username": user.username,
            }
            return response_body, 200
        else:
            return {"errors": ["Invalid username and/or password"]}, 401
        
class Logout(Resource):
    
    def delete(self):

        user = Seller.query.filter_by(id = session.get('user_id')).first()

        if user:
            session["user_id"] = None
            return {}, 200
        else:
            return{"errors": "Error: cannot log out, you are not logged in"}, 401
        
class CheckSession(Resource):

    def get(self):

        user = Seller.query.filter_by(id = session.get('user_id')).first()

        if user:
            response_body = {
                "id": user.id,
                "username": user.username,
            }
            return response_body, 200
        else:
            return {"errors": "User not logged in"}, 401