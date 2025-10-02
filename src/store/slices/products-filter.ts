import { ROWS_PER_PAGE } from "@/constants";
import type { ProductsFilterState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProductsFilterState = {
  page: 1,
  limit: ROWS_PER_PAGE,
  criteria: "",
};

export const productsFilterSlice = createSlice({
  name: "productsFilter",
  initialState,
  reducers: {
    setProductsFilterSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  selectors: {
    selectProductsFilterSlice: (state) => state,
  },
});

export const { setProductsFilterSlice } = productsFilterSlice.actions;
export const { selectProductsFilterSlice } = productsFilterSlice.selectors;
export default productsFilterSlice.reducer;
