import React from "react";
import Link from 'next/link';
import mongoose from "mongoose";
import Product from "@/models/Product";

const Sweets = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 items-center justify-center ">
            
              {products.map((item) => {
                return <Link className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-4 " passHref={true} key={item._id} href={`/product/${item.slug}`}><div>
                  <img alt="ecommerce" className="m-auto h-[28vh] md:h-[32vh] block" src={item.img} />
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Sweets</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
                    <p className="mt-1">₹{item.price}</p>
                  </div>
                  </div>
                </Link>
              })}
            
          </div>
        </div>
      </section>
    </div>
  )
}


export async function getServerSideProps() {

  // Do it this way with fetch or directly write logic which is recommended in documentation
  // let res = await fetch("http://localhost:3000/api/getproducts")
  // let products = await res.text()

  // Direct logic
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({ category: "Sweets" })
  return {
    // fetch way
    // props: {products:JSON.parse(products)}, // will be passed to the page component as props

    // Direct logic
    props: { products: JSON.parse(JSON.stringify(products)) }
  }
}

export default Sweets;


