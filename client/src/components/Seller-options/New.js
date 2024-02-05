import React from "react";
import { Form, Row, Col } from "react-bootstrap";

function New() {
    return (
        <div>
            <h3>Add New Piece</h3>
            <Form>
                <Row>
                    <Col md={9}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Name" />
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Price" min={1} step={1} />
                        </Form.Group>
                    </Col>

                </Row>
                
                <Form.Group className="mb-3" >
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <Form.Group className="mb-3" >
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control  placeholder="Paste image address here"/>
                        </Form.Group>
            </Form>

        </div>
    )
}

export default New