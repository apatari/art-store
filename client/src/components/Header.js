import React, { useState, useContext } from "react";
import { Nav, Container, Navbar, Offcanvas} from "react-bootstrap"
import "./header.css"
import CartTest from "./CartTest";
import CartDropdown from "./CartDropdown";
import { CartContext } from "./App";


function Header({ pieces }) {

    const [cart, setCart] = useContext(CartContext)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)

    const cartPieces = pieces.filter(piece => cart.includes(piece.id))

    return (
        <div>
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
                    

                    <CartDropdown handleOpen={handleOpen}  />
                    
                    <CartTest />
                </Container>
            </Navbar>
            <Offcanvas show={show} onHide={handleClose} placement="end" scroll='true'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Your Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    
                {cartPieces.map(item => <p>{item.name}</p> )}
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    )
}

export default Header