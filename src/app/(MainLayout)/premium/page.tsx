"use client";

import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";

const Membership = () => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_PAYMENT_KEY as string
  );

  return (
    <div>
      <div>
        <h1 className="mt-20 text-center text-4xl font-bold uppercase">
          Payment
        </h1>
        <p className="text-xl font-bold my-5 text-center">Price: $10</p>
        <div></div>
        <div className="mt-12 max-w-sm mx-auto">
          <Elements stripe={stripePromise}>
            <CheckoutForm price={10} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Membership;
