import { ROWS_PER_PAGE } from "@/constants";
import type { EntitiesFilterState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: EntitiesFilterState = {
  page: 1,
  limit: ROWS_PER_PAGE,
  criteria: "",
  status: "ALL",
};

export const entitiesFilterSlice = createSlice({
  name: "entitiesFilter",
  initialState,
  reducers: {
    setEntitiesFilterSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  selectors: {
    selectEntitiesFilterSlice: (state) => state,
  },
});

export const { setEntitiesFilterSlice } = entitiesFilterSlice.actions;
export const { selectEntitiesFilterSlice } = entitiesFilterSlice.selectors;
export default entitiesFilterSlice.reducer;
