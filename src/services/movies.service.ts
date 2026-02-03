import Movies from "@/models/Movies";


export const getReleasedMovies = async () => {
    const todayDate = new Date();

    return await Movies.find({
        releaseDate: { $lte: todayDate },
        status: "NOW_SHOWING"
    }).sort({ releaseDate: -1 });
};

export const getUpcomingMovies = async () => {
    const todayDate = new Date();
    return await Movies.find({
        releaseDate: {
            $gte: todayDate
        },
        status: "NOW_SHOWING"
    }).sort({ releaseDate: -1 })
}