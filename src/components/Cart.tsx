"use client";
import React from "react";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";

const Cart = () => {
  return (
    <div>
      <Card className="w-96 mt-10 md:w-[450px] md:h-[200px] overflow-hidden">
        <CardHeader>
          <CardTitle>Your Cart</CardTitle>
        </CardHeader>
        <ul>
          <li className="flex px-4 justify-between items-center mb-2">
            <div>
              <p className="font-semibold"> Product 1</p>
              <p className="text-gray-400"> $5.99/item</p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => {}}
                className="border rounded-sm px-4 bg-red-500"
              >
                -
              </button>
              <button
                onClick={() => {}}
                className="border rounded-sm px-4 bg-green-500"
              >
                +
              </button>
            </div>
          </li>
          <li className="flex px-4 justify-between items-center mb-2">
            <div>
              <p className="font-semibold"> Product 1</p>
              <p className="text-gray-400"> $5.99/item</p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => {}}
                className="border rounded-sm px-4 bg-red-500"
              >
                -
              </button>
              <button
                onClick={() => {}}
                className="border rounded-sm px-4 bg-green-500"
              >
                +
              </button>
            </div>
          </li>
        </ul>
        <div className="p-4">
          <div className="mt-6 mb-2">
            <p> Total Amount: $255.252</p>
          </div>
          <Button onClick={() => {}}>Buy Now</Button>
        </div>
      </Card>
    </div>
  );
};

export default Cart;
