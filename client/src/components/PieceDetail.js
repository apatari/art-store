import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function PieceDetail() {

    const { piece_id } = useParams()

    return (
        <div>
            <h2>view for piece {piece_id} </h2>
        </div>
    )
}

export default PieceDetail