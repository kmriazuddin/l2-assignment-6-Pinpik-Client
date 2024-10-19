import { baseApi } from "@/redux/api/baseApi";

const uploadImageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: ({ data }) => {
        return {
          url: "upload",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useUploadImageMutation } = uploadImageApi;
