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
        state: yup.string().oneOf(states, 'Invalid state abbreviation').required('Must provide a state abbreviation'),
        zip: yup.string()
        .required('Must provide a zip code')
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(5, 'Must be exactly 5 digits')
        .max(5, 'Must be exactly 5 digits')
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            address: "",
            address2: "",
            city: "",
            state: "",
            zip: ""
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => console.log(values)
    })



    return (
        <div className="my-3 mx-5 p-3 bg-light rounded">
            <Form onSubmit={formik.handleSubmit}>
                <Row className="mb-3" >
                    <Form.Group as={Col}  md={6} >
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange} />
                        {formik.errors.email ? <div className="text-danger">{formik.errors.email}</div>:""}
                    </Form.Group>   
                </Row>

                <Form.Group className="mb-3" >
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="1234 Main St"
                        id="address"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange} />
                        {formik.errors.address ? <div className="text-danger">{formik.errors.address}</div>:""}
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Apartment, studio, or floor"
                        id="address2"
                        name="address2"
                        value={formik.values.address2}
                        onChange={formik.handleChange}  />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} >
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                        type="text"        
                        id="city"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}  />
                        {formik.errors.city ? <div className="text-danger">{formik.errors.city}</div>:""}
                    </Form.Group>

                    <Form.Group as={Col} >
                    <Form.Label>State (2 letter abbr.)</Form.Label>
                    <Form.Control 
                        type="text"        
                        id="state"
                        name="state"
                        value={formik.values.state}
                        onChange={formik.handleChange}/>
                        {formik.errors.state ? <div className="text-danger">{formik.errors.state}</div>:""}
                    </Form.Group>

                    <Form.Group as={Col} >
                    <Form.Label>Zip</Form.Label>
                    <Form.Control 
                        type="string"        
                        id="zip"
                        name="zip"
                        value={formik.values.zip}
                        onChange={formik.handleChange}/>
                        {formik.errors.zip ? <div className="text-danger">{formik.errors.zip}</div>:""}
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Next
                </Button>
            </Form>
        </div>
    )
}