import { IRole } from '@/interfaces/role';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const roleApi = createApi({
    reducerPath: 'role',
    tagTypes: ['Role'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        // fetchFn: async (...args) => {
        //     return fetch(...args);
        // }
    }),
    endpoints: (builder) => ({
        getRole: builder.query<IRole[], void>({
            query: () => `/roles`,
            providesTags: ['Role']
        }),
        getRoleById: builder.query<IRole, number | string>({
            query: (id) => `/roles/${id}`,
            providesTags: ['Role']
        }),
        removeRole: builder.mutation<void, string | number>({
            query: (id) => ({
                url: `/roles/${id}`,
                method: "delete",
            }),
            invalidatesTags: ['Role']
        }),
        addRole: builder.mutation<IRole, IRole>({
            query: (Role) => ({
                url: `/roles`,
                method: "POST",
                body: Role
            }),
            invalidatesTags: ['Role']
        }),
        updateRole: builder.mutation<IRole, IRole>({
            query: (Role) => ({
                url: `/roles/${Role._id}`,
                method: "PUT",
                body: Role
            }),
            invalidatesTags: ['Role']
        })
    })
});

export const {
    useGetRoleQuery, useGetRoleByIdQuery, useAddRoleMutation, useUpdateRoleMutation, useRemoveRoleMutation
} = roleApi;
export const roleReducer = roleApi.reducer;
export default roleApi;