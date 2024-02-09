import React, { useState } from "react";
import DeleteButton from "./DeleteButton";

function Delete({ pieces }) {

    return (
        <div>
            <h3>Select piece to delete:</h3>
            <div className="m-3"  >
                {pieces.map(piece => <DeleteButton key={piece.id} piece = {piece} />)}
            </div>

            
        </div>
    )
}

export default Delete