import React, { useContext, useEffect } from "react";
import { CartContext } from "./App";

export default function CartDropdown() {

    const [cart] = useContext(CartContext)
    

    return(
        <div className="d-flex m-3 ">
            <p className="my-auto fs-5 bg-info bg-opacity-25 p-2 rounded ">Shopping Cart {(cart.length === 0)? "" : "(" + (cart.length)  + ")"} </p>
        </div>
    )
}