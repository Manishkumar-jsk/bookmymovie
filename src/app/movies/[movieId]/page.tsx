import Image from "next/image";
import Link from "next/link";

export default function MovieDetailPage() {
  const dates = ["Today", "Tomorrow", "Fri", "Sat"];

  const theatres = [
    {
      name: "PVR Cinemas",
      location: "Phoenix Mall",
      shows: [
        { id: "s1", time: "10:00 AM", price: 150 },
        { id: "s2", time: "01:30 PM", price: 200 },
        { id: "s3", time: "07:00 PM", price: 250 },
      ],
    },
    {
      name: "INOX",
      location: "City Centre",
      shows: [
        { id: "s4", time: "11:15 AM", price: 180 },
        { id: "s5", time: "09:00 PM", price: 280 },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="flex gap-6 px-6 py-8">
        <Image
          src="https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg"
          alt="Animal"
          width={220}
          height={330}
          className="rounded-xl"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">Animal</h1>
          <p className="text-gray-600 mb-1">Action • Drama • Hindi</p>
          <p className="mb-1">⭐ 8.5 | 2h 50m</p>
          <p className="mb-3 text-sm text-gray-500">UA • 2023</p>

          <button className="mt-3 rounded-lg bg-red-500 px-6 py-2 font-semibold text-white">
            Book Tickets
          </button>
        </div>
      </section>

      <section className="px-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">About the movie</h2>
        <p className="max-w-4xl text-gray-700">
          A gritty action drama that explores complex family
          relationships, power, and redemption in a violent
          underworld.
        </p>
      </section>
      <section className="px-6 mb-8">
        <h2 className="text-xl font-semibold mb-3">Cast & Crew</h2>

        <div className="flex gap-4 overflow-x-auto">
          {[
            { name: "Ranbir Kapoor", role: "Actor" },
            { name: "Anil Kapoor", role: "Actor" },
            { name: "Rashmika Mandanna", role: "Actor" },
            { name: "Sandeep Reddy Vanga", role: "Director" },
          ].map((person) => (
            <div
              key={person.name}
              className="min-w-[120px] rounded-lg bg-gray-100 p-3 text-center"
            >
              <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-gray-300" />
              <p className="text-sm font-semibold text-gray-900">
                {person.name}
              </p>
              <p className="text-xs text-gray-600">{person.role}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="px-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Select Date</h2>

        <div className="flex gap-3">
          {dates.map((date) => (
            <button
              key={date}
              className="rounded-full bg-gray-200 px-4 py-2 text-sm hover:bg-red-500 hover:text-white"
            >
              {date}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Theatres & Show Timings
        </h2>

        {theatres.map((theatre) => (
          <div
            key={theatre.name}
            className="mb-6 rounded-lg bg-gray-100 p-4"
          >
            <div className="mb-3">
              <h3 className="font-semibold text-gray-900">
                {theatre.name}
              </h3>
              <p className="text-sm text-gray-600">
                {theatre.location}
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              {theatre.shows.map((show) => (
                <Link
                  key={show.id}
                  href={`/shows/${show.id}/seats`}
                  className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-red-500 hover:text-white"
                >
                  <p className="text-sm">{show.time}</p>
                  <p className="text-xs">₹{show.price}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="px-6 pb-10">
        <h2 className="text-xl font-semibold mb-3">
          Ratings & Reviews
        </h2>

        <div className="rounded-lg bg-gray-100 p-4">
          <p className="mb-2 text-gray-900">⭐ 8.5 / 10</p>
          <p className="text-sm text-gray-600">
            “Powerful performances and intense storytelling.”
          </p>
        </div>
      </section>
    </main>
  );
}
