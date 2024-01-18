import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css'
import "bootswatch/dist/cosmo/bootstrap.min.css";
import Header from "./Header";
import Body from "./Body";



function App() {
  return (
    <div className="bg"  >
      <Header />
      <Body />
    </div>
  )
}

export default App;
