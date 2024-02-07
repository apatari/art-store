import React from "react";
import { Card } from "react-bootstrap";

function PieceCard({ piece }) {
    return (
        <Card style={{ width: '18rem'}} className="m-2" >
            <Card.Img variant="top" src={`/api/images/${piece.image_url}`}  />
            <Card.Body>
                <Card.Title>{piece.name}</Card.Title>
                <Card.Text>
                {piece.description} <strong>{piece.price}</strong>
                </Card.Text>
                
            </Card.Body>
        </Card>
       
    )
}

export default PieceCard