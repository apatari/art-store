import React, { useEffect, useState } from "react";
import PieceList from "./PieceList";

function Body() {

    const [pieces, setPieces] = useState(null)

    useEffect(() => {
        fetch('/api/pieces')
        .then(res => res.json())
        .then(data => {
            setPieces(data)
            console.log(data)
        })
    }, [])


    return (
        <div>
            Start with sold carousel, cards below that
            <PieceList />
        </div>
    )
}

export default Body