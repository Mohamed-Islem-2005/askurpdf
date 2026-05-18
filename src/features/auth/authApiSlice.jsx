import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (Credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...Credentials },
      }),
    }),
    register:builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: { ...userData },
      }),
    })
  }),
});


export const {useLoginMutation, useRegisterMutation} = authApiSlice;
