import Image from "next/image";
import Link from "next/link";

export default function Section({
  title,
  movies,
  showRating,
}: {
  title: string;
  movies: {
    id: string;
    poster: string;
    title: string;
    rating?: number;
    release?: string;
  }[];
  showRating?: boolean;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl font-semibold text-black">{title}</h2>

      <Link className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" href={'/movies/123'}>
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="rounded-xl bg-white p-3 shadow-sm transition hover:scale-105 hover:shadow-md"
          >
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-3">
              <h3 className="text-sm font-semibold text-black">
                {movie.title}
              </h3>

              {showRating ? (
                <p className="text-xs text-green-600">
                  ⭐ {movie.rating}
                </p>
              ) : (
                <p className="text-xs text-gray-500">{movie.release}</p>
              )}
            </div>
          </div>
        ))}
      </Link>
    </section>
  );
}
