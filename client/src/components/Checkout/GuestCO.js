import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as yup from "yup";
import { useFormik } from "formik";

export default function GuestCO({ setUserInfo }) {
    const states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 
    'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 
    'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 
    'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 
    'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 
    'WI', 'WY' ];

    const formSchema =yup.object().shape({
        email: yup.string().email('Invalid email format').required('Must provide an email address'),
        address: yup.string().required('Must provide an address'),
        address2: yup.string('Must be a string'),
        city: yup.string().required('Must provide a city'),
        state: yup.string().oneOf(states, 'Must be a valid state abbreviation').required('Must provide a state abbreviation'),
        zip: yup.number().required('Must provide a zip code')
    })



    return (
        <div className="my-3 mx-5 p-3 bg-light rounded">
            <Form>
                <Row className="mb-3" >
                    <Form.Group as={Col} controlId="formGridEmail" md={6} >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>   
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State (2 letter abbr.)</Form.Label>
                    <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Next
                </Button>
            </Form>
        </div>
    )
}