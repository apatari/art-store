import React from "react";
import { Form, Button, Col } from "react-bootstrap";

function Login() {
    return (
        <div className="d-flex m-4" >
            <Col lg={4}>
            <Form  >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User</Form.Label>
                    <Form.Control type="email" placeholder="Enter username" />
                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form></Col>
        </div>
    )
}

export default Login