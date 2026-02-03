import { connectDB } from "@/lib/db";
import { getUpcomingMovies } from "@/services/movies.service";

export async function GET() {
    try {
        await connectDB();
        const movies = await getUpcomingMovies();
        return Response.json(movies, { status: 200 });
    } catch (error) {
        return Response.json(
            { message: "Failed to fetch movies" }, 
            { status: 500 }
        )
    }
}