import { ACCESS_TOKEN_KEY } from "@/constants";
import { getStringFromLocalStorage } from "@/utils/data-storage/local-storage";
import type {
  ActionData,
  GetResponse,
  Location,
  LocationsFilterState,
} from "@/utils/types";
import type { LocationArgs } from "@/utils/types/location";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationApi = createApi({
  reducerPath: "locationApi",
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
  tagTypes: ["LocationList", "Location"],
  endpoints: (builder) => ({
    getLocation: builder.query<GetResponse<Location>, LocationsFilterState>({
      query: (filter) => ({
        url: "/location",
        method: "GET",
        params: filter,
      }),
      providesTags: ["LocationList"],
    }),
    createLocation: builder.mutation<Location, LocationArgs>({
      query: (data) => ({
        url: `/location`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["LocationList"],
    }),
    updateLocation: builder.mutation<Location, ActionData<LocationArgs>>({
      query: (data) => ({
        url: `/location/${data._id}/upsert`,
        method: "PUT",
        body: data.partial,
      }),
      invalidatesTags: ["LocationList", "Location"],
    }),
  }),
});

export const {
  useGetLocationQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
} = locationApi;
