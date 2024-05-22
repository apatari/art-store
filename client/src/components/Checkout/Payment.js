import React, { useContext, useState, useEffect } from "react";

import CheckoutForm from "./CheckoutForm";

// stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CartContext } from "../App";

const stripe_key = process.env.REACT_APP_STRIPE_KEY
const stripePromise = loadStripe(stripe_key);


export default function Payment({userInfo, pieces}) {

    const [cart] = useContext(CartContext)

    const [clientSecret, setClientSecret] = useState("")

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "cart": cart, "userInfo": userInfo }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))

    }, [cart, userInfo])

    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };


    const cartPieces = pieces.filter(piece => cart.includes(piece.id))

    const totalPrice = cartPieces.reduce((acc,piece) => {
        return acc += piece.price}, 0  )

    return (
        <div className="my-3 mx-5 p-3 bg-light rounded">
            <h3 className="my-2">Total price: {totalPrice}</h3>
            <h3 className="my-2">Pieces: </h3><ul>{cartPieces.map(piece => <li key={piece.id} className="fs-4">{piece.name}</li>)}</ul>
            <h3 className="mb-4">Please enter payment information</h3>
            {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )} 
        </div>
    )
}