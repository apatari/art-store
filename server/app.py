#!/usr/bin/env python3

# Standard library imports
import os

# Remote library imports
from flask import request, session, send_file
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Seller, Piece

ALLOWED_EXTENSIONS = {'png', 'jpg', "jpeg"}


# Views go here!

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
        
class PieceIndex(Resource):

    def get(self):

        pieces = [piece.to_dict() for piece in Piece.query.all()]

        return pieces, 200
    
    def post(self):

        json = request.get_json()

        try:
            new_piece = Piece(
                name = json["name"],
                description = json["description"],
                image_url = json["image_url"],
                price = json["price"]
            )

            db.session.add(new_piece)
            db.session.commit()

            return new_piece.to_dict(), 201
        except Exception as err:
            return {"errors": [str(err)]}, 422

class PieceByID(Resource):

    def get(self, id):

        piece = Piece.query.get(id)

        if piece:
            return piece.to_dict(), 200
        else:
            return {"error": "Piece not found"}, 404
        
    def patch(self, id):

        piece = Piece.query.get(id)
        json = request.get_json()


        if not piece:
            return {"error": "Piece not found"}, 404
        else:
            try:
                piece.name = json["name"]
                piece.description = json["description"]
                piece.image_url = json["image_url"]
                piece.price = json["price"]

                db.session.add(piece)
                db.session.commit()

                return piece.to_dict(), 201
            except Exception as err:
                return {"errors": [str(err)]}, 422

    def delete(self, id):

        piece = Piece.query.get(id)

        if piece:
            os.remove("./static/" + piece.image_url)
            db.session.delete(piece)
            db.session.commit()

            return {}, 204
        else:
            return {"error": "Piece not found"}, 404
        
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
        
class UploadFile(Resource):

    def post(self):
        upload = request.files['file']

        if not upload.filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS:
            return{"errors": ["Image format must be .png, .jpg, or .jpeg"]}, 422

        if upload.filename != "":
            try:
                upload.save(f'./static/{upload.filename}')
                return {"filename": upload.filename}, 201
            except Exception as err:
                return {"errors": [str(err)]}, 422
        return {"errors": ["missing filename"]}, 422
            
        

class Image(Resource):

    def get(self, name):
        return send_file(f'./static/{name}')
        


api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(PieceIndex, '/api/pieces')
api.add_resource(PieceByID, '/api/pieces/<int:id>')
api.add_resource(CheckSession, '/api/check_session')
api.add_resource(UploadFile, '/api/upload')
api.add_resource(Image, "/api/images/<string:name>")

# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

