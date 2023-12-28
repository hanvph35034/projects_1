
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IColor } from '@/interfaces/color';
const colorApi = createApi({
    reducerPath: "color",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API
    }),
    endpoints: (builder) => ({
        getColors: builder.query<IColor[], void>({
            query: () => `/color`,
        }),
        getColor: builder.query<IColor, string>({
            query: (id) => `/color/${id}`,
        }),
        addColor: builder.mutation<IColor, Partial<IColor>>({
            query: (body) => ({
                url: `/color`,
                method: "POST",
                body,
            }),
        }),
        updateColor: builder.mutation<IColor, Partial<IColor>>({
            query: ({ _id, ...patch }) => ({
                url: `/color/${_id}`,
                method: "PUT",
                body: patch,
            }),
        }),
        deleteColor: builder.mutation<IColor, string>({
            query: (id) => ({
                url: `/color/${id}`,
                method: "DELETE",
            }),
        }), 
    }),
});

export const {
    useGetColorsQuery,
    useGetColorQuery,
    useAddColorMutation,
    useUpdateColorMutation,
    useDeleteColorMutation,
 
} = colorApi;

export const colorReducer = colorApi.reducer;

export default colorApi;

