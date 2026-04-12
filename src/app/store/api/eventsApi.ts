import { Event, EventPayload, GetEventsByIdResponse, GetEventsResponse, UpdateEventPayload } from "@/app/types/events";
import { formatDateTime } from "@/app/utils/date";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithAuth";
import { EventsLocationResponse } from "@/app/types/user";

export const eventsApi = createApi({
    reducerPath: "eventsApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Event'],
    endpoints: (builder) => ({
        getEvents: builder.query<Event[], {location?:string}>({
            query: ({location}) => ({
                url: '/events',
                method: "GET",
                params:{location}
            }),
            providesTags: ['Event'],
            transformResponse: (response: GetEventsResponse) =>
                response?.data?.map((event) => {
                    const { date, time } = formatDateTime(event.date);

                    return { ...event, date, time };
                })
        }),
        getEventById: builder.query<Event, { id: string }>({
            query: ({ id }) => ({
                url: `/events/${id}`,
                method: "GET"
            }),
            transformResponse: (response: GetEventsByIdResponse) => {
                const { date, time } = formatDateTime(response?.data?.date);

                return { ...response.data, date, time };
            }
        }),
        addEvent: builder.mutation<{ success: boolean, message: string }, FormData | EventPayload>({
            query: (body) => ({
                url: '/events',
                method: "POST",
                body
            }),
            invalidatesTags: ['Event']
        }),
        updateEvent: builder.mutation<{ success: boolean, message: string }, FormData | UpdateEventPayload>({
            query: (body) => ({
                url: '/events',
                method: "PUT",
                body
            }),
            invalidatesTags: ['Event']
        }),
        deleteEvent:builder.mutation({
            query:(id) => ({
                url:`/events/${id}`,
                method:"DELETE"
            }),
            invalidatesTags: ['Event']
        }),
        getEventsLocation:builder.query<EventsLocationResponse,void>({
            query:() => ({
                url:'/events/events-location',
                method:"GET"
            }),
            providesTags:['Event']
        })
    })
})

export const { useGetEventsQuery, useGetEventByIdQuery, useAddEventMutation, useUpdateEventMutation,useDeleteEventMutation,useGetEventsLocationQuery} = eventsApi;