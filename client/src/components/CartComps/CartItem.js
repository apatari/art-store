import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


export default function CartItem({ piece, setCart }) {

    const handleDelete = () => {
    
        fetch('/api/cart', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify({"id": parseInt(piece.id)})
        })
        .then(res => res.json())
        .then(data => {
            setCart(data)
            
        })
        
    }

    return (
        <div className="bg-secondary bg-opacity-25 m-2 rounded p-2">
            <Row>
                <Col>
                    {piece.name}
                </Col>
                <Col className="" >
                    <div className="text-end fs-4">
                        {piece.price}

                    </div>
                    
                </Col>
                <Col className="d-flex">
                    <Button onClick={handleDelete} className="ms-auto rounded btn-secondary" >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </Col>
            </Row>

            
            
        </div>
    )
}