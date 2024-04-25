"use client";
import React from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { useCart } from "./CartContext";
import axios from "axios";
// useCart represent a  hook that returns the cart state and actions.
const Cart = () => {
  const {
    cardContent,
    increamentQuantity,
    decreamentQuantity,
    removeFromCart,
  } = useCart();
  const TotalAmount = cardContent.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  async function checkout() {
    const dataObject = { products: cardContent };
    try {
      // here  we are making post request to server with our data route.ts
      const response = await axios.post(
        "http://localhost:3000/api/checkout",
        dataObject
      );
      console.log(response.data);
      if (response.data.url) {
        // this  will redirect user on successfull payment page.
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div>
      <Card className="w-96 mt-10   md:w-[450px] md:h-auto pb-5  overflow-hidden">
        <CardHeader>
          <CardTitle>Your Cart</CardTitle>
          {cardContent.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cardContent.map((product) => (
                <li className="flex px-4 justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold"> {product.name}</p>
                    <p className="text-gray-400">
                      {" "}
                      ${product.price.toFixed(2)} *{product.quantity}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => {
                        decreamentQuantity(product.id);
                      }}
                      className="border rounded-sm px-4 bg-red-500"
                    >
                      -
                    </button>

                    <button
                      onClick={() => {
                        increamentQuantity(product.id);
                      }}
                      className="border rounded-sm px-4 bg-green-500"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardHeader>
        {cardContent.length > 0 && (
          <div className="px-4 ">
            <div className="mt-6 mb-2">
              <p> Total Amount: ${TotalAmount.toFixed(2)}</p>
            </div>
            <Button
              onClick={() => {
                checkout();
              }}
            >
              Buy Now
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Cart;
