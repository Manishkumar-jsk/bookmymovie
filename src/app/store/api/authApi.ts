import { GetUserResponse } from "@/app/types/user";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithAuth";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["User"],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (body) => ({
                url: '/auth/register',
                method: "POST",
                body
            })
        }),
        loginUser: builder.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: "POST",
                body
            }),
            invalidatesTags: ['User']
        }),
        logoutUser: builder.mutation<{ success: boolean, message: string }, void>({
            query: () => ({
                url: '/auth/logout',
                method: "POST"
            }),
            invalidatesTags: ['User']
        }),
        getUser: builder.query<GetUserResponse, void>({
            query: () => ({
                url: '/user/me',
                method: "GET"
            }),
            providesTags: ['User']
        })
    })
})

export const { useRegisterUserMutation, useLoginUserMutation, useGetUserQuery, useLogoutUserMutation } = authApi;