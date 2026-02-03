import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const movie = {
    title: "Animal",
    poster:
      "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
    language: "Hindi",
    duration: "2h 50m",
    time: "7:00 PM",
    theatre: "PVR Cinemas - Phoenix Mall",
    seats: [
      { id: "A1", type: "Regular", price: 200 },
      { id: "A2", type: "Premium", price: 300 },
    ],
  };

  const subtotal = movie.seats.reduce((acc, s) => acc + s.price, 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  return (
    <main className="min-h-screen bg-white text-gray-900 px-4 sm:px-6 py-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <section className="flex gap-4 mb-6">
        <Image
          src={movie.poster}
          alt={movie.title}
          width={100}
          height={150}
          className="rounded-lg object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{movie.title}</h2>
          <p className="text-gray-600 text-sm">
            {movie.language} • {movie.duration}
          </p>
          <p className="text-gray-600 text-sm mt-1">{movie.theatre}</p>
          <p className="text-gray-600 text-sm mt-1">⏰ {movie.time}</p>
        </div>
      </section>

      <section className="rounded-lg bg-gray-100 p-4 mb-6">
        <h3 className="font-semibold mb-2">Selected Seats</h3>
        <ul className="mb-2">
          {movie.seats.map((seat) => (
            <li key={seat.id} className="flex justify-between text-sm">
              <span>
                {seat.id} ({seat.type})
              </span>
              <span>₹{seat.price}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-gray-300 pt-2 text-sm flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>GST (18%)</span>
          <span>₹{gst}</span>
        </div>
        <div className="border-t border-gray-300 pt-2 mt-2 font-semibold flex justify-between">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="font-semibold mb-2">Payment Method</h3>
        <div className="flex flex-col gap-2">
          <button className="rounded-lg border border-gray-300 px-4 py-2 text-left hover:bg-gray-200">
            💳 Credit / Debit Card
          </button>
          <button className="rounded-lg border border-gray-300 px-4 py-2 text-left hover:bg-gray-200">
            🏦 Net Banking
          </button>
          <button className="rounded-lg border border-gray-300 px-4 py-2 text-left hover:bg-gray-200">
            📱 UPI / Wallet
          </button>
        </div>
      </section>

      <div className="mt-auto sticky bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <span className="font-semibold">
          Total: ₹{total}
        </span>
        <Link
          href="/success"
          className="w-full sm:w-auto text-center rounded-lg bg-red-500 px-6 py-3 text-white font-semibold"
        >
          Confirm & Pay
        </Link>
      </div>
    </main>
  );
}
