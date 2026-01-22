import Image from "next/image";
import Link from "next/link";

export default function BookingSuccessPage() {
  const booking = {
    movie: {
      title: "Animal",
      poster:
        "https://m.media-amazon.com/images/M/MV5BN2FhYjQ0YjUtZDA2My00MTk5LTk4NDQtZGY0Y2Y2ODk0OWYxXkEyXkFqcGc@._V1_.jpg",
      language: "Hindi",
      duration: "2h 50m",
    },
    theatre: "PVR Cinemas - Phoenix Mall",
    time: "7:00 PM, 22 Jan 2026",
    seats: [
      { id: "A1", type: "Regular", price: 200 },
      { id: "A2", type: "Premium", price: 300 },
    ],
    total: 500,
    bookingId: "BKG123456789",
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 py-6 text-gray-900">
      <div className="text-green-500 text-6xl mb-4">✅</div>
      <h1 className="text-2xl font-bold mb-2 text-center text-green-600">
        Booking Confirmed!
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Your ticket has been booked successfully.
      </p>

      <div className="flex flex-col sm:flex-row bg-gray-100 rounded-lg shadow p-4 mb-6 gap-4 w-full max-w-md">
        <Image
          src={booking.movie.poster}
          alt={booking.movie.title}
          width={100}
          height={150}
          className="rounded-lg object-cover"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{booking.movie.title}</h2>
          <p className="text-gray-600 text-sm mt-1">
            {booking.movie.language} • {booking.movie.duration}
          </p>
          <p className="text-gray-600 text-sm mt-1">{booking.theatre}</p>
          <p className="text-gray-600 text-sm mt-1">{booking.time}</p>
          <p className="text-gray-600 text-sm mt-1">
            Seats: {booking.seats.map((s) => s.id).join(", ")}
          </p>
          <p className="font-semibold mt-1">Total Paid: ₹{booking.total}</p>
          <p className="text-gray-500 text-sm mt-1">
            Booking ID: {booking.bookingId}
          </p>
        </div>
      </div>

      <div className="bg-gray-200 w-40 h-40 rounded-lg flex items-center justify-center mb-6">
        <span className="text-gray-500 text-sm">QR Code</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button className="bg-red-500 text-white rounded-lg px-6 py-3 font-semibold hover:bg-red-600">
          Download Ticket
        </button>
        <Link
          href="/bookings"
          className="bg-gray-800 text-white rounded-lg px-6 py-3 font-semibold hover:bg-gray-900 text-center"
        >
          View My Bookings
        </Link>
      </div>
    </main>
  );
}
