
from flask_restful import Resource
from models import Order


class OrderIndex(Resource):

    def get(self):
        orders= [order.to_dict() for order in Order.query.all()]

        return orders, 200