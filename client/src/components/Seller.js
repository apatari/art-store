import React, { useEffect, useState } from "react";
import Login from "./Login";

function Seller() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch("/api/check_session")
        .then(r => {
            if (r.ok) {
                r.json().then(user => setUser(user))
            }
        })

    }, [])

    if (!user) return (
        <Login />
    )

    return (
        <div>
            <h2>Seller page</h2>
        </div>
    )
}

export default Seller