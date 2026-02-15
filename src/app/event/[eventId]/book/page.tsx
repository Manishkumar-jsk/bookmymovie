"use client";

import React, { useState } from "react";
import Link from "next/link";

const tickets = [
  { type: "Silver", price: 999 },
  { type: "Gold", price: 1999 },
  { type: "VIP", price: 2999 },
];

export default function SeatSelectionPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  const selectedTicket = tickets.find((t) => t.type === selected);
  const total = selectedTicket ? selectedTicket.price * qty : 0;

  return (
    <main className="max-w-4xl mx-auto px-4 py-6" style={{height:"calc(100vh - 190px)"}}>
      <h1 className="text-3xl font-bold mb-6">Select Tickets</h1>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.type}
            className={`border p-4 rounded-lg flex justify-between items-center cursor-pointer ${
              selected === ticket.type ? "border-red-600 bg-red-50" : ""
            }`}
            onClick={() => setSelected(ticket.type)}
          >
            <p className="font-semibold">{ticket.type}</p>
            <p className="font-bold">₹{ticket.price}</p>
          </div>
        ))}
      </div>

      {selected && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-4">
            <p>Quantity:</p>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(+e.target.value)}
              className="border rounded px-3 py-1 w-20"
            />
          </div>

          <div className="bg-gray-100 p-4 rounded-lg flex justify-between">
            <p className="font-semibold">Total Amount</p>
            <p className="font-bold text-red-600">₹{total}</p>
          </div>

          <Link
            href="/checkout"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </main>
  );
}
