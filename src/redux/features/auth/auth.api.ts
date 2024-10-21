import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => {
        return {
          url: "auth/register",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    login: builder.mutation({
      query: (uderInfo) => {
        return {
          url: "auth/login",
          method: "POST",
          body: uderInfo,
        };
      },
    }),
    userUpdate: builder.mutation({
      query: ({ token, updateInfo }) => {
        return {
          url: "auth/user/profile",
          method: "PUT",
          body: updateInfo,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    getAllUser: builder.query({
      query: ({ token }) => {
        return {
          url: "auth/users",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
    userRoleUpdate: builder.mutation({
      query: ({ token, updateInfo, userId }) => {
        console.log(userId);

        return {
          url: `auth/user/role/${userId}`,
          method: "PUT",
          body: updateInfo,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAllUserQuery,
  useUserUpdateMutation,
  useUserRoleUpdateMutation
} = authApi;
