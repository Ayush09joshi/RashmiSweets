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

            {Object.keys(products).map((item) => {
              return <Link className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-4 " passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}><div>
                <img alt="ecommerce" className="m-auto h-[28vh] md:h-[32vh] block" src={products[item].img} />
                <div className="mt-4 text-center md:text-left">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Sweets</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                  <p className="mt-1">₹{products[item].price}</p>
                  <div className="mt-1">
                    {products[item].size.includes('250g') && <span className="border border-gray-300 px-1 mx-1">250g</span>}
                    {products[item].size.includes('500g') && <span className="border border-gray-300 px-1 mx-1">500g</span>}
                    {products[item].size.includes('1kg') && <span className="border border-gray-300 px-1 mx-1">1kg</span>}
                    {products[item].size.includes('5kg') && <span className="border border-gray-300 px-1 mx-1">5kg</span>}
                  </div>
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

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({ category: "sweets" })
  let sweets = {}

  for (let item of products) {   //When product already exist and new size is available, do this.
    if (item.title in sweets) {    //Does this size already exists do this, otherwise do nothing.
      if (!sweets[item.title].size.includes(item.size) && item.availableQty > 0) {
        sweets[item.title].size.push(item.size);

      }
    }
    else {//When there is no product available, do this (ideally). 
      sweets[item.title] = JSON.parse(JSON.stringify(item)); //Getting all the data as an array by making TITLE as KEY.
      if (item.availableQty > 0) {
        sweets[item.title].size = [item.size]; //Make size an array and put the value in it.
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(sweets)) }
  }
}

export default Sweets;


