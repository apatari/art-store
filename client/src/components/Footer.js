import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Footer() {
    return (
        <div className="bg-dark p-3 text-light d-flex mt-auto" >
            <Col lg={2}></Col>
            <Col className="m-2" lg={6}>
                <Row >
                    MaryLou Patari
                </Row>
                <Row>Brattleboro, VT</Row>
                <Row>mlpatari@yahoo.com</Row>
                
            </Col>
            <Col className="m-2"  lg={4}>
                <Row>
                    Website by Andy Patari
                </Row>
                <Row style={{display: "inline"}} >

                        <a href="https://github.com/apatari" target="blank">Github</a>
                   
                        <a href="https://www.linkedin.com/in/andrew-patari/" target="blank">Linkedin</a>
                    
                      
                </Row>
                <Row>
                    <Link to="/seller"  >Seller</Link>  
                </Row>
            </Col>
            
        </div>
    )
}

export default Footer