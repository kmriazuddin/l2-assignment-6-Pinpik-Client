"use client";

import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import Footer from "@/components/SharedComponents/Footer/Footer";

const Membership = () => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_PAYMENT_KEY as string
  );

  return (
    <div className="bg-white pt-24 min-h-[calc(100vh-68px)]">
      <div className="h-screen">
        <h1 className="pt-20 text-center text-4xl font-bold uppercase">
          Stipe Payment
        </h1>
        <p className="text-xl font-bold my-5 text-center">Price: $30</p>
        <div></div>
        <div className="mt-12 max-w-sm mx-auto">
          <Elements stripe={stripePromise}>
            <CheckoutForm price={10} />
          </Elements>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Membership;
