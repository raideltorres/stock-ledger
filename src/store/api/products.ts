import { ACCESS_TOKEN_KEY } from "@/constants";
import { getStringFromLocalStorage } from "@/utils/data-storage/local-storage";
import type {
  ActionData,
  Product,
  ProductArgs,
  ProductsFilterState,
  GetResponse,
} from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
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
  tagTypes: ["ProductList", "Product"],
  endpoints: (builder) => ({
    getProduct: builder.query<GetResponse<Product>, ProductsFilterState>({
      query: (filter) => ({
        url: "/products",
        method: "GET",
        params: filter,
      }),
      providesTags: ["ProductList"],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    getProductByBarcode: builder.query<Product, string>({
      query: (barcode) => ({
        url: `/products/${barcode}/barcode`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation<Product, ProductArgs>({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ProductList"],
    }),
    updateProduct: builder.mutation<Product, ActionData<ProductArgs>>({
      query: (data) => ({
        url: `/products/${data._id}/upsert`,
        method: "PUT",
        body: data.partial,
      }),
      invalidatesTags: ["ProductList", "Product"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductByIdQuery,
  useGetProductByBarcodeQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsApi;
