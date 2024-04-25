import { products } from "@/app/page";
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getActiveProduct = async () => {
  try {
    const checkProducts = await stripe.product.list();
    const availableProducts = checkProducts.data.filter(
      (product: any) => product.active === true
    );
    return availableProducts;
  } catch (error) {
    console.log(error.message);
  }
};

export const POST = async (req: any) => {
  const { products } = await req.json();
  const ProductArr: products[] = products;

  let activeProducts = await getActiveProduct();

  try {
    for (const product of ProductArr) {
      // function checks  if the product is already in Stripe and  it's active, otherwise creates a new one
      const stripeProduct = activeProducts?.find(
        (stripeProduct: any) =>
          stripeProduct?.name?.toLowerCase() === product?.name?.toLowerCase()
      );
      if (!stripeProduct) {
        const newProduct = await stripe.products.create({
          name: product.name,
          default_price_data: {
            unit_amount: product.price * 100,
            currency: "usd",
          },
        });
        console.log(`New product created: ${newProduct.id}`);
      } else {
        console.log(`Product already exists: ${stripeProduct.id}`);
      }
    }
  } catch (error) {
    console.error("Error creating a new product", error.message);
    return NextResponse.json(
      { message: "Product creation failed!", error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ url: "" });
};
