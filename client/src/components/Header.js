import React from "react";
import { Nav, Container, Navbar, Row, Col, Form, Button } from "react-bootstrap"
import "./header.css"

function Header() {
    return (
        <Navbar expand="lg" className="  ">
            <Container>
                <Navbar.Brand href="#home" className="fs-2 text-secondary" style={{fontFamily: "revert" }} >Art - Mary Lou Patari</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Form inline className="mx-auto" >
                    <Row>
                    <div class="input-group m-3">
                        <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"/>
                        <button class="btn btn-secondary" type="button" id="button-addon2">Button</button>
                    </div>
                    </Row>
                </Form>
                <Nav className="ms-auto fs-4">
                    <Nav.Link href="#home" className="mx-2" >Weavings</Nav.Link>
                    <Nav.Link href="#link" className="mx-2" >About</Nav.Link>
                    <Nav.Link href="#seller" className="mx-2" >Seller</Nav.Link>
                    
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header