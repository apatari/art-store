import React, { useState, useContext } from "react";
import { Nav, Container, Navbar, Button } from "react-bootstrap"
import "./header.css"

import CartButton from "./CartComps/CartButton";
import { CartContext } from "./App";

import CartView from "./CartComps/CartView";


function Header({ pieces }) {

    const [cart, setCart] = useContext(CartContext)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)

    const cartPieces = pieces.filter(piece => cart.includes(piece.id))

    const cartHideURLs = ['/payment', '/checkout/guest']

    const showCart = !(cartHideURLs.includes(window.location.pathname))

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
                    

                    {showCart && <CartButton handleOpen={handleOpen}  />}
                    
                    
                </Container>
            </Navbar>

            {/* The cart view is an off canvas element that appears once the cart button is clicked */}
            {showCart && <CartView show={show} handleClose={handleClose} setCart={setCart} cartPieces={cartPieces} />}
            

        </div>
    )
}

export default Header