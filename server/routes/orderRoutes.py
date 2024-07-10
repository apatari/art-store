
from flask_restful import Resource
from models import Order


class OrderIndex(Resource):

    def get(self):
        orders= [order.to_dict() for order in Order.query.all()]

        return orders, 200
    
class OrderByID(Resource):

    def get(self, id):

        order = Order.query.filter_by(id=id).first()

        if order:
            return order.to_dict(), 200
        else:
            return {"error": "Order not found"}, 404