import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithAuth";
import { NotificationResponse } from "@/app/types/notificationType";

export const notificationsApi = createApi({
    reducerPath: "notificationsApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getNotifications: builder.query<NotificationResponse, void>({
            query: () => ({
                url: '/notifications',
                method: "GET"
            })
        }
        ),
        readNotification:builder.mutation({
            query:(body) => ({
                url:'/notifications/read-notification',
                method:"POST",
                body
            })
        })
    })
})

export const { useLazyGetNotificationsQuery,useReadNotificationMutation } = notificationsApi;