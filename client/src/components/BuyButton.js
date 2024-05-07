import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function BuyButton() {

        const [show, setShow] = useState(false)
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);



    return(
        <div>
            <Button onClick={handleShow} >Buy this piece</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Enter Payment Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>Stripe stuff and a form element here</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Buy(PH)
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
        
    
}

export default BuyButton