import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithAuth";
import { AddUserPayload, AddUserResponse, GetUsersResponse, UpdateUserPayload } from "@/app/types/user";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsers: builder.query<GetUsersResponse,void>({
            query: () => ({
                url: '/user/',
                method: "GET"
            }),
            providesTags: ['User']
        }),
        addUser: builder.mutation<AddUserResponse, AddUserPayload>({
            query: (body) => ({
                url: '/user/add',
                method: "POST",
                body
            }),
            invalidatesTags: ['User']
        }),
        updateUser: builder.mutation<AddUserResponse, UpdateUserPayload>({
            query: (body) => ({
                url: '/user/update',
                method: "PUT",
                body
            }),
            invalidatesTags: ['User']
        }),
        deleteUser: builder.mutation<AddUserResponse, string>({
            query: (id) => ({
                url: `/user/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['User']
        }),
    })
})

export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation } = userApi;