import React, { useEffect, useState } from "react";
import PieceList from "./PieceList";

function Body({ pieces }) {



    return (
        <div>
            
            <PieceList pieces={pieces}/>
        </div>
    )
}

export default Body