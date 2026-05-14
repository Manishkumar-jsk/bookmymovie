import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithAuth";
import { GetUpcomingEventsResponse, MetricsResponse, Revenue } from "@/app/types/adminDashboardType";

export const adminDashboardApi = createApi({
    reducerPath: "adminDashboardApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getRevenue: builder.query<Revenue,void>({
            query: () => ({
                url: '/admin-dashboard/revenue',
                method: "GET"
            })
        }),
        getMetricsData:builder.query<MetricsResponse,void>({
            query:() => ({
                url:"/admin-dashboard/metrics-data",
                method:"GET"
            })
        }),
        getUpcomingEventsData:builder.query<GetUpcomingEventsResponse,void>({
            query:() => ({
                url:"/admin-dashboard/upcoming-events",
                method:"GET"
            })
        })
    })
})

export const { useGetRevenueQuery,useGetMetricsDataQuery,useGetUpcomingEventsDataQuery } = adminDashboardApi;