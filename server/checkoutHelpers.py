
from models import Piece

def calculatePrice(pieceArray):
    res = 0
    
    for pieceId in pieceArray:
        item = Piece.query.get(pieceId)

        if not item:
            raise ValueError("Piece ID not found in database")
        
        res += item.price
    print("final: ",res)
    return res