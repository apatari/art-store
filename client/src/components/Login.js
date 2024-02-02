import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useFormik } from "formik";
import * as yup from "yup";

function Login({ setUser }) {

    const [errors, setErrors] = useState([])
    const history = useHistory()

    const formSchema = yup.object().shape({
        username: yup.string().required("Please enter a username"),
        password: yup.string().required("Please enter a password")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            setErrors([])
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then(r => {
                if (r.ok) {
                    r.json().then(user =>setUser(user)) 
                    history.push('/seller')    
                } else {
                    r.json().then(err => setErrors(err.errors))
                }
            })
        }
    })


    return (
        <div className="d-flex m-4" >
            <Col lg={4}>
            <Form onSubmit={formik.handleSubmit} >
                <Form.Group className="mb-3" >
                    <Form.Label>User</Form.Label>
                    <Form.Control 
                        type="username" 
                        name="username" 
                        id="username" 
                        placeholder="Enter username"
                        value={formik.values.username}
                        onChange={formik.handleChange} />
                    
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange} />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form></Col>
        </div>
    )
}

export default Login