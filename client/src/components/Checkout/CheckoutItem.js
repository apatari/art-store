import React from "react";
import { Row, Col, Button,  } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function CheckoutItem({ piece, setCart }) {

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
        <div >
            <Row >
                <Col md={8} className="bg-secondary bg-opacity-25 m-2 rounded p-2" >
                    <Row>

                        <Col className="fs-5"sm={5} >
                            {piece.name}
                        </Col>
                        <Col>
                            <img className="mx-auto" src={`/api/pics/${piece.image_url}`} alt="Piece" style={{width: '5rem', cursor:'pointer'}} />
                        </Col>
                        <Col className="" >
                            <div className="text-end fs-4">
                                ${piece.price}

                            </div>
                            
                        </Col>
                        <Col className="d-flex">
                            <Button onClick={handleDelete} className="ms-auto rounded btn-secondary delbtn" >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
 
        </div>
    )
}