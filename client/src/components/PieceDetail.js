import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Row, Col } from "react-bootstrap";
import PieceContact from "./PieceContact";

function PieceDetail() {

    const { piece_id } = useParams()
    const [piece, setPiece] = useState(null)
    const [notFound, setNotFound] = useState(false)

    useEffect(() =>{
        fetch(`/api/pieces/${piece_id}`)
        .then(res => {if (res.ok)
            {res.json()
            .then(data => setPiece(data))} else{setNotFound(true)} })
        
    }, [])



    if (notFound) {
        return (
            <h3 className="m-4" >Oops, looks like that piece doesn't exist...</h3>
        )
    }
    if (piece){
    return (
        <div className="m-3" >
            <Row  className="m-4  bg-light rounded p-3" >
                <Col lg={6} className="m-3"  >
                    <h2 className="my-3" >{piece.name} </h2>
                    <h5 className="my-3" >{piece.description}</h5>
                    <h3 className="my-3" >${piece.price}</h3>
                    <hr />
                    <h5 className="" > <em> Interested in this piece?  Want to know more? Use the form below to get in touch with ML:</em></h5>
                    <PieceContact />
                </Col>
                <Col className="d-flex m-3" >
                    <img className="mx-auto"  src={`/api/pics/${piece.image_url}`} alt="Piece" style={{width: '70%'}} />
                </Col>
            </Row>
            
            
            
        </div>
    )}
}

export default PieceDetail