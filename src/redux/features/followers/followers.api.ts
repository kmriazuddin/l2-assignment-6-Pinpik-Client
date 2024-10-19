import { baseApi } from "@/redux/api/baseApi";

const followersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFollowing: builder.mutation({
      query: ({ token, followData }) => {
        return {
          url: `user/follow`,
          method: "POST",
          body: followData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getFollowers: builder.query({
      query: ({ token, userId }) => {
        return {
          url: `user/followers/${userId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getFollowings: builder.query({
      query: ({ token, userId }) => {
        return {
          url: `user/following/${userId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    //   deleteComment: builder.mutation({
    //     query: ({ postId, commentId, token }) => {
    //       return {
    //         url: `/post/${postId}/comment/${commentId}`,
    //         method: "DELETE",
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       };
    //     },
    //   }),
  }),
});

export const {
  useAddFollowingMutation,
  useGetFollowersQuery,
  useGetFollowingsQuery,
} = followersApi;
