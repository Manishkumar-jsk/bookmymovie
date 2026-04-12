import React from "react";

//components
import Booking from "@/app/components/booking/Booking";

export default function SeatSelectionPage() {
  return (
    <main
      className="max-w-4xl mx-auto px-4 py-6"
      style={{ height: "calc(100vh - 190px)" }}
    >
      <h1 className="text-3xl font-bold mb-6">Select Tickets</h1>
      <Booking />
    </main>
  );
}
