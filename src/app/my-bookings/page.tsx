import React from "react";
import BookingCard from "../components/booking-card/BookingCard";

export default function MyBookingsPage() {
  return (
    <main
      className="max-w-6xl mx-auto px-4 py-6"
      style={{ height: "calc(100vh - 190px)" }}
    >
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <BookingCard />
    </main>
  );
}
