import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Music", image: "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg" },
  { name: "Tech", image: "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg" },
  { name: "Comedy", image: "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg" },
  { name: "Sports", image: "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg" },
];

const events = [
  {
    id: "1",
    title: "Arijit Singh Live Concert",
    city: "Mumbai",
    date: "25 Feb 2026",
    image: "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
  {
    id: "2",
    title: "React India Conference",
    city: "Bangalore",
    date: "10 March 2026",
    image: "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
  {
    id: "3",
    title: "Standup Comedy Night",
    city: "Delhi",
    date: "5 March 2026",
    image: "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
];

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-6 space-y-12">
      {/* Hero Section */}
      <section className="relative h-[320px] rounded-2xl overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg"
          alt="Event Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl font-bold">Discover & Book Amazing Events</h1>
            <p className="text-lg">Concerts • Tech • Comedy • Sports</p>
            <div className="flex gap-2 justify-center">
              <input
                type="text"
                placeholder="Search events, city..."
                className="px-4 py-2 rounded-lg text-black w-[260px]"
              />
              <button className="bg-red-600 px-5 py-2 rounded-lg font-semibold">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Browse by Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="bg-white shadow rounded-xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                width={80}
                height={80}
              />
              <p className="font-semibold">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Events */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Trending Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              href={`/event/${event.id}`}
              key={event.id}
              className="bg-white rounded-xl shadow overflow-hidden hover:scale-[1.02] transition"
            >
              <div className="relative h-48">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.city}</p>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
