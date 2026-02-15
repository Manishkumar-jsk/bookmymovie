"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const bookings = [
  {
    id: "1",
    title: "Arijit Singh Live Concert",
    date: "25 Feb 2026",
    city: "Mumbai",
    image: "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
    status: "Upcoming",
  },
  {
    id: "2",
    title: "React India Conference",
    date: "10 March 2026",
    city: "Bangalore",
    image: "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
    status: "Completed",
  },
];

export default function MyBookingsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6" style={{height:"calc(100vh - 190px)"}}>
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-xl shadow overflow-hidden flex"
          >
            <div className="relative w-40">
              <Image
                src={booking.image}
                alt={booking.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 flex-1 space-y-1">
              <h3 className="font-semibold text-lg">{booking.title}</h3>
              <p className="text-sm text-gray-600">{booking.city}</p>
              <p className="text-sm text-gray-500">{booking.date}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  booking.status === "Upcoming"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}