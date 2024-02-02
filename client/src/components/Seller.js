import React, { useEffect, useState } from "react";
import Login from "./Login";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Seller() {

    const [user, setUser] = useState(null)
    const history = useHistory()

    function handleLogoutClick() {
        fetch('/api/logout', {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(data => history.push("/"))
    }

    useEffect(() => {
        fetch("/api/check_session")
        .then(r => {
            if (r.ok) {
                r.json().then(user => setUser(user))
            }
        })

    }, [])

    if (!user) return (
        <Login setUser={setUser}/>
    )

    return (
        <div>
            <h2>Seller page</h2>
            <Button onClick={handleLogoutClick} >Logout</Button>
        </div>
    )
}

export default Seller