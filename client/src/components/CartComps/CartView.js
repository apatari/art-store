import React from "react"
import { Offcanvas, Row, Col, Button } from "react-bootstrap"
import CartItem from "./CartItem"

export default function CartView ({ show, handleClose, setCart, cartPieces}) {

    const preTotal = cartPieces.reduce((acc,piece) => {
        return acc += piece.price}, 0  )

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" scroll='true'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Your Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                
            {cartPieces.map(item => <CartItem key={item.id} piece={item} setCart={setCart} /> )}

            <hr />

            {(cartPieces.length === 0)?
                <Row className="bg-danger bg-opacity-25 m-2 p-2 rounded fs-4">
                    Cart is empty
                 </Row> :
                 <div>

                <Row className="bg-primary bg-opacity-25 m-2 p-2 rounded">
                    <Col>
                        <Row className="fs-4">
                            Total:
                        </Row>
                        <Row>
                            Plus tax and shipping
                        </Row>
                    </Col>
                    <Col>
                        <div className="text-end fs-3"> ${preTotal}

                        </div>
                    </Col>
                </Row>
                <Button href="/checkout" className="m-2 ">Checkout</Button>
                 </div>
            }

            
            </Offcanvas.Body>
        </Offcanvas>
    )
}