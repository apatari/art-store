#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Seller, Piece

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Deleting tables...")
        Seller.query.delete()
        Piece.query.delete()

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

        pieces = [
            Piece(name="mountains", description="A wonderful alpine scene renderred with exquisite detail", image_url="", price=25),
            Piece(name="desert", description="A wonderful desert scene renderred with exquisite detail", image_url="", price=20),
            Piece(name="beach", description="A wonderful maritime scene renderred with exquisite detail", image_url="", price=10),
            Piece(name="plains", description="A wonderful heartland scene renderred with exquisite detail", image_url="", price=45),
        ]

        for piece in pieces:
            db.session.add(piece)
        db.session.commit()
