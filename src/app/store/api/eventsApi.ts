import { Event, EventImportStatusResponse, EventPayload, GetEventsByIdResponse, GetEventsResponse, UpdateEventPayload } from "@/app/types/events";
import { formatDateTime } from "@/app/utils/date";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithAuth";
import { EventsLocationResponse } from "@/app/types/user";

export const eventsApi = createApi({
    reducerPath: "eventsApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Event'],
    endpoints: (builder) => ({
        getEvents: builder.query<Event[], { location?: string }>({
            query: ({ location } = {}) => ({
                url: '/events',
                method: "GET",
                ...(location ? { params: { location } } : {})
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
        deleteEvent: builder.mutation({
            query: (id) => ({
                url: `/events/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Event']
        }),
        getEventsLocation: builder.query<EventsLocationResponse, void>({
            query: () => ({
                url: '/events/events-location',
                method: "GET"
            }),
            providesTags: ['Event']
        }),
        importEvents: builder.mutation({
            query: (body) => ({
                url: '/events/import',
                method: "POST",
                body
            })
        }),
        getImportStatus: builder.query<EventImportStatusResponse,{importId:string}>({
            query: (importId) => ({
                url: `/events/import/${importId}/status`,
                method: "GET"
            })
        }),
        getImportLogs: builder.query({
            query: ({type}) => ({
                url: `/events/get-import-logs/${type}`,
                method: "GET"
            })
        }),
        downloadEventsData:builder.query({
            query:() => ({
                url:`/events/download-events-data`,
                method:"GET",
                responseHandler: async (response) => {
                    if (!response.ok) {
                        const error = await response.json().catch(() => ({}));

                        throw new Error(
                            error.message || `Request failed: ${response.status}`
                        );
                    }

                    return response.blob();
                },

            })
        })
    })
})

export const { useGetEventsQuery, useGetEventByIdQuery, useAddEventMutation, useUpdateEventMutation, useDeleteEventMutation, useGetEventsLocationQuery, useImportEventsMutation, useGetImportStatusQuery, useLazyGetImportStatusQuery, useGetImportLogsQuery,useLazyGetImportLogsQuery,useLazyDownloadEventsDataQuery } = eventsApi;