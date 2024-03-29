import React from "react";
import { Nav, Container, Navbar, Row, Col, Form, Button } from "react-bootstrap"
import "./header.css"

function Header() {
    return (
        <Navbar expand="lg" className="  ">
            <Container>
                <Navbar.Brand href="/" className="fs-2 text-secondary" style={{fontFamily: "revert" }} >
                    <img src="/ML.png" alt="ML logo" style={{height: "100px"}} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                
                <Nav className="ms-auto fs-3">
                    <Nav.Link href="/" className="mx-2" >Weavings</Nav.Link>
                    {/* <Nav.Link href="/about" className="mx-2" >About</Nav.Link> */}
                    <Nav.Link href="/contact" className="mx-2" >Contact</Nav.Link>
                    
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header