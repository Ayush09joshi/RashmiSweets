import React from "react";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "@/models/Product";

const Cakes = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 items-center justify-center ">
            {Object.keys(products).length===0&& <p>sorry all the cakes are currently out of stock. Stock coming soon</p>}
            {Object.keys(products).map((item) => {
              return (
                <Link
                  className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-4 "
                  passHref={true}
                  key={products[item]._id}
                  href={`/product/${products[item].slug}`}
                >
                  <div>
                    <img
                      alt="ecommerce"
                      className="m-auto h-[28vh] md:h-[32vh] block"
                      src={products[item].img}
                    />
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        Cakes
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[item].title}
                      </h2>
                      <p className="mt-1">₹{products[item].price}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  // Do it this way with fetch or directly write logic which is recommended in documentation
  // let res = await fetch("http://localhost:3000/api/getproducts")
  // let products = await res.text()

  // Direct logic
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let products = await Product.find({ category: "cakes" });
  let cakes = {};
  for (let item of products) {
    if (item.title in cakes) {
      if (
        !cakes[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        cakes[item.title].color.push(item.color);
      }
      if (
        !cakes[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        cakes[item.title].size.push(item.size);
      }
    } else {
      cakes[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        cakes[item.title].color = [item.color];
        cakes[item.title].size = [item.szie];
      }
    }
  }
  return {
    // fetch way
    // props: {products:JSON.parse(products)}, // will be passed to the page component as props

    // Direct logic
    props: { products: JSON.parse(JSON.stringify(cakes)) },
  };
}

export default Cakes;
