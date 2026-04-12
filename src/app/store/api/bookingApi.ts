import { BookingResponse, GetBookingResponse } from "@/app/types/booking";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithAuth";

export const bookingApi = createApi({
    reducerPath: "bookingApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        bookEvent: builder.mutation<{ success: boolean, message: string }, { eventId: string, ticketTypeId: string, quantity: number }>({
            query: (body) => ({
                url: '/booking',
                method: "POST",
                body
            })
        }),
        getBookings: builder.query<GetBookingResponse, void>({
            query: () => ({
                url: '/booking',
                method: "GET"
            })
        }
        ),
        getBookingStatus: builder.query<BookingResponse, { id: string }>({
            query: ({ id }) => ({
                url: `/booking/${id}`,
                method: "GET"
            })
        })
    })
})

export const { useBookEventMutation, useGetBookingsQuery, useGetBookingStatusQuery } = bookingApi;