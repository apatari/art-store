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
            Piece(name="Tan Expressions", description="Medium-sized, with warm wheat tones.  Like pancakes for breakfast with Cheerios on the side.", image_url="https://lh3.google.com/pw/ABLVV854Oxr5-2ImjqDotlChNq77FelLU9rXFY834D846xy5u2UvQ-DjoFVM_85nFafvni9OYUpI4u-4mI9bVd5RbYPR7ghFgg=w1102-h1536-s-no-gm?authuser=0", price=25),
            Piece(name="Cochabamba Suburb", description="My church bell brings all the alpacas to  the yard.  A village scene withful custom frame.", image_url="https://lh3.google.com/pw/ABLVV87nsocPRwfNi14YarekJpFFExJOsVSG78MsV71v7xm4LBde7kwcNNaNJMW7aaaPUZFMPqQQNAwsPsX-LnYtNF0tcJEytg=w1102-h1536-s-no-gm?authuser=0", price=20),
            Piece(name="Xelaju Morning", description="Medium small with full bright wood frame.  Reminds me of a bike repair shop on the Panamerican highway run by a foul-mouthed teenager.", image_url="https://lh3.google.com/pw/ABLVV87F-vJmCFpvOAfjpw7m8lHgIdkGqDy8a1jhwQnLaRPGjMx42Wce4R4tNwSNsNqXJpHOQIQN6-Ur0VLTpIHMyOB9sv7TFA=w728-h719-s-no-gm?authuser=0", price=10),
            Piece(name="Mountain Maple Skyline", description="Small, supported by a local Vermont stick expertly cut by ML's son.  You get to decide if that's a faraway peak or the setting sun if you purchase the piece.", image_url="https://lh3.google.com/pw/ABLVV84rLuNacWeeAm4RgwwAt23I7AKs-YQfEDVGxok1pKGL2tNJLfjK7aKFbB3Juu5VHOvz_vqV-CeoxXgfZ7M0-dWAaqlvqw=w1152-h1536-s-no-gm?authuser=0", price=45),
        ]

        for piece in pieces:
            db.session.add(piece)
        db.session.commit()
