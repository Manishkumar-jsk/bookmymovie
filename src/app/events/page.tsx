import React from "react";

//components
import EventCard from "../components/event-card/EventCard";

export default function EventsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">All Events</h1>
      <EventCard />
    </main>
  );
}
