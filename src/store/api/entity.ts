import { ACCESS_TOKEN_KEY } from "@/constants";
import { getStringFromLocalStorage } from "@/utils/data-storage/local-storage";
import type {
  ActionData,
  GetResponse,
  Entity,
  EntitiesFilterState,
} from "@/utils/types";
import type { EntityArgs } from "@/utils/types/entity";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const entityApi = createApi({
  reducerPath: "entityApi",
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
  tagTypes: ["EntityList", "Entity"],
  endpoints: (builder) => ({
    getEntity: builder.query<GetResponse<Entity>, EntitiesFilterState>({
      query: (filter) => ({
        url: "/entity",
        method: "GET",
        params: filter,
      }),
      providesTags: ["EntityList"],
    }),
    createEntity: builder.mutation<Entity, EntityArgs>({
      query: (data) => ({
        url: `/entity`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EntityList"],
    }),
    updateEntity: builder.mutation<Entity, ActionData<EntityArgs>>({
      query: (data) => ({
        url: `/entity/${data._id}/upsert`,
        method: "PUT",
        body: data.partial,
      }),
      invalidatesTags: ["EntityList", "Entity"],
    }),
  }),
});

export const {
  useGetEntityQuery,
  useCreateEntityMutation,
  useUpdateEntityMutation,
} = entityApi;
