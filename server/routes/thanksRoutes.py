
# Remote library imports
from flask_restful import Resource

# Model imports
from models import  Order


            
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