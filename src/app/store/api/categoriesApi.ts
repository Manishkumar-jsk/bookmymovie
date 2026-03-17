import { addCategoryPayload, addCategoryResponse, GetCategoriesResponse, updateCategoryPayload } from "@/app/types/categories";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithAuth";

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: baseQueryWithReauth,
    tagTypes:['Category'],
    endpoints: (builder) => ({
        getCategories: builder.query<GetCategoriesResponse, void>({
            query: () => ({
                url: '/category',
                method: "GET"
            }),
            providesTags:['Category']
        }),
        addCategory: builder.mutation<addCategoryResponse, addCategoryPayload>({
            query: (body) => ({
                url: '/category',
                method: "POST",
                body
            }),
            invalidatesTags:['Category']
        }),
        updateCategory: builder.mutation<addCategoryResponse, updateCategoryPayload>({
            query: (body) => ({
                url: '/category',
                method: "PUT",
                body
            }),
            invalidatesTags:['Category']
        }),
        deleteCategory: builder.mutation<addCategoryResponse, string>({
            query: (id) => ({
                url: `/category/${id}`,
                method: "DELETE",
            }),
            invalidatesTags:['Category']
        })
    })
})

export const { useGetCategoriesQuery,useAddCategoryMutation,useUpdateCategoryMutation,useDeleteCategoryMutation} = categoriesApi;