import type { SoTransDetailState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SoTransDetailState = {
  order: undefined,
  editedLines: [],
};

export const soTransDetailStateSlice = createSlice({
  name: "soTransDetailState",
  initialState,
  reducers: {
    setSoTransDetailStateSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  selectors: {
    selectSoTransDetailStateSlice: (state) => state,
  },
});

export const { setSoTransDetailStateSlice } = soTransDetailStateSlice.actions;
export const { selectSoTransDetailStateSlice } =
  soTransDetailStateSlice.selectors;
export default soTransDetailStateSlice.reducer;
