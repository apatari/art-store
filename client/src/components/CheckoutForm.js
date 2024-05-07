import React from "react";
import { Row, Col, Button } from "react-bootstrap";

export default function CheckoutForm({ piece }) {
    return (
        <div className="m-3" >
            <Row  className="m-4  bg-light rounded p-3" >
                <Col lg={6} className="m-3"  >
                    <h2 className="my-3" >Checkout: {piece.name} </h2>
                    <img className="mx-auto" src={`/api/pics/${piece.image_url}`} alt="Piece" style={{width: '20%', cursor:'pointer'}} />
                    <h3 className="my-3" >${piece.price}</h3> 
                </Col>
             

            <Row>
                <Col sm={2} >
                    <Button>Purchase</Button>
                </Col>
                <Col>
                    <Button>Cancel</Button>
                </Col>
            </Row>
            </Row>
                                   
            
        </div>
    )
}