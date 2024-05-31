#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Seller, Piece, Order, Selection

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Deleting tables...")
        Seller.query.delete()
        Piece.query.delete()
        Order.query.delete()
        Selection.query.delete()

        print("Adding...")

        s1 = Seller(username="mom")
        s1.password_hash="bigPuppy"
        s2 = Seller(username="dad")
        s2.password_hash="bigPuppy"
        s3 = Seller(username="andy")
        s3.password_hash="bigPuppy"

        db.session.add(s1)
        db.session.add(s2)
        db.session.add(s3)

        db.session.commit()

        orders = [
            Order(customer_email="bob@test.com", price_total=4500, payment_intent="pi_example"),
            Order(customer_email="art@test.com", price_total=5500, payment_intent="pi_example2"),
        ]

        for order in orders:
            db.session.add(order)
        db.session.commit()

        pieces = [
            Piece(name="Tan Expressions", description="Medium-sized, with warm wheat tones.  Like pancakes for breakfast with Cheerios on the side.", image_url="IMG_7383.jpg", price=25),
            Piece(name="Cochabamba Suburb", description="My church bell brings all the alpacas to  the yard.  A village scene withful custom frame.", image_url="IMG_7400.jpg", price=20),
            Piece(name="Xelaju Morning", description="Medium small with full bright wood frame.  Reminds me of a bike repair shop on the Panamerican highway run by a foul-mouthed teenager.", image_url="IMG_7401.jpg", price=10),
            Piece(name="Mountain Maple Skyline", description="Small, supported by a local Vermont stick expertly cut by ML's son.  You get to decide if that's a faraway peak or the setting sun if you purchase the piece.", image_url="IMG_7218.jpg", price=45), 
            Piece(name="SOLD Mountain Maple Skyline", description="Like the other one but sold.", image_url="IMG_7218.jpg", price=45, sold=True), 
            Piece(name="SOLD Mountain Maple Skyline2", description="Like the other one but sold again.", image_url="IMG_7218.jpg", price=45, sold=True), 
            Piece(name="SOLD Xelahu", description="Like the other one but sold.", image_url="IMG_7401.jpg", price=10, sold=True), 
        ]

        for piece in pieces:
            db.session.add(piece)
        db.session.commit()

        selections = [
            Selection(order_id=1, piece_id=5),
            Selection(order_id=2, piece_id=6),
            Selection(order_id=2, piece_id=7),
        ]

        for selection in selections:
            db.session.add(selection)
        db.session.commit()
