import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:5000/api",
        credentials:"include"
    }),
    endpoints:(builder) => ({
        registerUser:builder.mutation({
            query:(body) => ({
                url:'/auth/register',
                method:"POST",
                body
            })
        }),
        loginUser:builder.mutation({
            query:(body) => ({
                url:'/auth/login',
                method:"POST",
                body
            })
        })
    })
})

export const {useRegisterUserMutation,useLoginUserMutation} = authApi;