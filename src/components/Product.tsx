"use client";

import * as React from "react";
import { useCart } from "./CartContext";
import { Button } from "@/components/ui/button";
import { products } from "@/app/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type product = {
  product: products;
};

const Product = ({ product }: product) => {
  const { addToCart, cardContent } = useCart();
  const isProductIncart = cardContent.some((item) => item.id === product.id);
  return (
    <Card className=" mt-4 md:w-64 overflow-hidden">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>${product.price}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button
          disabled={isProductIncart}
          className={`${
            isProductIncart
              ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
          onClick={() => {
            addToCart(product);
          }}
        >
          {isProductIncart ? "Added to Cart" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Product;
