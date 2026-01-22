"use client";

import { useState } from "react";
import Link from "next/link";

type Seat = {
  id: string;
  row: string;
  number: number;
  type: "regular" | "premium" | "booked";
  price: number;
};

const rows = ["A", "B", "C", "D", "E"];
const cols = 8;

const seats: Seat[] = rows.flatMap((row) =>
  Array.from({ length: cols }, (_, i) => {
    const booked = Math.random() < 0.2;
    const premium = !booked && Math.random() < 0.3;
    return {
      id: `${row}${i + 1}`,
      row,
      number: i + 1,
      type: booked ? "booked" : premium ? "premium" : "regular",
      price: booked ? 0 : premium ? 300 : 200,
    };
  })
);

export default function SeatSelectionPage() {
  const [selected, setSelected] = useState<Seat[]>([]);

  const toggleSeat = (seat: Seat) => {
    if (seat.type === "booked") return;
    setSelected((prev) =>
      prev.find((s) => s.id === seat.id)
        ? prev.filter((s) => s.id !== seat.id)
        : [...prev, seat]
    );
  };

  const totalPrice = selected.reduce((acc, s) => acc + s.price, 0);

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-gray-900">
      <section className="mb-6">
        <h1 className="text-2xl font-bold">Animal</h1>
        <p className="text-gray-600">PVR Cinemas • 7:00 PM • 2h 50m</p>
      </section>
      <section className="flex gap-4 mb-4">
        <div className="flex items-center gap-1">
          <div className="h-5 w-5 bg-gray-200 border rounded-sm" />{" "}
          Available
        </div>
        <div className="flex items-center gap-1">
          <div className="h-5 w-5 bg-green-500 border rounded-sm" /> Selected
        </div>
        <div className="flex items-center gap-1">
          <div className="h-5 w-5 bg-red-500 border rounded-sm" /> Booked
        </div>
        <div className="flex items-center gap-1">
          <div className="h-5 w-5 bg-yellow-300 border rounded-sm" /> Premium
        </div>
      </section>
      <div className="mb-4 flex justify-center">
        <div className="h-3 w-2/3 rounded bg-gray-300 text-center text-xs font-semibold">
          SCREEN THIS WAY
        </div>
      </div>
      <div className="grid grid-cols-8 gap-2 mb-6">
        {seats.map((seat) => {
          const isSelected = selected.find((s) => s.id === seat.id);
          const bgColor =
            seat.type === "booked"
              ? "bg-red-500 cursor-not-allowed"
              : isSelected
              ? "bg-green-500"
              : seat.type === "premium"
              ? "bg-yellow-300"
              : "bg-gray-200";

          return (
            <button
              key={seat.id}
              onClick={() => toggleSeat(seat)}
              className={`h-10 rounded text-xs font-semibold ${bgColor}`}
            >
              {seat.id}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center mb-6">
        <p>
          Selected ({selected.length}):{" "}
          {selected.map((s) => s.id).join(", ") || "None"}
        </p>
        <p className="font-semibold">Total: ₹{totalPrice}</p>
      </div>

      <Link
        href="/checkout"
        className={`inline-block w-full rounded-lg px-6 py-3 font-semibold text-white text-center ${
          selected.length > 0 ? "bg-red-500" : "bg-gray-400 pointer-events-none"
        }`}
      >
        Proceed
      </Link>
    </main>
  );
}
