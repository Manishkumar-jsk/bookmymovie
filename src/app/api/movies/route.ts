import { connectDB } from "@/lib/db";
import Movies from "@/models/Movies";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
  await connectDB();

  const movies = await Movies.find();

  return Response.json(movies);
}

export async function POST(req:NextRequest){
    try {
        const {title,description,duration,genre,language,releaseDate,rating,posterUrl,status,totalBookings} = await req.json();

        // const saveToDB = await saveMovie(title,description,duration,genre,language,releaseDate,rating,posterUrl,status,totalBookings);
        // return NextResponse.json({message:"created",data:saveToDB},{status:201})
    } catch (error) {
        return NextResponse.json({message:"failed to fetch the data"},{status:500})
    }
}
