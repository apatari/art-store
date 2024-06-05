
# Remote library imports
from flask import request, session
from flask_restful import Resource

        
class CheckCart(Resource):
    def get(self):
        if 'cart' in session:
            print("cart: ",session['cart'])
            res = session['cart']
            return res, 200
        
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
