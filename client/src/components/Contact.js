import React from "react";
import { Row, Col } from "react-bootstrap";
import PieceContact from "./PieceContact";

function Contact() {
    return (
        <div>
            <div className="m-3" >
            <Row  className="m-4  bg-light rounded p-3" >
                <Col lg={8} className="m-3"  >
                    <h2 className="my-3" >Contact ML </h2>
                    <h5 className="my-3" >Use the form below to get in touch with the artist.  Don't forget to
                    include your email to get a reply.</h5>
                    
                    <hr />
                    <PieceContact piece={{"name": "Main contact form"}} />
                </Col>
               
            </Row>
            
            
            
        </div>
        </div>
    )
}

export default Contact