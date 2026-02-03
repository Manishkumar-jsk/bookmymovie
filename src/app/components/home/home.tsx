import Image from "next/image";
import Section from "./components/section/Section";

const nowShowing = [
  {
    id: "1",
    title: "Animal",
    language: "Hindi",
    rating: 8.5,
    poster:
      "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
  {
    id: "2",
    title: "Dunki",
    language: "Hindi",
    rating: 8.2,
    poster:
      "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
  {
    id: "1",
    title: "Animal",
    language: "Hindi",
    rating: 8.5,
    poster:
      "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
  {
    id: "2",
    title: "Dunki",
    language: "Hindi",
    rating: 8.2,
    poster:
      "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
  {
    id: "1",
    title: "Animal",
    language: "Hindi",
    rating: 8.5,
    poster:
      "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
];

const upcomingMovies = [
  {
    id: "3",
    title: "Pushpa 2",
    language: "Telugu",
    release: "Coming Soon",
    poster:
      "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
  {
    id: "4",
    title: "Kalki 2898 AD",
    language: "Hindi / Telugu",
    release: "2026",
    poster:
      "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
  {
    id: "4",
    title: "Kalki 2898 AD",
    language: "Hindi / Telugu",
    release: "2026",
    poster:
      "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
  {
    id: "4",
    title: "Kalki 2898 AD",
    language: "Hindi / Telugu",
    release: "2026",
    poster:
      "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
  {
    id: "4",
    title: "Kalki 2898 AD",
    language: "Hindi / Telugu",
    release: "2026",
    poster:
      "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
];

const popularMovies = [
  {
    id: "5",
    title: "Salaar",
    rating: 8.7,
    poster:
      "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
  {
    id: "5",
    title: "Salaar",
    rating: 8.7,
    poster:
      "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
  {
    id: "5",
    title: "Salaar",
    rating: 8.7,
    poster:
      "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
  {
    id: "5",
    title: "Salaar",
    rating: 8.7,
    poster:
      "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
  {
    id: "5",
    title: "Salaar",
    rating: 8.7,
    poster:
      "https://images.pexels.com/photos/7886608/pexels-photo-7886608.jpeg",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen text-white px-6 py-8">
      <Section title="Now Showing" movies={nowShowing} showRating />

      <Section title="Upcoming Movies" movies={upcomingMovies} />

      <Section title="Popular Movies" movies={popularMovies} showRating />
    </main>
  );
}
