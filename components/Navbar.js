import Image from 'next/image'
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { AiFillPlusCircle, AiFillMinusCircle, AiFillCloseCircle, AiOutlineShoppingCart, AiFillDelete } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = ({ logout,user,cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [dropdown,setDropdown]=useState(false) ;
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full")
      ref.current.classList.add("translate-x-0")
    }
    else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0")
      ref.current.classList.add("translate-x-full")
    }
  }

  const ref = useRef();

  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center shadow-md sticky top-0 z-10 bg-white">
      <div className="logo mx-2 md:mt-2">
        <Link href={"/"}>
          <Image src="/logo.png" alt="lg" width={80} height={60} />
        </Link>
      </div>

      <div className="nav mb-1.5">
        <ul className="flex md:ml-6 space-x-5 font-bold md:text-md">
          <Link href={"/sweets"}>
            <li>Sweets</li>
          </Link>
          <Link href={"/cakes"}>
            <li>Cakes</li>
          </Link>
          <Link href={"/giftboxes"}>
            <li>Gift Boxes</li>
          </Link>
        </ul>
      </div>

      {/* Login and cart Icon */}
      <div className="cursor-pointer cart absolute right-0 top-6 mx-5 flex">
        <a
          onMouseOver={() => {
            setDropdown(true);
          }}
          onMouseLeave={() => {
            setDropdown(false);
          }}
        >
          {dropdown && (
            <div
              onMouseOver={() => {
                setDropdown(true);
              }}
              onMouseLeave={() => {
                setDropdown(false);
              }}
              className="absolute right-10 bg-pink-300 top-6 py-4 rounded-md px-5 w-36"
            >
              <ul>
                <Link href={"/myaccount"}>
                  {" "}
                  <li className="py-1 hover:text-pink-700 text-4m font-bold">
                    My Account
                  </li>
                </Link>
                <Link href={"/orders"}>
                  {" "}
                  <li className="py-1 hover:text-pink-700 text-4m font-bold">
                    Orders
                  </li>
                </Link>
                <li
                  onClick={logout}
                  className="py-1 hover:text-pink-700 text-4m font-bold"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
          {user.value && <FaUserCircle className="text-xl md:text-3xl mx-4" />}
        </a>
        {!user.value && (
          <Link href={"/login"}>
            <button className="bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2">
              Login
            </button>
          </Link>
        )}
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="text-xl md:text-3xl"
        />
      </div>

      {/* Adding Functionality: When Cart have item(s), it opens up automatically. When empty, does nothing. */}
      <div
        ref={ref}
        className={`z-10 w-72 h-screen sideCart overflow-y-scroll absolute top-0 right-0 bg-red-200 px-8 py-10 transform transition-transform ${
          Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
        } `}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl text-red-500"
        >
          <AiFillCloseCircle />
        </span>

        <ol className="list-decimal font-semibold">
          {/* IF cart is empty */}
          {Object.keys(cart).length == 0 && (
            <div className="my-4 font-semibold ">
              Nothing here, let's add something!!
            </div>
          )}

          {/* Adding Items to Cart */}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">{cart[k].name}</div>
                  <div className="flex items-center justify-center w-1/3 font-semibold text-lg">
                    <AiFillMinusCircle
                      onClick={() => {
                        removeFromCart(k, 1, cart[k].price);
                      }}
                      className="cursor-pointer text-red-500"
                    />
                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                    <AiFillPlusCircle
                      onClick={() => {
                        addToCart(k, 1, cart[k].price);
                      }}
                      className="cursor-pointer text-red-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="flex">
          <Link href={"/checkout"}>
            <button className="flex mr-2  text-white bg-red-600 border-0 py-2 px-2 focus:outline-none hover:bg-orange-700 rounded text-sm">
              <BsFillBagCheckFill className="m-1" />
              Checkout
            </button>{" "}
          </Link>
          <button
            onClick={clearCart}
            className="flex mr-2  text-white bg-red-600 border-0 py-2 px-2 focus:outline-none hover:bg-orange-700 rounded text-sm"
          >
            <AiFillDelete className="m-1" /> Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar