# Standard library imports
import os

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import db
# Add your model imports
from models import Piece


class PieceIndex(Resource):

    def get(self):

        #currently set to only render unsold pieces
        pieces = [piece.to_dict() for piece in Piece.query.filter_by(sold=False).all()]

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