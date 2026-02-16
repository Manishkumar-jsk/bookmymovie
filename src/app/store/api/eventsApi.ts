import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventsApi = createApi({
    reducerPath:"eventsApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5000/api/events",
        credentials:"include"
    }),
    endpoints:(builder) => ({
        getEvents:builder.query({
            query:() => ({
                url:'/',
                method:"GET"
            })
        })
    })
})

export const {useGetEventsQuery} = eventsApi;