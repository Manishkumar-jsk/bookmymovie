import React from "react";
import Link from "next/link";

//styles
import "./success.css";

//components
import SuccessBox from "../components/success-box/SuccessBox";

export default function BookingSuccessPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-center successPage">
      <div className="bg-white shadow rounded-2xl p-8 space-y-4">
        <h1 className="text-3xl font-bold text-green-600">Booking Confirmed</h1>
        <p className="text-gray-600">
          Your tickets have been successfully booked.
        </p>
        <SuccessBox />
        <div className="flex gap-4 justify-center mt-6">
          <Link
            href="/my-bookings"
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            View My Bookings
          </Link>
          <Link href="/" className="border px-6 py-3 rounded-lg font-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
