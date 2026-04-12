import React from "react";

//components
import EventByIdCard from "@/app/components/event-by-id-card/EventByIdCard";

export default function EventDetailPage() {
  return (
    <main
      className="max-w-6xl mx-auto px-4 py-6"
      style={{ height: "calc(100vh - 190px)" }}
    >
      <EventByIdCard />

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
