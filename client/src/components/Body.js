import React, { useEffect, useState } from "react";
import PieceList from "./PieceList";

function Body() {

    const [pieces, setPieces] = useState([])

    useEffect(() => {
        fetch('/api/pieces')
        .then(res => res.json())
        .then(data => setPieces(data)
            )
    }, [])


    return (
        <div>
            Start with sold carousel, cards below that
            <PieceList pieces={pieces}/>
        </div>
    )
}

export default Body