import { products } from "@/app/page";
import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getActiveProduct = async () => {
  try {
    // this represent  the products id that are currently active (visible to
    const checkProducts = await stripe.products.list();
    const availableProducts = checkProducts.data.filter(
      (product: any) => product.active === true
    );
    return availableProducts;
  } catch (error) {
    console.log(error.message);
  }
};

export const POST = async (req: any) => {
  // This product represents the argument in the dataObject
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

  // this part  updates existing products with new information from the request  or keeps them as they are if no changes were
  activeProducts = await getActiveProduct();
  let stripeItems: any = [];
  for (const product of ProductArr) {
    const stripeProduct = activeProducts?.find(
      (prod: any) => prod?.name?.toLowerCase() === product?.name?.toLowerCase()
    );
    if (stripeProduct) {
      stripeItems.push({
        price: stripeProduct.default_price,
        quantity: product?.quantity,
      });
    }
  }
  /*****************************
   * Create the Checkout Session *
   *****************************/
  // this part create  checkout session with items in it
  const session = await stripe.checkout.sessions.create({
    line_items: stripeItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  //  send back the session to client side
  return NextResponse.json({ url: session.url });
};
