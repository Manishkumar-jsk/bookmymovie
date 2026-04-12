"use client";

import React from "react";
import Image from "next/image";

//components
import { useGetBookingsQuery } from "@/app/store/api/bookingApi";

const BookingCard = () => {
  const { data: bookingData } = useGetBookingsQuery();
  return (
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
            <p className="text-sm text-gray-600">{booking?.event?.location}</p>
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
  );
};

export default BookingCard;
