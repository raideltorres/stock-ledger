import { ROWS_PER_PAGE } from "@/constants";
import type { PoTransFilterState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: PoTransFilterState = {
  page: 1,
  limit: ROWS_PER_PAGE,
  location: "",
  user: "",
  provider: "",
  status: "ALL",
};

export const poTransFilterSlice = createSlice({
  name: "poTransFilter",
  initialState,
  reducers: {
    setPoTransFilterSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  selectors: {
    selectPoTransFilterSlice: (state) => state,
  },
});

export const { setPoTransFilterSlice } = poTransFilterSlice.actions;
export const { selectPoTransFilterSlice } = poTransFilterSlice.selectors;
export default poTransFilterSlice.reducer;
