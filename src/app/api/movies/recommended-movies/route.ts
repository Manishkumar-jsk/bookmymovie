import { connectDB } from "@/lib/db";
import Movies from "@/models/Movies";

export async function GET() {
    try {
        await connectDB();
        const movies = await Movies.find();
        return Response.json(movies, { status: 200 });
    } catch (error) {
        return Response.json(
            { message: "Failed to fetch movies" }, 
            { status: 500 }
        )
    }
}