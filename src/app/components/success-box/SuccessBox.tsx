"use client";
import React from "react";
import { formatDateTime } from "@/app/utils/date";
import { useSearchParams } from "next/navigation";

const SuccessBox = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const location = searchParams.get("location");
  const date = searchParams.get("date");
  const bookingId = searchParams.get("bookingId");

  const { date: formattedDate, time } = formatDateTime(String(date));
  return (
    <div className="bg-gray-100 rounded-xl p-4 text-left space-y-2">
      <p>
        <b>Event:</b> {title}
      </p>
      <p>
        <b>Date:</b> {formattedDate}
      </p>
      <p>
        <b>Location:</b> {location}
      </p>
      <p>
        <b>Booking ID:</b> {bookingId}
      </p>
    </div>
  );
};

export default SuccessBox;
