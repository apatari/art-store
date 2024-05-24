import React, { useContext, useEffect } from "react";
import { CartContext } from "../App";

export default function Thanks() {
    const [, setCart] = useContext(CartContext)

    useEffect(() => {
        fetch('/api/cart', {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(data => setCart(data))
    })

    return (
        // remove items from cart, remove payment intent from session
        <div>Thanks</div>
    )
}