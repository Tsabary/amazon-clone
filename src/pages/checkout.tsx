import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

import { selectItems, selectTotal } from "../app/slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Head from "next/head";

const stripePromise = loadStripe(process.env.stripe_public_key || "");

function Checkout() {
  const items: Array<any> = useSelector(selectItems);
  const total: number = useSelector(selectTotal);
  const { data: session } = useSession();

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      // Call the backend to create a checkout session
      const checkoutSession = await axios.post("/api/create-checkout-session", {
        items,
        email: session?.user?.email,
      });

      // Redirect the user/customer to Stripe Checkout
      const result = await stripe?.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (result?.error) alert(result.error.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            alt="Advert"
            width={1200}
            height={250}
            style={{ objectFit: "contain" }}
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length ? "Your Shopping Basket" : "Your Basket is Empty"}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct product={item} key={i} />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):
                <span className="font-bold"> {total}$</span>
              </h2>
              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
                role="link"
                onClick={handleCheckout}
              >
                {!session ? "Sign in to check out" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
