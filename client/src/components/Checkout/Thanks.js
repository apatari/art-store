import React, { useContext, useEffect } from "react";
import { CartContext } from "../App";


export default function Thanks() {
    const [cart, setCart] = useContext(CartContext)

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    console.log(urlParams.get('payment_intent'))

    useEffect(() => {
        fetch('/api/cart', {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, [])
    


    return (
        // remove items from cart, remove payment intent from session
        <div>Thanks</div>
    )
}