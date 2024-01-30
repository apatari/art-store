import React from "react";
import PieceCard from "./PieceCard";

function PieceList({ pieces }) {
    return (
        <div className="my-3 mx-5 d-flex flex-wrap" >

            {pieces.map((piece) => {
                return <PieceCard piece={piece} key={piece.id} />
                
            })}
        pieces here
        </div>
    )
}

export default PieceList