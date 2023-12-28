import { ICustomer } from '@/interfaces/customer';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const customerApi = createApi({
    reducerPath: 'customers',
    tagTypes: ['Customer'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
    }),
    endpoints: (builder) => ({
        getCustomer: builder.query<ICustomer[], void>({
            query: () => `/customer`,
            providesTags: ['Customer']
        }),
        getCustomerById: builder.query<ICustomer, number | string>({
            query: (id) => `/customer/${id}`,
            providesTags: ['Customer']
        }),
        removeCustomer: builder.mutation<void, string | number>({
            query: (id) => ({
                url: `/customer/${id}`,
                method: "delete",
            }),
            invalidatesTags: ['Customer']
        }),
        addCustomer: builder.mutation<ICustomer, ICustomer>({
            query: (customer) => ({
                url: `/signupcustomer`,
                method: "POST",
                body: customer
            }),
            invalidatesTags: ['Customer']
        }),
        updateCustomer: builder.mutation<ICustomer, ICustomer>({
            query: (customer) => ({
                url: `/customer/${customer._id}`,
                method: "PUT",
                body: customer
            }),
            invalidatesTags: ['Customer']
        })
    })
});

export const {
    useGetCustomerQuery, useGetCustomerByIdQuery, useAddCustomerMutation, useUpdateCustomerMutation, useRemoveCustomerMutation
} = customerApi;
export const customerReducer = customerApi.reducer;
export default customerApi;