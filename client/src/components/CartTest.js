import React, { useState } from "react";

import { Button } from "react-bootstrap";

export default function CartTest() {

    const [cart, setCart] = useState(10)

    const handleGet = () => {
        fetch('/api/cart')
        .then(res => res.json())
        .then(data => setCart(JSON.stringify(data)))
    }

    const handlePost = () => {
        // axios.post('/api/cart', {"id": 4}, {withCredentials: true})
        // .then(res => setCart(JSON.stringify(res.data)))
        fetch('/api/cart', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify({"id": 8})
        })
        .then(res => res.json())
        .then(data => setCart(JSON.stringify(data)))
        
    }

    return (

        <div>
            <Button onClick={handleGet}>GET</Button>
            <Button onClick={handlePost}>POST</Button>
            {cart}
        </div>
    )
}