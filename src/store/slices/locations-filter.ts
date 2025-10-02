import { ROWS_PER_PAGE } from "@/constants";
import type { LocationsFilterState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: LocationsFilterState = {
  page: 1,
  limit: ROWS_PER_PAGE,
  entity: "ALL",
  criteria: "",
  type: "ALL",
  status: "ALL",
};

export const locationsFilterSlice = createSlice({
  name: "locationsFilter",
  initialState,
  reducers: {
    setLocationsFilterSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  selectors: {
    selectLocationsFilterSlice: (state) => state,
  },
});

export const { setLocationsFilterSlice } = locationsFilterSlice.actions;
export const { selectLocationsFilterSlice } = locationsFilterSlice.selectors;
export default locationsFilterSlice.reducer;
