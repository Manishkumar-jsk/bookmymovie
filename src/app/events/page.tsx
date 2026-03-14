"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetEventsQuery } from "../store/api/eventsApi";

export default function EventsPage() {
  const [category, setCategory] = useState("All");
  const [city, setCity] = useState("");
  const { data: eventsData } = useGetEventsQuery();

  const filteredEvents = eventsData?.filter((event) => {
    if (category !== "All" && event?.category?.name !== category) return false;
    // if (city && !event.city.toLowerCase().includes(city.toLowerCase())) return false;
    return true;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">All Events</h1>

      {/* Filters */}
      <section className="bg-white p-4 rounded-xl shadow mb-8 flex flex-wrap gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="All">All Categories</option>
          <option value="Music">Music</option>
          <option value="Tech">Tech</option>
          <option value="Comedy">Comedy</option>
          <option value="Sports">Sports</option>
        </select>

        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
      </section>

      {/* Events Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredEvents?.map((event) => (
          <Link
            href={`/event/${event._id}`}
            key={event._id}
            className="bg-white rounded-xl shadow hover:scale-[1.02] transition overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={event?.image || ""}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.location}</p>
              <p className="text-sm text-gray-500">{event.date}</p>
              <p className="font-bold text-red-600">₹{event?.price}</p>
            </div>
          </Link>
        ))}
      </section>

      {filteredEvents?.length === 0 && (
        <p className="text-center text-gray-500 mt-12">No events found</p>
      )}
    </main>
  );
}
