import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";


export default function Thanks() {
    const [cart, setCart] = useContext(CartContext)

    const [order, setOrder] = useState(null)

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    const pi_id = urlParams.get('payment_intent')

    useEffect(() => {
        fetch('/api/cart', {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, [])

    useEffect(() => {
        fetch(`/api/thanks/${pi_id}`)
        .then(res => res.json())
        .then(data => setOrder(data))
    }, [])
    


    return (
        // remove items from cart, remove payment intent from session
        <div>
            {order && 
                <div>
                     <p> {order.customer_email}</p>
                     <p> {order.price_total}</p>
                     <p> {order.created_on}</p>
                </div>}
        </div>
    )
}