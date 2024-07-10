import React, { useEffect, useState } from "react";

import Login from "../Login";

export default function Orders({user, setUser}) {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch("/api/check_session")
        .then(r => {
            if (r.ok) {
                r.json().then(user => setUser(user))
            } else {
                setUser(null)
            }
        })

    }, [])

    useEffect(() => {
        fetch('/api/orders')
        .then(r => r.json())
        .then(data => setOrders(data))
    }, [])

    if (!user) return (
        <Login setUser={setUser}/>
    )


    if (user) return (
        <div>
            {orders && orders.map(order => <p key={order.id} >{order.id}, {order.customer_email}</p>)}
        </div>
    )
}