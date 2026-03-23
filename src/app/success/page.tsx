"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatDateTime } from "../utils/date";

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const location = searchParams.get("location");
  const date = searchParams.get("date");
  const bookingId = searchParams.get("bookingId");

  const { date: formattedDate, time } = formatDateTime(String(date));

  return (
    <main
      className="max-w-3xl mx-auto px-4 py-10 text-center"
      style={{ height: "calc(100vh - 190px)" }}
    >
      <div className="bg-white shadow rounded-2xl p-8 space-y-4">
        <h1 className="text-3xl font-bold text-green-600">
          Booking Confirmed 🎉
        </h1>
        <p className="text-gray-600">
          Your tickets have been successfully booked.
        </p>

        <div className="bg-gray-100 rounded-xl p-4 text-left space-y-2">
          <p>
            <b>Event:</b> {title}
          </p>
          <p>
            <b>Date:</b> {formattedDate}
          </p>
          <p>
            <b>Location:</b> {location}
          </p>
          <p>
            <b>Booking ID:</b> {bookingId}
          </p>
        </div>

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
