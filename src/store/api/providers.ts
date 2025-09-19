import { ACCESS_TOKEN_KEY } from "@/constants";
import { getStringFromLocalStorage } from "@/utils/data-storage/local-storage";
import type {
  ActionData,
  Provider,
  ProviderArgs,
  ProvidersFilterState,
  GetResponse,
} from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const providersApi = createApi({
  reducerPath: "providersApi",
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
  tagTypes: ["ProviderList", "Provider"],
  endpoints: (builder) => ({
    getProvider: builder.query<GetResponse<Provider>, ProvidersFilterState>({
      query: (filter) => ({
        url: "/providers",
        method: "GET",
        params: filter,
      }),
      providesTags: ["ProviderList"],
    }),
    createProvider: builder.mutation<Provider, ProviderArgs>({
      query: (data) => ({
        url: `/providers`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProviderList"],
    }),
    updateProvider: builder.mutation<Provider, ActionData<ProviderArgs>>({
      query: (data) => ({
        url: `/providers/${data._id}/upsert`,
        method: "PUT",
        body: data.partial,
      }),
      invalidatesTags: ["ProviderList", "Provider"],
    }),
  }),
});

export const {
  useGetProviderQuery,
  useCreateProviderMutation,
  useUpdateProviderMutation,
} = providersApi;
