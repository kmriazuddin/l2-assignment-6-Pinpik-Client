import { baseApi } from "@/redux/api/baseApi";

const favouriteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFavourite: builder.mutation({
      query: ({ token, favouriteData }) => {
        return {
          url: "post/favorite",
          method: "POST",
          body: favouriteData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getFavoriteByUserId: builder.query({
      query: ({ token, userId }) => {
        return {
          url: `post/favorite/${userId}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});


export const {useAddFavouriteMutation, useGetFavoriteByUserIdQuery} = favouriteApi