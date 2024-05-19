import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import CheckoutItemsList from "./CheckoutItemsList";

export default function UserOrGuest({ pieces }) {
    return (
        <div className="my-3 mx-5 p-3 bg-light rounded">
            <div>
                <h2 className="m-3">Checkout</h2>
            </div>
            
            <div className="my-3 d-flex">
                <p className="mx-4 my-2 fs-3 mt-4">1) Review your order:</p>
            </div>

            <div className="my-4 mx-4">
                <CheckoutItemsList pieces={pieces} />
            </div>

            

            <div className="my-3 d-flex">
                <p className="mx-4 my-2 fs-3 mt-4">2) Log in or continue as a guest:</p>
            </div>

            <Row className="mb-3">
                <Col className="my-2 ms-5">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            Log in
                        </Button>
                    </Form>
                </Col>
                    
                <Col className="border-start d-flex">
                    <div className="mx-auto">

                        <Button size="lg" className="my-5" href="/checkout/guest"> Continue as a guest</Button>
                    </div>
                </Col>
            </Row>

            
        </div>


    )
}