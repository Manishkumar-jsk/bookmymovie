import Image from "next/image";

const bookings = [
  {
    id: 1,
    title: "Animal",
    poster:
      "https://m.media-amazon.com/images/M/MV5BN2FhYjQ0YjUtZDA2My00MTk5LTk4NDQtZGY0Y2Y2ODk0OWYxXkEyXkFqcGc@._V1_.jpg",
    language: "Hindi",
    duration: "2h 50m",
    theatre: "PVR Cinemas - Phoenix Mall",
    time: "7:00 PM, 22 Jan 2026",
    seats: ["A1", "A2"],
    total: 500,
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Avengers",
    poster:
      "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg",
    language: "English",
    duration: "3h 2m",
    theatre: "INOX - City Centre",
    time: "5:00 PM, 20 Jan 2026",
    seats: ["B4", "B5", "B6"],
    total: 900,
    status: "Completed",
  },
];

export default function BookingsPage() {
  return (
    <main className="min-h-screen bg-white px-4 sm:px-6 py-6 text-gray-900">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex flex-col sm:flex-row bg-gray-100 rounded-lg shadow p-4 gap-4 items-center"
          >
            <Image
              src={booking.poster}
              alt={booking.title}
              width={100}
              height={150}
              className="rounded-lg object-cover"
            />

            <div className="flex-1">
              <h2 className="text-lg font-semibold">{booking.title}</h2>
              <p className="text-gray-600 text-sm">
                {booking.language} • {booking.duration}
              </p>
              <p className="text-gray-600 text-sm mt-1">{booking.theatre}</p>
              <p className="text-gray-600 text-sm mt-1">{booking.time}</p>
              <p className="text-gray-600 text-sm mt-1">
                Seats: {booking.seats.join(", ")}
              </p>
              <p className="font-semibold mt-1">₹{booking.total}</p>
            </div>

            <div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  booking.status === "Upcoming"
                    ? "bg-yellow-300 text-gray-900"
                    : booking.status === "Completed"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
