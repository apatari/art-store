import React from "react";


function Delete({ pieces }) {
    return (
        <div>
            {pieces.map(piece => <p key={piece.id} >{piece.name}</p>)}
        </div>
    )
}

export default Delete