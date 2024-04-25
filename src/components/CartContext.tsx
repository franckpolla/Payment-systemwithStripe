"use client";
import React from "react";
import { createContext, useState, ReactNode, useContext } from "react";
import { products } from "@/app/page";

type CardContentTypes = {
  // cardContent represents  the array of products adedd to the card.
  cardContent: products[];
  addToCart: (product: products) => void;
  removeFromCart: (productId: number) => void;
  increamentQuantity: (producId: number) => void;
  decreamentQuantity: (productId: number) => void;
};

const CardContext = createContext<CardContentTypes | undefined>(undefined);

type CartProviderType = {
  children: ReactNode;
};

export function CartProvider<CartProviderType>({ children }) {
  const [cardContent, setCardContent] = useState<products[]>([]);
  // cardContent represents the array of product
  const addToCart = (product: products) => {
    const existinPorductIndex = cardContent.findIndex(
      (item) => item.id === product.id
    );
    //
    if (existinPorductIndex !== -1) {
      const updatedCart = [...cardContent]; // update the existing product in array
      updatedCart[existinPorductIndex].quantity += 1;
      setCardContent(updatedCart);
    } else {
      setCardContent([...cardContent, { ...product, quantity: 1 }]); //if no match is found push into array
    }
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cardContent.filter((item) => item.id !== productId);
    setCardContent(updatedCart);
  };

  const increamentQuantity = (productId: number) => {
    const updatedCart = cardContent.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCardContent(updatedCart);
  };

  const decreamentQuantity = (productId: number) => {
    const updatedCart = cardContent.map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 }
        : item
    );
    const filteredCart = updatedCart.filter((item) => item.quantity > 0);

    setCardContent(filteredCart);
  };

  return (
    <CardContext.Provider
      value={{
        cardContent,
        addToCart,
        removeFromCart,
        increamentQuantity,
        decreamentQuantity,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export const useCart = (): CardContentTypes => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error("Usecart must be used within the cardprovider");
  }
  return context;
};
