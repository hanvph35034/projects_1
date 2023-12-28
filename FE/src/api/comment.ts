
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Icomment } from '../interfaces/comment';
const commentApi = createApi({
    reducerPath: "comments",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API
    }),
    endpoints: (builder) => ({
        // actions
        // GET 
        getComment: builder.query<any, void>({
            query: () => `/comments`
        }),
        getCommentById: builder.query<Icomment, number | string>({
            query: (id) => `/comments/${id}`
        }),
        addComment: builder.mutation<Icomment, Icomment>({
            query: (comments) => ({
                url: `/comments`,
                method: "POST",
                body: comments
            })
        }),
        updateComment: builder.mutation<Icomment, Icomment>({
            query: (comments) => ({
                url: `/comments/${comments._id}/${comments.productId}/${comments.userId}`,
                method: "PUT",
                body: comments
            })
        }),
        removeComment: builder.mutation<Icomment, number | string>({
            query: (id) => ({
                url: `/comments/${id}`,
                method: "DELETE"
            })
        }),

    })
});

export const {
    useGetCommentQuery,
    useGetCommentByIdQuery,
    useAddCommentMutation,
    useUpdateCommentMutation,
    useRemoveCommentMutation

} = commentApi;

export const CommentReducer = commentApi.reducer;

export default commentApi;