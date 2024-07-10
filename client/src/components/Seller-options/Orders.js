import React, { useEffect } from "react";

import Login from "../Login";

export default function Orders({user, setUser}) {

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

    if (!user) return (
        <Login setUser={setUser}/>
    )


    if (user) return (
        <div>
            Orders
        </div>
    )
}