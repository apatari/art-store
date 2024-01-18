import React from "react";
import { Nav, Container, Navbar } from "react-bootstrap"
import "./header.css"

function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary backg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header