import React, { useContext } from "react";
import { CartContext } from "../App";
import CheckoutItem from "./CheckoutItem";

export default function CheckoutItemsList({ pieces }) {
    
    const [cart, setCart] = useContext(CartContext)

    const cartPieces = pieces.filter(piece => cart.includes(piece.id))

    return ( 
        <div className="mx-4 px-3">
            {cartPieces.map(piece => <CheckoutItem key={piece.id} piece={piece} setCart={setCart} />)}
        </div>
    )
}