import type { UsersFilterState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UsersFilterState = {
  page: 1,
  limit: 15,
  criteria: "",
  status: "ALL",
  role: "ALL",
};

export const usersFilterSlice = createSlice({
  name: "usersFilter",
  initialState,
  reducers: {
    setUsersFilterSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  selectors: {
    selectUsersFilterSlice: (state) => state,
  },
});

export const { setUsersFilterSlice } = usersFilterSlice.actions;
export const { selectUsersFilterSlice } = usersFilterSlice.selectors;
export default usersFilterSlice.reducer;
