import { ACCESS_TOKEN_KEY } from "@/constants";
import { getStringFromLocalStorage } from "@/utils/data-storage/local-storage";
import type {
  ActionData,
  Customer,
  CustomerArgs,
  CustomersFilterState,
  GetResponse,
} from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customersApi = createApi({
  reducerPath: "customersApi",
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
  tagTypes: ["CustomerList", "Customer"],
  endpoints: (builder) => ({
    getCustomer: builder.query<GetResponse<Customer>, CustomersFilterState>({
      query: (filter) => ({
        url: "/customers",
        method: "GET",
        params: filter,
      }),
      providesTags: ["CustomerList"],
    }),
    createCustomer: builder.mutation<Customer, CustomerArgs>({
      query: (data) => ({
        url: `/customers`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CustomerList"],
    }),
    updateCustomer: builder.mutation<Customer, ActionData<CustomerArgs>>({
      query: (data) => ({
        url: `/customers/${data._id}/upsert`,
        method: "PUT",
        body: data.partial,
      }),
      invalidatesTags: ["CustomerList", "Customer"],
    }),
  }),
});

export const {
  useGetCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
} = customersApi;
