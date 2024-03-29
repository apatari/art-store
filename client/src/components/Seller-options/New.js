import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios"

function New() {

    const history = useHistory()
    const [errors, setErrors] = useState([])
    const [file, setFile] = useState(null)

    const formSchema = yup.object().shape({
        name: yup.string()
            .required("Must provide a name")
            .max(50, "Name must be 50 characters or fewer"),
        price: yup.number().typeError("Price must be a number")
            .positive("Price muse be greater than zero")
            .integer("Price must be an integer")
            .required("Please enter a price"),
        description: yup.string().required("Please enter a description")
        
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            price: 0,
            description: ""

        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {

            const fd = new FormData()
            fd.append('file', file)

            fetch('/api/upload', {
                method: "POST",
                body: fd
            })

            .then(res => {
                if (res.ok) {
                    res.json()
                    .then(res => {

                        const image_url = res.filename

                        fetch('/api/pieces', {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({...values, "image_url": image_url})
                        })
                        .then(r => {
                            if (r.status === 201) {
                                history.push('/')
                            } else {
                                r.json().then(err => setErrors(err.errors))
                            }
                        })
                    })
                    
                } else {
                    res.json().then(err => setErrors(err.errors))
                }
            })
        }
    })


    return (
        <div>
            <h3>Add New Piece</h3>
            <Form onSubmit={formik.handleSubmit} >
                <Row>
                    <Col md={9}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                placeholder="Name" 
                                type="name"
                                name="name"
                                id="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                            />
                        </Form.Group>
                        <p className="text-danger m-3"> {formik.errors.name}</p>
                    </Col>

                    <Col md={3}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                                type="number" 
                                placeholder="Price" min={1} 
                                step={1} 
                               
                                name="price"
                                id="price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                            />
                        </Form.Group>
                        <p className="text-danger m-3"> {formik.errors.price}</p>
                    </Col>

                </Row>
                
                <Form.Group className="mb-3" >
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={3} 
                        
                        name="description"
                        id="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                </Form.Group>
                <p className="text-danger m-3"> {formik.errors.description}</p>

             
                <Form.Group  className="mb-3">
                    <Form.Label>Select Image File</Form.Label>
                    <Form.Control type="file" onChange={(e) => {setFile(e.target.files[0])}} />
                    
                </Form.Group>


                <p className="text-danger m-3"> {formik.errors.image_url}</p>
                {errors.map((err) => <p className="text-danger m-3" key={err}>{err}</p>)}

                {(file)? <Button type="submit" >Submit</Button>:<Button type="submit" disabled >Submit</Button> }
                
            </Form>

        
        </div>
    )
}

export default New