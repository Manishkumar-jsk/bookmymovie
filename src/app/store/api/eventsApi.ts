import { Event, GetEventsByIdResponse, GetEventsResponse } from "@/app/types/events";
import { formatDateTime } from "@/app/utils/date";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventsApi = createApi({
    reducerPath: "eventsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/events"
    }),
    endpoints: (builder) => ({
        getEvents: builder.query<Event[], void>({
            query: () => ({
                url: '',
                method: "GET"
            }),
            transformResponse: (response: GetEventsResponse) =>
                response?.data?.map((event) => {
                    const { date, time } = formatDateTime(event.date);

                    return { ...event, date, time };
                })
        }),
        getEventById: builder.query<Event, { id: string }>({
            query: ({ id }) => ({
                url: `/${id}`,
                method: "GET"
            }),
            transformResponse: (response: GetEventsByIdResponse) => {
                const { date, time } = formatDateTime(response?.data?.date);

                return { ...response.data, date, time };
            }
        })
    })
})

export const { useGetEventsQuery, useGetEventByIdQuery } = eventsApi;