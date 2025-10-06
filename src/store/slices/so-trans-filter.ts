import { ROWS_PER_PAGE } from "@/constants";
import type { SoTransFilterState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SoTransFilterState = {
  page: 1,
  limit: ROWS_PER_PAGE,
  location: "",
  user: "",
  customer: "",
  status: "ALL",
};

export const soTransFilterSlice = createSlice({
  name: "soTransFilter",
  initialState,
  reducers: {
    setSoTransFilterSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  selectors: {
    selectSoTransFilterSlice: (state) => state,
  },
});

export const { setSoTransFilterSlice } = soTransFilterSlice.actions;
export const { selectSoTransFilterSlice } = soTransFilterSlice.selectors;
export default soTransFilterSlice.reducer;
