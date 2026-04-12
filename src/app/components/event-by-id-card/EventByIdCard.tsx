"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

//slices
import { useGetEventByIdQuery } from "@/app/store/api/eventsApi";

//third-party
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlarmClock,
  faCalendar,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";

const EventByIdCard = () => {
  const { eventId } = useParams();

  //slices
  const { data: eventsData } = useGetEventByIdQuery({ id: String(eventId) });

  const { image, title, description, date, time, ticketTypes, location } =
    eventsData || {};
  return (
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
  );
};

export default EventByIdCard;
