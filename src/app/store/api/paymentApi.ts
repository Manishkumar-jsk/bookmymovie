import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithAuth";
import { CreateOrderPayload, CreateOrderResponse, VerifyOrderPayload, VerifyOrderResponse } from "@/app/types/booking";

export const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        createOrder: builder.mutation<CreateOrderResponse, CreateOrderPayload>({
            query: (body) => ({
                url: '/payments/create-order',
                method: "POST",
                body
            })
        }),
        verifyOrder: builder.mutation<VerifyOrderResponse, VerifyOrderPayload>({
            query: (body) => ({
                url: '/payments/verify',
                method: "POST",
                body
            })
        }
        )
    })
})

export const { useCreateOrderMutation, useVerifyOrderMutation } = paymentApi;