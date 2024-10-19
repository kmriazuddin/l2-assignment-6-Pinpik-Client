import { baseApi } from "@/redux/api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    payment: builder.mutation({
      query: ({ token, data }) => {
        return {
          url: `/create-payment-intent`,
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { usePaymentMutation } = paymentApi;
