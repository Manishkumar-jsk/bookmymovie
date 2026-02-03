import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getNowShowingMovies: builder.query({
      query: () => "/movies/now-showing"
    }),
  }),
});

export const {
  useGetNowShowingMoviesQuery,
} = moviesApi;
