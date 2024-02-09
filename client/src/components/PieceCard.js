import React from "react";
import { Card } from "react-bootstrap";

function PieceCard({ piece }) {
    return (
        <Card style={{ width: '18rem'}} className="m-2" >
            <a href={`/pieces/${piece.id}`}>
            <Card.Img variant="top" src={`/api/pics/${piece.image_url}`}  /></a>
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