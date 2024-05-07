import React, { useEffect, useState }  from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CheckoutForm from "./CheckoutForm";
// stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51PDnewCoCXjZNqi16F9GrgVfxk3V4FFRRIz1WMN4hcSon80QL3yyCZHgHBF4fFvq23spm1j6wEe6bqgQOjU0HoRF00p4Ug7BXC");


function Checkout() {
    const { piece_id } = useParams()
    const [piece, setPiece] = useState(null)
    const [notFound, setNotFound] = useState(false)
    

    useEffect(() =>{
        fetch(`/api/pieces/${piece_id}`)
        .then(res => {if (res.ok)
            {res.json()
            .then(data => setPiece(data))} else{setNotFound(true)} })
        
    }, [piece_id])


    if (notFound) {
        return (
            <h3 className="m-4" >Oops, looks like that piece doesn't exist...</h3>
        )
    }
    if (piece){
    return (
        <CheckoutForm piece={piece} />
    )}
}

export default Checkout