import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useEffect, useState } from 'react'


export default function App({ Component, pageProps }) {

  // *****************Creating Cart**********************

  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  //It will be run when the page will be reload.
  useEffect(() =>{
    try {
      //If user Already exist, load the cart.
    if(localStorage.getItem("cart")){
      setCart(JSON.parse(localStorage.getItem("cart")))
      saveCart(JSON.parse(localStorage.getItem("cart")))   
    }
    } catch (error) {
      console.log(error);
      localStorage.clear()
    }
    
  }, []);

  //Retain things on cart even after page reload.
  const saveCart = (myCart)=>{
    localStorage.setItem("cart", JSON.stringify(myCart))

    //SubTotal
    let subt = 0;
    // Object.keys() method changes cart into iterable array
    let keys = Object.keys(myCart)

    for(let i=0; i<keys.length; i++){
      subt += myCart[keys[i]].price * myCart[keys[i]].qty
    }
    setSubTotal(subt);
  }

  //Adding Items in Cart
  const addToCart = (itemCode, qty, price, name)=>{
    let newCart = cart;
    if(itemCode in cart){
    //If some item already Exists in the cart.
      newCart[itemCode].qty = newCart[itemCode].qty + qty
    }
    else{
      newCart[itemCode] = {qty:1, price, name} 
    }

    //Calling Function to set things on cart.
    setCart(newCart)
    //Calling Function to retain things on cart even after page reload.
    saveCart(newCart);
  }
    //Clear Cart
    const clearCart = ()=>{
      setCart({})
      saveCart({})
    }

    //Remove from Cart
    const removeFromCart = (itemCode, qty, price, name) => {
      let newCart = cart;
      if(itemCode in cart){
      //If some item already Exists in the cart.
        newCart[itemCode].qty = newCart[itemCode].qty - qty
      }
      //Checking if cart is already empty
      if(newCart[itemCode].qty <= 0){
        delete newCart[itemCode]
      }
      setCart(newCart)
      saveCart(newCart)
    }

  return<>
  <Navbar cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
  <Component cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
  <Footer />
  </>
  

}
