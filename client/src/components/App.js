import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css'
import "bootswatch/dist/cosmo/bootstrap.min.css";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import About from "./About";
import Contact from "./Contact";
import Seller from "./Seller";



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

      </Switch>

      
      <Footer />
    </div>
  )
}

export default App;
