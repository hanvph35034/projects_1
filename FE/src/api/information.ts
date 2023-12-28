import { IInformation } from '../interfaces/information';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const informationApi = createApi({
    reducerPath: 'information',
    tagTypes: ['Information'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        // baseUrl: 'http://localhost:3000',
    }),
    endpoints: (builder) => ({
        getInformations: builder.query<IInformation[], void>({
            query: () => `/information`,
            providesTags: ['Information']
        }),
        getInformationById: builder.query<IInformation, number | string>({
            query: (id) => `/information/${id}`,
            providesTags: ['Information']
        }),
        removeInformation: builder.mutation<void, number>({
            query: (id) => ({
                url: `/information/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Information']
        }),
        addInformation: builder.mutation<IInformation, IInformation>({
            query: (information) => ({
                url: `/information`,
                method: "POST",
                body: information
            }),
            invalidatesTags: ['Information']
        }),
        updateInformation: builder.mutation<IInformation, IInformation>({
            query: (information) => ({
                url: `/information/${information._id}`,
                method: "PATCH",
                body: information
            }),
            invalidatesTags: ['Information']
        })
    })
});

export const {
    useGetInformationsQuery,
    useGetInformationByIdQuery,
    useRemoveInformationMutation,
    useAddInformationMutation,
    useUpdateInformationMutation
} = informationApi;
export const informationReducer = informationApi.reducer;
export default informationApi;