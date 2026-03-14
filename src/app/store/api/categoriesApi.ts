import { GetCategoriesResponse } from "@/app/types/categories";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithAuth";

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getCategories: builder.query<GetCategoriesResponse, void>({
            query: () => ({
                url: '/category',
                method: "GET"
            })
        })
    })
})

export const { useGetCategoriesQuery } = categoriesApi;