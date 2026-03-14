"use client";

import React from "react";
import Image from "next/image";
import { useGetBookingsQuery } from "../store/api/bookingApi";

export default function MyBookingsPage() {
  const { data: bookingData } = useGetBookingsQuery();
  return (
    <main
      className="max-w-6xl mx-auto px-4 py-6"
      style={{ height: "calc(100vh - 190px)" }}
    >
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {bookingData?.bookings?.map((booking) => (
          <div
            key={booking?.event?._id}
            className="bg-white rounded-xl shadow overflow-hidden flex"
          >
            <div className="relative w-40">
              <Image
                src={booking?.event?.image}
                alt={booking?.event?.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex-1 space-y-1">
              <h3 className="font-semibold text-lg">{booking?.event?.title}</h3>
              <p className="text-sm text-gray-600">
                {booking?.event?.location}
              </p>
              <p className="text-sm text-gray-500">{booking?.event?.date}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  "Upcoming" === "Upcoming"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                Upcoming
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
