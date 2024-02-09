import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

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

    // use state to check if the piece wasn't found, then show an error page with an else clause above

    if (notFound) {
        return (
            <h3>Piece not found!</h3>
        )
    }

    return (
        <div className="m-4" >
            <h2>view for piece {piece_id} </h2>
            {piece && <h4>There is a piece here</h4>}
        </div>
    )
}

export default PieceDetail