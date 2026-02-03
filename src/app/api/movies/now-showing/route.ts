import { connectDB } from "@/lib/db";
import { getReleasedMovies } from "@/services/movies.service";

export async function GET() {
  try {
    await connectDB();

    const movies = await getReleasedMovies();

    return Response.json(movies);
  } catch (error) {
    console.log(error, "err")
    return Response.json(
      { message: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}
