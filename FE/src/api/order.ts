import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080",
    }),
    tagTypes: ["Sales"],
    endpoints: (builder) => ({
        getAllOrders: builder.query<{ data: any[] }, any>({
            query: (params) => ({ url: "/api/orders", params }),
        }),
        newOrder: builder.mutation<{ data: any }, any>({
            query: (data) => ({ url: "/api/orders", method: "POST", body: data }),
        }),
        updateOrder: builder.mutation<any, any>({
            query: ({ _id, status }) => ({ url: "/api/orders/" + _id, method: "PUT", body: { status } }),
        }),
        getOrderById: builder.query<any, any>({
            query: (id) => `/api/orders/${id}`
        }),
    }),
});

export const { useGetAllOrdersQuery, useNewOrderMutation, useUpdateOrderMutation, useGetOrderByIdQuery } = orderApi;
export default orderApi;
