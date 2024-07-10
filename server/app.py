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
from routes.imageRoutes import UploadFile, Image
from routes.cartRoutes import CheckCart
from routes.thanksRoutes import ThanksByID
from routes.orderRoutes import OrderIndex


# Views in separate folders        


api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(PieceIndex, '/api/pieces')
api.add_resource(PieceByID, '/api/pieces/<int:id>')
api.add_resource(CheckSession, '/api/check_session')
api.add_resource(UploadFile, '/api/upload')
api.add_resource(Image, "/api/pics/<string:name>")
api.add_resource(CheckCart, "/api/cart")
api.add_resource(ThanksByID, "/api/thanks/<string:pi_id>")
api.add_resource(OrderIndex, '/api/orders')

# @app.route('/')
# def index():
#     return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

