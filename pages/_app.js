import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import LoadingBar from "react-top-loading-bar";


export default function App({ Component, pageProps }) {

  // *****************Creating Cart**********************

  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user,setUser]=useState({value:null}) ;
  const [key,setKey]=useState(0) ;
    const [progress, setProgress] = useState(0);

  const router= useRouter() ;

  //It will be run when the page will be reload.
  useEffect(() =>{
      router.events.on("routeChangeStart", () => {
        setProgress(40);
      });

      router.events.on("routeChangeComplete", () => {
        setProgress(100);
      });

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
    const token=localStorage.getItem('token') ;
    if(token){
      setUser({value:token}) ;
      setKey(Math.random)
    } 
  }, [router.query]);

  const logout= ()=>{
    localStorage.removeItem('token') ;
    setUser({value:null}) ;
    setKey(Math.random()) ;
  }
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
   const buyNow = (itemCode,qty,price,name) => {
       let newCart = {itemCode:{qty:1, price,name}};
     

       //Calling Function to set things on cart.
       setCart(newCart);
       //Calling Function to retain things on cart even after page reload.
       saveCart(newCart);
//    addToCart(slug, 1, product.price, product.title);
     router.push("/checkout");
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

  return (
    <>
      <LoadingBar
        color="#ff2d55"
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />

      <Navbar
        logout={logout}
        user={user}
        key={key}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
      <Component
        buyNow={buyNow}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        {...pageProps}
      />
      <Footer />
    </>
  );
  

}
