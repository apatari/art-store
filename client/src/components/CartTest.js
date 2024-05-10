import React, { useContext, useState } from "react";

import { Button } from "react-bootstrap";
import { CartContext } from "./App";

export default function CartTest() {

    const [cart, setCart] = useContext(CartContext)

    const handleGet = () => {
        fetch('/api/cart')
        .then(res => res.json())
        .then(data => setCart(data))
    }
    const handleClear = () => {
        fetch('/api/cart', {method: 'DELETE'})
        .then(res => res.json())
        .then(data => setCart(data))
    }

    const handlePost = () => {
    
        fetch('/api/cart', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify({"id": 7})
        })
        .then(res => res.json())
        .then(data => setCart(data))
        
    }

    return (

        <div>
            <Button onClick={handleClear}>Clear</Button>
            <Button onClick={handleGet}>GET</Button>
            <Button onClick={handlePost}>POST</Button>
            {cart}
        </div>
    )
}