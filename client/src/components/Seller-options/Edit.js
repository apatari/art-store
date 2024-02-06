import React, { useState } from "react";
import { Form, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Edit({ pieces }) {

    const defaultPiece = {
        "id": -1,
        "name": "",
        "price": 0,
        "description": "",
        "image_url": ""
    }

    const history = useHistory()
    const [errors, setErrors] = useState([])
    const [editPiece, setEditPiece] = useState(defaultPiece)

    const formSchema = yup.object().shape({
        name: yup.string()
            .required("Must provide a name")
            .max(50, "Name must be 50 characters or fewer"),
        price: yup.number().typeError("Price must be a number")
            .positive("Price muse be greater than zero")
            .integer("Price must be an integer")
            .required("Please enter a price"),
        description: yup.string().required("Please enter a description"),
        image_url: yup.string()
            .required("Please provide an image url")
        
    })

    const formik = useFormik({
        initialValues: {
            name: editPiece.name,
            price: editPiece.price,
            description: editPiece.description,
            image_url: editPiece.image_url

        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log(values)
            fetch(`/api/pieces/${editPiece.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            .then(r => {
                if (r.status === 201) {
                    history.push('/')
                } else {
                    r.json().then(err => setErrors(err.errors))
                }
            })
        }
    })



    return (
        <div>
            <h3>Edit Piece {(editPiece.name)? ` - ${editPiece.name}`:""} </h3>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Piece
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {pieces.map(piece => {
                        return (<Dropdown.Item key={piece.id} onClick={() => setEditPiece(piece)} >{piece.name}</Dropdown.Item>)
                    })}
                    
                </Dropdown.Menu>
            </Dropdown>

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

                <Form.Group className="mb-3" >
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control  
                                placeholder="Paste image address here"
                                
                                name="image_url"
                                id="image_url"
                                value={formik.values.image_url}
                                onChange={formik.handleChange}
                            />
                        </Form.Group>
                        <p className="text-danger m-3"> {formik.errors.image_url}</p>
                        {errors.map((err) => <p className="text-danger m-3" key={err}>{err}</p>)}
                <Button type="submit" >Submit Edits</Button>
            </Form>

        </div>
    )
}

export default Edit