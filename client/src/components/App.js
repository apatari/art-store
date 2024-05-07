import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

// stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// import 'bootstrap/dist/css/bootstrap.min.css'
import "bootswatch/dist/cosmo/bootstrap.min.css";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import About from "./About";
import Contact from "./Contact";
import Seller from "./Seller";
import PieceDetail from "./PieceDetail";
import Checkout from "./Checkout";


const stripePromise = loadStripe("pk_test_51PDnewCoCXjZNqi16F9GrgVfxk3V4FFRRIz1WMN4hcSon80QL3yyCZHgHBF4fFvq23spm1j6wEe6bqgQOjU0HoRF00p4Ug7BXC");


function App() {
  return (
    <div className="bg"  >
      <Header />
      <Switch>

        <Route exact path="/">
          <Body />
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

        <Route exact path="/contact">
          <Contact />
        </Route>

        <Route exact path="/seller">
          <Seller />
        </Route>

        <Route exact path='/pieces/:piece_id'>
          <PieceDetail/>
        </Route>

        <Route exact path='/checkout/:piece_id'>
          <Checkout/>
        </Route>

      </Switch>

      
      <Footer />
    </div>
  )
}

export default App;
