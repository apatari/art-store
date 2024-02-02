import React, { useEffect, useState } from "react";
import Login from "./Login";
import { Button, ButtonGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Seller() {

    const [user, setUser] = useState(null)
    const history = useHistory()
    const [mode, setMode] = useState("new")

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

    const handleNewClick = () => {
        setMode("new")
    }
    const handleEditClick = () => {
        setMode("edit")
    }
    const handleDeleteClick = () => {
        setMode("delete")
    }

    return (
        <div className="m-3" >
            <Button onClick={handleLogoutClick} >Logout</Button>
            <h2>Seller page</h2>
            <ButtonGroup aria-label="Basic example">
                <Button variant="info" onClick={handleNewClick} >New</Button>
                <Button variant="light" onClick={handleEditClick}  >Edit</Button>
                <Button variant="warning" onClick={handleDeleteClick} >Delete</Button>
            </ButtonGroup>
            <h3>{mode}</h3>
        </div>
    )
}

export default Seller