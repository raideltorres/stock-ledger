import { ACCESS_TOKEN_KEY } from "@/constants";
import { getStringFromLocalStorage } from "@/utils/data-storage/local-storage";
import type {
  ActionData,
  PoTrans,
  PoTransArgs,
  PoTransFilterState,
  GetResponse,
} from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const poTransApi = createApi({
  reducerPath: "poTransApi",
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
  tagTypes: ["PoTransList", "PoTrans"],
  endpoints: (builder) => ({
    getPoTrans: builder.query<GetResponse<PoTrans>, PoTransFilterState>({
      query: (filter) => ({
        url: "/po-trans",
        method: "GET",
        params: filter,
      }),
      providesTags: ["PoTransList"],
    }),
    getPoTransById: builder.query<PoTrans, string>({
      query: (transId) => ({
        url: `/po-trans/${transId}`,
        method: "GET",
      }),
      providesTags: ["PoTrans"],
    }),
    createPoTrans: builder.mutation<PoTrans, PoTransArgs>({
      query: (data) => ({
        url: `/po-trans`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PoTransList"],
    }),
    updatePoTrans: builder.mutation<PoTrans, ActionData<PoTransArgs>>({
      query: (data) => ({
        url: `/po-trans/${data._id}/upsert`,
        method: "PUT",
        body: data.partial,
      }),
      invalidatesTags: ["PoTransList", "PoTrans"],
    }),
    receivePoTrans: builder.mutation<PoTrans, string>({
      query: (id) => ({
        url: `/po-trans/${id}/receive`,
        method: "POST",
      }),
      invalidatesTags: ["PoTransList", "PoTrans"],
    }),
    invoicePoTrans: builder.mutation<PoTrans, string>({
      query: (id) => ({
        url: `/po-trans/${id}/invoice`,
        method: "POST",
      }),
      invalidatesTags: ["PoTransList", "PoTrans"],
    }),
  }),
});

export const {
  useGetPoTransQuery,
  useGetPoTransByIdQuery,
  useCreatePoTransMutation,
  useUpdatePoTransMutation,
  useReceivePoTransMutation,
  useInvoicePoTransMutation,
} = poTransApi;
