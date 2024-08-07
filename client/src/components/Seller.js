import React, { useEffect, useState } from "react";
import Login from "./Login";
import { Button, ButtonGroup, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import New from "./Seller-options/New";
import Edit from "./Seller-options/Edit";
import Delete from "./Seller-options/Delete";

function Seller({ user, setUser }) {

    
    const history = useHistory()
    const [mode, setMode] = useState("new")

    const [pieces, setPieces] = useState([])

    useEffect(() => {
        fetch('/api/pieces')
        .then(res => res.json())
        .then(data => setPieces(data)
            )
    }, [])

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
            } else {
                setUser(null)
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
            <h2 className="m-3" >Seller page</h2>
            <ButtonGroup aria-label="Basic example">
                <Button variant="info" onClick={handleNewClick} >New</Button>
                {/* <Button variant="light" onClick={handleEditClick}  >Edit</Button> */}
                <Button variant="warning" onClick={handleDeleteClick} >Delete</Button>
            </ButtonGroup>
        
        <Col className="m-3 p-3 bg-light rounded" lg={8} >
            {(mode === "new")? <New/> : ""}
            {/* {(mode === "edit")? <Edit pieces={pieces}/> : ""} */}
            {(mode === "delete")? <Delete pieces={pieces} /> : ""}
        </Col>
        

        </div>
    )
}

export default Seller