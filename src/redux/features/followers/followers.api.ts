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
    unfollow: builder.mutation({
      query: ({ token, updatedData }) => {
        return {
          url: `user/unfollow`,
          method: "PUT",
          body: updatedData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useAddFollowingMutation,
  useGetFollowersQuery,
  useGetFollowingsQuery,
  useUnfollowMutation
} = followersApi;
