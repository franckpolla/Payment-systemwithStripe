// Cart.test.tsx
import React from "react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Cart from "@/components/Cart";
import { useCart } from "@/components/CartContext"; // Assuming CartContext is a separate file
import axios from "axios";

jest.mock("./CartContext", () => ({
  useCart: jest.fn(),
}));

describe("Cart component", () => {
  it("should render empty cart message when cart is empty", () => {
    useCart.mockReturnValue({
      cardContent: [],
      increamentQuantity: jest.fn(),
      decreamentQuantity: jest.fn(),
      removeFromCart: jest.fn(),
    });

    render(<Cart />);

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });

  it("should render cart content and total amount when cart is not empty", () => {
    const mockCartContent = [
      { id: 1, name: "Product 1", price: 10, quantity: 2 },
      { id: 2, name: "Product 2", price: 20, quantity: 1 },
    ];

    useCart.mockReturnValue({
      cardContent: mockCartContent,
      increamentQuantity: jest.fn(),
      decreamentQuantity: jest.fn(),
      removeFromCart: jest.fn(),
    });

    render(<Cart />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("$60.00")).toBeInTheDocument();
  });

  it("should increment product quantity when clicking plus button", () => {
    const mockCartContent = [
      { id: 1, name: "Product 1", price: 10, quantity: 1 },
    ];
    const mockIncrementQuantity = jest.fn();

    useCart.mockReturnValue({
      cardContent: mockCartContent,
      increamentQuantity: mockIncrementQuantity,
      decreamentQuantity: jest.fn(),
      removeFromCart: jest.fn(),
    });

    render(<Cart />);

    fireEvent.click(screen.getByText("+"));

    expect(mockIncrementQuantity).toHaveBeenCalledWith(mockCartContent[0].id);
  });

  it("should decrement product quantity when clicking minus button", () => {
    const mockCartContent = [
      { id: 1, name: "Product 1", price: 10, quantity: 2 },
    ];
    const mockDecrementQuantity = jest.fn();

    useCart.mockReturnValue({
      cardContent: mockCartContent,
      increamentQuantity: jest.fn(),
      decreamentQuantity: mockDecrementQuantity,
      removeFromCart: jest.fn(),
    });

    render(<Cart />);

    fireEvent.click(screen.getByText("-"));

    expect(mockDecrementQuantity).toHaveBeenCalledWith(mockCartContent[0].id);
  });

  it("should display error message on failed payment", async () => {
    useCart.mockReturnValue({
      cardContent: [{ id: 1, name: "Product 1", price: 10, quantity: 2 }],
      increamentQuantity: jest.fn(),
      decreamentQuantity: jest.fn(),
      removeFromCart: jest.fn(),
    });

    jest
      .spyOn(axios, "post")
      .mockRejectedValueOnce(new Error("Payment failed"));

    render(<Cart />);

    fireEvent.click(screen.getByText("Buy Now"));

    await waitFor(() => screen.getByText("Payment failed"));

    expect(screen.getByText("Payment failed")).toBeInTheDocument();
  });

  // Add similar tests for successful checkout and invalid data response
});
