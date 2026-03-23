"use client";

import React, { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  useCreateOrderMutation,
  useVerifyOrderMutation,
} from "../store/api/paymentApi";

export default function CheckoutPage() {
  const booking = useAppSelector((state) => state.booking);
  const [createOrder] = useCreateOrderMutation();
  const [verifyOrder] = useVerifyOrderMutation();
  const router = useRouter();
  const data = useAuth();

  const loadScript = () =>
    new Promise((resolve) => {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });

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
      const ok = await loadScript();
      if (!ok) {
        toast.error("Razorpay hasn't been loaded");
        return;
      }
      try {
        const orderData = await createOrder({
          eventId,
          ticketType: type,
          quantity,
        }).unwrap();

        const { orderId, amount, currency, bookingId, keyId } = orderData?.data;

        const options = {
          key: keyId,
          amount,
          currency,
          name: values.name,
          description: `Booking for ${booking?.type} with ${amount}`,
          order_id: orderId,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          handler: async (response: any) => {
            try {
              const data = await verifyOrder({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                bookingId,
              });
              const bookingData = data?.data?.data;
              toast.success("Booking confirmed");
              resetForm();
              router.replace(
                `/success?title=${bookingData?.event?.title}&location=${bookingData?.event?.location}&date=${bookingData?.event?.date}&bookingId=${bookingData?.bookingId}`,
              );
            } catch (error) {
              toast.error("Not verified contact customer care");
            }
          },
          theme: { color: "#6366f1" },
          // modal:  { ondismiss: () => setLoading(false) },
        };
        new window.Razorpay(options).open();
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
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
          </div>
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
