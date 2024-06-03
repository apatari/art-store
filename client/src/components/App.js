import React, { useEffect, useState, createContext } from "react";
import { Switch, Route } from "react-router-dom";


// import 'bootstrap/dist/css/bootstrap.min.css'
import "bootswatch/dist/cosmo/bootstrap.min.css";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import About from "./About";
import Contact from "./Contact";
import Seller from "./Seller";
import PieceDetail from "./PieceDetail";
// import Checkout from "./Checkout/Checkout";
import UserOrGuest from "./Checkout/UserOrGuest";
import GuestCO from "./Checkout/GuestCO";
import Payment from "./Checkout/Payment";
import Thanks from "./Checkout/Thanks";


export const CartContext = createContext([])

function App() {

  const [cart, setCart] = useState([])
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    if (window.location.pathname !== '/thanks') {
      
      fetch('/api/cart')
      .then(res => res.json())
      .then(data => {
        
        setCart(data)
      })
    }
    
  }, [])

  const [pieces, setPieces] = useState([])

  useEffect(() => {
      fetch('/api/pieces')
      .then(res => res.json())
      .then(data => setPieces(data)
          )
  }, [])

  
  return (
    <div className="bg"  >
      <CartContext.Provider value = {[cart, setCart]}>
        <Header pieces={pieces} />
        <Switch>

          <Route exact path="/">
            <Body pieces={pieces} />
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

          <Route exact path='/checkout/'>
            <UserOrGuest pieces={pieces}/>
          </Route>

          <Route exact path='/checkout/guest'>
            <GuestCO setUserInfo={setUserInfo}/>
          </Route>

          <Route exact path='/payment'>
            <Payment userInfo={userInfo} pieces={pieces}/>
          </Route>
          <Route exact path='/thanks'>
            <Thanks />
          </Route>

        </Switch>
      </CartContext.Provider>

      
      <Footer />
    </div>
  )
}

export default App;
