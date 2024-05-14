import React, { useEffect, useState }  from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CheckoutForm from "./CheckoutForm";
import { Row, Col} from "react-bootstrap";
// stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripe_key = process.env.REACT_APP_STRIPE_KEY
const stripePromise = loadStripe(stripe_key);


function Checkout() {
    const { piece_id } = useParams()
    const [piece, setPiece] = useState(null)
    const [notFound, setNotFound] = useState(false)
    const [clientSecret, setClientSecret] = useState("")
    

    useEffect(() =>{
        fetch(`/api/pieces/${piece_id}`)
        .then(res => {if (res.ok)
            {res.json()
            .then(data => setPiece(data))} else{setNotFound(true)} })
            

        
        
    }, [piece_id])

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "piece": piece }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))

    }, [piece])

    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };


    if (notFound) {
        return (
            <h3 className="m-4" >Oops, looks like that piece doesn't exist...</h3>
        )
    }
    if (piece){
    return (
        <div>
            
           
         
            <div className="m-3" >
                <Row  className="m-4  bg-light rounded p-3" >
                    <Col lg={6} className="m-3"  >
                        <h2 className="my-3" >Checkout: {piece.name} </h2>
                        <img className="mx-auto" src={`/api/pics/${piece.image_url}`} alt="Piece" style={{width: '20%', cursor:'pointer'}} />
                        <h3 className="my-3" >${piece.price}</h3> 
                    </Col>
                    

                </Row>
                                        
                
            </div>          
        <div className="mx-5 my-2 bg-light rounded p-3">
               {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )} 
            </div>
          
          
        </div>
        
        
    )}
}

export default Checkout