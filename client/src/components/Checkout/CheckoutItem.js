import React from "react";
import { Row, Col, Button,  } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../CartComps/delButton.css"

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
                <Col md={6} className="bg-info bg-opacity-25 m-2 rounded p-4" >
                    <Row>

                        <Col className="fs-3"sm={4} >
                            {piece.name}
                        </Col>
                        <Col>
                            <img className="mx-auto border" src={`/api/pics/${piece.image_url}`} alt="Piece" style={{width: '5rem', cursor:'pointer'}} />
                        </Col>
                        <Col className="d-flex">
                            <div className="text-end fs-4 my-auto ms-auto">
                                ${piece.price}

                            </div>
                            
                        </Col>
                        <Col className="d-flex">
                            <div className="ms-auto my-auto">
                                <Button onClick={handleDelete} className="ms-auto rounded btn-secondary delbtn">
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
 
        </div>
    )
}