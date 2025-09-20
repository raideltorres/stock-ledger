import { ROWS_PER_PAGE } from "@/constants";
import type { ProvidersFilterState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProvidersFilterState = {
  page: 1,
  limit: ROWS_PER_PAGE,
  criteria: "",
  status: "ALL",
};

export const providersFilterSlice = createSlice({
  name: "providersFilter",
  initialState,
  reducers: {
    setProvidersFilterSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  selectors: {
    selectProvidersFilterSlice: (state) => state,
  },
});

export const { setProvidersFilterSlice } = providersFilterSlice.actions;
export const { selectProvidersFilterSlice } = providersFilterSlice.selectors;
export default providersFilterSlice.reducer;
