"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetEventByIdQuery } from "@/app/store/api/eventsApi";
import { useParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlarmClock,
  faCalendar,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";

export default function EventDetailPage() {
  const { eventId } = useParams();
  const { data: eventsData } = useGetEventByIdQuery({ id: String(eventId) });

  const { image, title, description, date, time, ticketTypes, location } =
    eventsData || {};

  return (
    <main
      className="max-w-6xl mx-auto px-4 py-6"
      style={{ height: "calc(100vh - 190px)" }}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Event Image */}
        <div className="relative h-[320px] rounded-xl overflow-hidden">
          <Image src={image || ""} alt="Event" fill className="object-cover" />
        </div>

        {/* Event Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-600 capitalize">
            <FontAwesomeIcon icon={faMapPin} /> {location} |{" "}
            <FontAwesomeIcon icon={faCalendar} /> {date} |{" "}
            <FontAwesomeIcon icon={faAlarmClock} /> {time}
          </p>
          <p className="text-gray-700">{description}.</p>

          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold">Ticket Price:</p>
            <ul className="list-disc ml-5 text-sm">
              {ticketTypes?.map((price) => (
                <>
                  <li>
                    {price.type} – ₹{price.price}
                  </li>
                </>
              ))}
            </ul>
          </div>

          <Link
            href={`/event/${eventId}/book`}
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
