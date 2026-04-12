import React from "react";

//components
import Checkout from "../components/checkout/Checkout";

export default function CheckoutPage() {
  return (
    <main
      className="max-w-5xl mx-auto px-4 py-6"
      style={{ height: "calc(100vh - 190px)" }}
    >
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <Checkout />
    </main>
  );
}
