'use client'

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

//slices
import { useGetEventByIdQuery } from "@/app/store/api/eventsApi";
import { setBooking } from "@/app/store/slices/bookingSlice";

//hooks
import { useAppDispatch } from "@/app/store/hooks";

const Booking = () => {
  //states
  const [selected, setSelected] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  const { eventId } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  //slices
  const { data: eventsData } = useGetEventByIdQuery({ id: String(eventId) });
  const { ticketTypes } = eventsData || {};

  const selectedTicket = ticketTypes?.find((t) => t.type === selected);
  const total = selectedTicket ? selectedTicket.price * qty : 0;

  const handleCheckout = () => {
    dispatch(
      setBooking({
        eventId: String(eventId),
        type: String(
          ticketTypes?.find((t) => t.type === selectedTicket?.type)?.type,
        ),
        price: Number(selectedTicket?.price),
        quantity: Number(qty),
        totalAmount: total,
      }),
    );
    router.push("/checkout");
  };
  return (
    <div>
      <div className="space-y-4">
        {ticketTypes?.map((ticket) => (
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

          <button
            type="button"
            onClick={handleCheckout}
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Booking;
