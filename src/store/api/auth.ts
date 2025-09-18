import { ACCESS_TOKEN_KEY } from "@/constants/local-storage";
import { getStringFromLocalStorage } from "@/utils/data-storage/local-storage";
import type {
  AuthResponse,
  ErrorResponse,
  SignInArgs,
  SignUpArgs,
} from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getStringFromLocalStorage(ACCESS_TOKEN_KEY);

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse | ErrorResponse, SignInArgs>({
      query: (signInData) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: signInData,
      }),
    }),
    signUp: builder.mutation<AuthResponse | ErrorResponse, SignUpArgs>({
      query: (signUpData) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: signUpData,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
