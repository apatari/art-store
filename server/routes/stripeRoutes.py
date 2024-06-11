# Standard library imports

import json

# Remote library imports
from flask import request, jsonify


# stripe
import stripe
# from bson.objectid import ObjectId

# Local imports
from config import app,db, stripe_api_key, stripe_endpoint_secret
# Add your model imports
from models import Seller, Piece, Order, Selection


# stripe routes
stripe.api_key = stripe_api_key

def calculate_order_amount(pieceArray):
    res = 0
    for pieceId in pieceArray:
        item = Piece.query.filter_by(id=pieceId).first()

        if not item:
            raise ValueError("Piece ID not found in database")
        
        res += item.price
    print("final: ",res)
    # print(type(res))
    return int(res) * 100

@app.route('/api/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        data = json.loads(request.data)
        userInfo = data['userInfo']
        calculatedAmount = calculate_order_amount(data['cart'])
        # print("User Info: ", userInfo)
        
        # TODO - check if there is already a payment intent in session, then update with new info if it is

        #create new order
        print("User Info: ", userInfo)
        new_order = Order(
            customer_email = userInfo['email'],
            price_total = calculatedAmount,
            address=userInfo['address'],
            address2=None,
            city=userInfo['city'],
            state=userInfo['state'],
            zip=userInfo['zip']
        )
        if userInfo['address2'] != "":
            new_order.address2=userInfo['address2']
            
        db.session.add(new_order)
        db.session.commit()

        for item_id in data['cart']:
            new_selection = Selection(order_id=new_order.id, piece_id=item_id)
            db.session.add(new_selection)
        db.session.commit()
        
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            #use data['items'] as the argument below once todo above is done
            amount=calculatedAmount,
            #add the new order's id as metadata
            metadata={"order_id": new_order.id},
            currency='usd',
            # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods={
                'enabled': True,
            },
        )

        # add payment intent id to new order
        new_order.payment_intent = intent['id']
        db.session.commit()

        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        print(e)
        return jsonify(error=str(e)), 403  


# To start ngrok tunneler in terminal:
# ngrok http --domain=tough-sloth-improved.ngrok-free.app 5555
@app.route('/webhooks', methods=['POST'])
def webhook():
    
    event = None
    payload = request.data
    sig_header = request.headers['STRIPE_SIGNATURE']

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, stripe_endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        raise e
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise e

    # Handle the event
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        # print is placeholder. TODO - create a record in transactions database
        # add the payment intent id to the order record in db
        print("Webhook working!", payment_intent['amount'], payment_intent['metadata'])

        # update order to completed
        order_id = payment_intent['metadata']['order_id']
        order = Order.query.filter_by(id=order_id).first()
        order.completed = True

        # change all pieces to be sold in db
        pieces = order.pieces
        for piece in pieces:
            piece.sold = True
            db.session.add(piece)
        
        db.session.commit()

      
    # ... handle other event types
    else:
      print('Unhandled event type {}'.format(event['type']))

    return jsonify(success=True)