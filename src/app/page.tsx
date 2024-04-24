import Product from "@/components/Product";
import React from "react";
import Cart from "@/components/Cart";
export type products = {
  id: number;
  name: string;
  price: number | string;
  quantity: number;
};

const Products: products[] = [
  { id: 1, name: "Product 1", price: "$25", quantity: 3 },
  { id: 2, name: "Product 2", price: "$25", quantity: 3 },
  { id: 3, name: "Product 3", price: "$25", quantity: 3 },
];
const HomePage = () => {
  return (
    <main className="flex bg-black text-white min-h-screen flex-col items-center justify-center p-24">
      <div className=" flex flex-col gap-3">
        <h1 className="text-2xl pt-10 pb-5"> Welcome to our store!</h1>
      </div>
      <div className=" md:grid grid-flow-col gap-4  ">
        {Products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      <Cart />
    </main>
  );
};

export default HomePage;
