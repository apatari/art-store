#!/usr/bin/env python3

# Standard library imports
import os
import json

# Remote library imports
from flask import request, session, send_file, jsonify
from flask_restful import Resource

# stripe
import stripe

# Local imports
from config import app, db, api, stripe_api_key, stripe_endpoint_secret
# Add your model imports
from models import Seller, Piece, Order

#import routes from separate files
import routes.stripeRoutes

# import flask_restful routes
from routes.loginRoutes import Login, Logout, CheckSession
from routes.pieceRoutes import PieceByID, PieceIndex

ALLOWED_EXTENSIONS = {'png', 'jpg', "jpeg"}


# Views go here!


        

        

        
class CheckCart(Resource):
    def get(self):
        if 'cart' in session:
            print("cart: ",session['cart'])
            res = session['cart']
            return res, 200
            # return {"items": len(session['cart'])}, 200
        
        else:
            return [], 200
    
    
    def delete(self):
        session['cart'] = []
        session.modified = True

        return [], 200
        
    def post(self):
    
        json = request.get_json()
        product_id = json['id']

        if 'cart' in session:
            print('cart found')
            if product_id not in session['cart']:
                session['cart'].append(product_id)
                session.modified = True
            else:
                session['cart'].remove(product_id)
                session.modified = True
            res = session['cart']
            return res, 201
        else:
            session['cart'] = [product_id]
            res = session['cart']
            return res, 201


        # product_id = str(json['id'])
        # if 'cart' in session:
        #     print('cart found', session['cart'])
        #     print(session['cart'])
        #     print('id: ', product_id)
        #     print('4' in session['cart'])
        #     if session['cart'].get(product_id) is None:
        #         print('no product in cart')
        #         session['cart'][product_id] = 1
        #         print("new session: ", session['cart'])
        #     else:
        #         session['cart'][product_id]+= 1
        #     print('session being returned: ', session['cart'])
        #     return session['cart'], 201
        # else:
        #     print('cart not found')
        #     session['cart'] = {product_id: 1}
            
        #     return session['cart'], 200

            
class ThanksByID(Resource):

    def get(self, pi_id):

        order = Order.query.filter_by(payment_intent=pi_id).first()

        if order:
            if order.to_dict()['completed'] == True:

                pieces = [piece.to_dict() for piece in order.pieces]
                response_body = {"order": order.to_dict(), "pieces": pieces}

                return response_body, 200
            else:
                return None, 200
        else:
            return {"error": "Order not found"}, 404
        
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
api.add_resource(Image, "/api/pics/<string:name>")
api.add_resource(CheckCart, "/api/cart")
api.add_resource(ThanksByID, "/api/thanks/<string:pi_id>")

# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

