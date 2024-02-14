import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function PieceContact( { piece }) {

   

    return (
        <div className="my-3" >
            

            <Form action="https://formsubmit.co/afaf042b91a1fd976c5ba9c32cd6e55b" method="POST" >
                <Form.Group className="mb-3" >
                    <Form.Label>Provide a message:</Form.Label>
                    <Form.Control as="textarea" rows={3} name="message" required placeholder="message"/> 
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Your email address:</Form.Label>
                    <Form.Control type="email" name="email" required placeholder="email"/>
                </Form.Group>
                <Form.Control type="text" hidden name="piece" value={piece.name}/>
                
                <Button className="my-2" type="submit" >Send</Button>
            </Form>
            

        </div>
    )
}

export default PieceContact