import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function DeleteButton({ piece }) {

    const history = useHistory()

    const [showModal, setShowModal] = useState(false)
    
    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)



        
        const handleDeleteConfirm = () => {
            
            fetch(`/api/pieces/${piece.id}`, {
                method: "DELETE"
            })
            .then(r => {
                if (r.ok) {
                    
                    history.push('/')
                } else {
                    alert("Error: delete unsuccessful")
                    handleClose()
                }
            })
        }



    return (
        <div className="m-2" >
            <Button className="btn-danger rounded"  onClick={handleShow} >{piece.name}</Button>
            <Modal centered  show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Confirm Delete Piece: {piece.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-dark fs-5" >This will delete the piece permanently</Modal.Body>
                <Modal.Footer>
                <Button className="btn me-auto" onClick={handleClose}>
                    Cancel
                </Button>
                <Button className="btn-warning " onClick={handleDeleteConfirm}>
                    Delete it
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
    )
}

export default DeleteButton