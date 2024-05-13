import React from "react";

export default function CartItem({ piece }) {
    return (
        <div>
            {piece.name}
            {piece.price}
        </div>
    )
}