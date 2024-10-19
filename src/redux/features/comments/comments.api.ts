import { baseApi } from "@/redux/api/baseApi";

const commentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: ({ id, token, commentData }) => {
        return {
          url: `post/${id}/comment`,
          method: "POST",
          body: commentData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    updateComment: builder.mutation({
      query: ({ postId, commentId, token, updateCommentData }) => {
        return {
          url: `/post/${postId}/comment/${commentId}`,
          method: "PUT",
          body: updateCommentData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    deleteComment: builder.mutation({
      query: ({ postId, commentId, token }) => {
        return {
          url: `/post/${postId}/comment/${commentId}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
