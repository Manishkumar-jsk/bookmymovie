'use client'

import Section from "./components/section/Section";
import { useGetNowShowingMoviesQuery } from "@/store/api/moviesApi";

export default function HomePage() {
  const {data:nowShowing} = useGetNowShowingMoviesQuery({});

  return (
    <main className="min-h-screen text-white px-6 py-8">
      <Section title="Now Showing" movies={nowShowing} showRating />

      <Section title="Upcoming Movies" movies={nowShowing} />

      <Section title="Popular Movies" movies={nowShowing} showRating />
    </main>
  );
}
