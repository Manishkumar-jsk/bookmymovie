"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useAppSelector } from "../store/hooks";
import { useBookEventMutation } from "../store/api/bookingApi";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const booking = useAppSelector((state) => state.booking);
  const [bookEvent] = useBookEventMutation();
  const router = useRouter();
  const data = useAuth();

  const {
    values,
    setFieldValue,
    handleSubmit,
    resetForm,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string().required("Phone is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        await bookEvent({ eventId, ticketTypeId: type, quantity }).unwrap();
        resetForm();
        toast.success("Ticket booked successfully");
        router.push("/success");
      } catch (error) {
        console.error("Booking failed:", error);
        toast.error("Failed to book ticket. Please try again.");
      }
    },
  });

  const { eventId, price, type, quantity } = booking;

  const subtotal = price * quantity;

  useEffect(() => {
    setFieldValue("name", data?.user?.name);
    setFieldValue("email", data?.user?.email);
  }, [data]);

  return (
    <main
      className="max-w-5xl mx-auto px-4 py-6"
      style={{ height: "calc(100vh - 190px)" }}
    >
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
                value={values.name}
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("name", e.target.value)}
                placeholder="Full Name"
                className="border rounded-lg px-3 py-2"
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
              <input
                type="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("email", e.target.value)}
                placeholder="Email"
                className="border rounded-lg px-3 py-2"
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
              <input
                type="tel"
                placeholder="Mobile Number"
                value={values.phone}
                onBlur={handleBlur}
                onChange={(e) => setFieldValue("phone", e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
              {touched.phone && errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </section>

          {/* Payment Options */}
          {/* <section className="bg-white p-5 rounded-xl shadow">
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
          </section> */}
        </div>

        {/* Right - Order Summary */}
        <div className="bg-white p-5 rounded-xl shadow h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Ticket Price</span>
              <span>₹{price}</span>
            </div>
            <div className="flex justify-between">
              <span>Quantity</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            {/* <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- ₹{discount}</span>
            </div> */}
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
          </div>

          {/* Coupon */}
          {/* <div className="mt-4 flex gap-2">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon"
              className="border rounded-lg px-3 py-2 flex-1"
            />
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">
              Apply
            </button>
          </div> */}

          <button
            type="button"
            onClick={() => handleSubmit()}
            className="block mt-6 bg-red-600 text-white text-center p-3 rounded-lg font-semibold"
          >
            Pay Now
          </button>
        </div>
      </div>
    </main>
  );
}
