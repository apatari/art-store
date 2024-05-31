# Standard library imports

import json

# Remote library imports
from flask import request, jsonify


# stripe
import stripe

# Local imports
from config import app, stripe_api_key, stripe_endpoint_secret
# Add your model imports
from models import Seller, Piece


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
        # print("User Info: ", userInfo)
        
        # TODO - check if there is already a payment intent in session, then update with new info if it is
        
        # Create a PaymentIntent with the order amount and currency
        intent = stripe.PaymentIntent.create(
            #use data['items'] as the argument below once todo above is done
            amount=calculate_order_amount(data['cart']),
            metadata={"email": userInfo['email']},
            currency='usd',
            # In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods={
                'enabled': True,
            },
        )
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
      
    # ... handle other event types
    else:
      print('Unhandled event type {}'.format(event['type']))

    return jsonify(success=True)