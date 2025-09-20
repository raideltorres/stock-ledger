import { ROWS_PER_PAGE } from "@/constants";
import type { CustomersFilterState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CustomersFilterState = {
  page: 1,
  limit: ROWS_PER_PAGE,
  criteria: "",
  status: "ALL",
};

export const customersFilterSlice = createSlice({
  name: "customersFilter",
  initialState,
  reducers: {
    setCustomersFilterSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  selectors: {
    selectCustomersFilterSlice: (state) => state,
  },
});

export const { setCustomersFilterSlice } = customersFilterSlice.actions;
export const { selectCustomersFilterSlice } = customersFilterSlice.selectors;
export default customersFilterSlice.reducer;
