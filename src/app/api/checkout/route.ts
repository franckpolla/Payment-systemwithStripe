import { products } from "@/app/page";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (req: any) => {
  const { product } = await req.json();
  const data: products[] = product;

  try {
    const prods = await stripe.products.list();
    console.log(prods);
  } catch (error) {
    console.log(error.message);
  }

  return NextResponse.json({ url: "" });
};
