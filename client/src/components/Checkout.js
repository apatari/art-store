import React, { useEffect, useState }  from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Row, Col } from "react-bootstrap";

function Checkout() {
    const { piece_id } = useParams()
    const [piece, setPiece] = useState(null)
    const [notFound, setNotFound] = useState(false)
    

    useEffect(() =>{
        fetch(`/api/pieces/${piece_id}`)
        .then(res => {if (res.ok)
            {res.json()
            .then(data => setPiece(data))} else{setNotFound(true)} })
        
    }, [piece_id])


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
                    <h3 className="my-3" >${piece.price}</h3> </Col></Row> 
                                   
            
        </div>
    )}
}

export default Checkout