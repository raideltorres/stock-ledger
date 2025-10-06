import { ACCESS_TOKEN_KEY } from "@/constants";
import { getStringFromLocalStorage } from "@/utils/data-storage/local-storage";
import type {
  ActionData,
  SoTrans,
  SoTransArgs,
  SoTransFilterState,
  GetResponse,
} from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const soTransApi = createApi({
  reducerPath: "soTransApi",
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
  tagTypes: ["SoTransList", "SoTrans"],
  endpoints: (builder) => ({
    getSoTrans: builder.query<GetResponse<SoTrans>, SoTransFilterState>({
      query: (filter) => ({
        url: "/so-trans",
        method: "GET",
        params: filter,
      }),
      providesTags: ["SoTransList"],
    }),
    getSoTransById: builder.query<SoTrans, string>({
      query: (transId) => ({
        url: `/so-trans/${transId}`,
        method: "GET",
      }),
      providesTags: ["SoTrans"],
    }),
    createSoTrans: builder.mutation<SoTrans, SoTransArgs>({
      query: (data) => ({
        url: `/so-trans`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SoTransList"],
    }),
    updateSoTrans: builder.mutation<SoTrans, ActionData<SoTransArgs>>({
      query: (data) => ({
        url: `/so-trans/${data._id}/upsert`,
        method: "PUT",
        body: data.partial,
      }),
      invalidatesTags: ["SoTransList", "SoTrans"],
    }),
    sellSoTrans: builder.mutation<SoTrans, string>({
      query: (id) => ({
        url: `/so-trans/${id}/sell`,
        method: "POST",
      }),
      invalidatesTags: ["SoTransList", "SoTrans"],
    }),
  }),
});

export const {
  useGetSoTransQuery,
  useGetSoTransByIdQuery,
  useCreateSoTransMutation,
  useUpdateSoTransMutation,
  useSellSoTransMutation,
} = soTransApi;
