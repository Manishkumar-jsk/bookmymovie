"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const [coupon, setCoupon] = useState("");

  const ticketPrice = 1999;
  const quantity = 2;
  const subtotal = ticketPrice * quantity;
  const discount = coupon === "EVENT10" ? 0.1 * subtotal : 0;
  const total = subtotal - discount;

  return (
    <main className="max-w-5xl mx-auto px-4 py-6" style={{height:"calc(100vh - 190px)"}}>
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left - User Details & Payment */}
        <div className="md:col-span-2 space-y-6">
          {/* User Details */}
          <section className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border rounded-lg px-3 py-2"
              />
              <input
                type="email"
                placeholder="Email"
                className="border rounded-lg px-3 py-2"
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="border rounded-lg px-3 py-2"
              />
            </div>
          </section>

          {/* Payment Options */}
          <section className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" defaultChecked /> UPI
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" /> Credit / Debit Card
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" /> Net Banking
              </label>
            </div>
          </section>
        </div>

        {/* Right - Order Summary */}
        <div className="bg-white p-5 rounded-xl shadow h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Ticket Price</span>
              <span>₹{ticketPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Quantity</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- ₹{discount}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* Coupon */}
          <div className="mt-4 flex gap-2">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon"
              className="border rounded-lg px-3 py-2 flex-1"
            />
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">
              Apply
            </button>
          </div>

          <Link
            href="/success"
            className="block mt-6 bg-red-600 text-white text-center py-3 rounded-lg font-semibold"
          >
            Pay Now
          </Link>
        </div>
      </div>
    </main>
  );
}
