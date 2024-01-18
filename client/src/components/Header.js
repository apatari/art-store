import React from "react";
import { Nav, Container, Navbar } from "react-bootstrap"
import "./header.css"

function Header() {
    return (
        <Navbar expand="lg" className="  ">
            <Container>
                <Navbar.Brand href="#home" className="fs-2 text-secondary" style={{fontFamily: "revert" }} >Art - Mary Lou Patari</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto me-5 fs-4">
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