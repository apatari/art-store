import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function PieceDetail() {

    const { piece_id } = useParams()
    const [piece, setPiece] = useState(null)

    useEffect(() =>{
        fetch(`/api/pieces/${piece_id}`)
        .then(res => {if (res.ok)
            {res.json()
            .then(data => setPiece(data))}})
        
    }, [])

    
    return (
        <div>
            <h2>view for piece {piece_id} </h2>
            {piece && <h4>There is a piece here</h4>}
        </div>
    )
}

export default PieceDetail