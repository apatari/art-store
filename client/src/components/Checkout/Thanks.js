import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";


export default function Thanks() {
    const [cart, setCart] = useContext(CartContext)

    const [order, setOrder] = useState(null)
    const [pieces, setPieces] = useState(null)

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
        .then(data => {
            // console.log("order", data.order, "pieces", data.pieces)
            if (data.order !== null){
                setOrder(data.order)
                setPieces(data.pieces)
            }
            
        })
    }, [])
    
    const orderDate = (order)? new Date(Date.parse(order.created_on)):0

    return (
        // remove items from cart, remove payment intent from session once it's there
        <div  className="my-3 mx-5 p-3 bg-light rounded">
            {order && 
                <div>
                    <h2 className="mb-4" >Thank you for your purchase</h2>
                    <h5 className="ms-3 mb-3" >A reciept email has been sent to: <strong>{order.customer_email}</strong> </h5>
                    <h5 className="ms-3 mb-3" >Your order number is <strong>{order.id}</strong> </h5>
                    <h3>Order Details:</h3>
                     <div className="ms-3 fs-5">

                     <p> Price total: <strong>${order.price_total / 100}</strong> </p>
                     <p> Shipping address: <strong>{order.address}, {order.address2 ? order.address2 + ', ' : ""} {order.city} {order.state}, {order.zip}</strong> </p>
                     <p> Order Date: <strong> {orderDate.toLocaleDateString()}</strong></p>
                     {pieces.map(piece => {
                         return (
                             <div key={piece.id}>
                                <p>{piece.name}</p>
                                <p>{piece.price}</p>
                            </div>
                        )
                    })}
                    </div>


                </div>}
        </div>
    )
}