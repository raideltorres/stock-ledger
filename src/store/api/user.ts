import { ACCESS_TOKEN_KEY } from "@/constants";
import { getStringFromLocalStorage } from "@/utils/data-storage/local-storage";
import type {
  ActionData,
  GetResponse,
  SignUpArgs,
  User,
  UsersFilterState,
} from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["UserList", "User"],
  endpoints: (builder) => ({
    getUsers: builder.query<GetResponse<User>, UsersFilterState>({
      query: (filter) => ({
        url: "/users",
        method: "GET",
        params: filter,
      }),
      providesTags: ["UserList"],
    }),
    getCurrentUserProfile: builder.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUserProfile: builder.query({
      query: (id) => ({
        url: `/users/${id}/profile`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    createUser: builder.mutation<User, SignUpArgs>({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserList"],
    }),
    updateUser: builder.mutation<User, ActionData<User>>({
      query: (data) => ({
        url: `/users/${data._id}/upsert`,
        method: "PUT",
        body: data.partial,
      }),
      invalidatesTags: ["UserList", "User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetCurrentUserProfileQuery,
  useGetUserProfileQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
