import type { PoTransDetailState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: PoTransDetailState = {
  order: undefined,
  editedLines: [],
};

export const poTransDetailStateSlice = createSlice({
  name: "poTransDetailState",
  initialState,
  reducers: {
    setPoTransDetailStateSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  selectors: {
    selectPoTransDetailStateSlice: (state) => state,
  },
});

export const { setPoTransDetailStateSlice } = poTransDetailStateSlice.actions;
export const { selectPoTransDetailStateSlice } =
  poTransDetailStateSlice.selectors;
export default poTransDetailStateSlice.reducer;
