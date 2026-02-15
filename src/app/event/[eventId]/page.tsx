"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function EventDetailPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6" style={{height:"calc(100vh - 190px)"}}>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Event Image */}
        <div className="relative h-[320px] rounded-xl overflow-hidden">
          <Image
            src="https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg"
            alt="Event"
            fill
            className="object-cover"
          />
        </div>

        {/* Event Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Arijit Singh Live Concert</h1>
          <p className="text-gray-600">📍 Mumbai | 🗓 25 Feb 2026 | ⏰ 7:00 PM</p>
          <p className="text-gray-700">
            Enjoy an unforgettable evening with Arijit Singh performing live.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">Ticket Price:</p>
            <ul className="list-disc ml-5 text-sm">
              <li>Silver – ₹999</li>
              <li>Gold – ₹1999</li>
              <li>VIP – ₹2999</li>
            </ul>
          </div>

          <Link
            href="/event/1/book"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Book Tickets
          </Link>
        </div>
      </div>

      {/* Description */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold mb-3">About Event</h2>
        <p className="text-gray-700">
          This concert will feature Arijit Singh performing his greatest hits.
          Join thousands of fans for a magical musical experience.
        </p>
      </section>
    </main>
  );
}