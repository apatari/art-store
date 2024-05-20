import React from "react";

export default function Payment({userInfo}) {
    return (
        <div className="my-3 mx-5 p-3 bg-light rounded">
            {userInfo.email}
        </div>
    )
}