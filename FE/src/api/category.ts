import { ICategory } from '../interfaces/category';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const categoryApi = createApi({
    reducerPath: 'category',
    tagTypes: ['Category'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        // baseUrl: 'http://localhost:3000',
    }),
    endpoints: (builder) => ({
        getCategorys: builder.query<ICategory[], void>({
            query: () => `/categorys`,
            providesTags: ['Category']
        }),
        getCategoryById: builder.query<ICategory, number | string>({
            query: (id) => `/categorys/${id}`,
            providesTags: ['Category']
        }),
        removeCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `/categorys/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Category']
        }),
        addCategory: builder.mutation<ICategory, ICategory>({
            query: (category) => ({
                url: `/categorys`,
                method: "POST",
                body: category
            }),
            invalidatesTags: ['Category']
        }),
        updateCategory: builder.mutation<ICategory, ICategory>({
            query: (category) => ({
                url: `/categorys/${category._id}`,
                method: "PATCH",
                body: category
            }),
            invalidatesTags: ['Category']
        })
    })
});

export const {
    useGetCategorysQuery,
    useGetCategoryByIdQuery,
    useRemoveCategoryMutation,
    useAddCategoryMutation,
    useUpdateCategoryMutation
} = categoryApi;
export const categoryReducer = categoryApi.reducer;
export default categoryApi;