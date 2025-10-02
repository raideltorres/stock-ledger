import type { UserState } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  isLoading: false,
  error: "",
  isLoggedIn: false,
  accessToken: "",
  user: {
    _id: "",
    email: "",
    name: "",
    avatar: "",
    role: "USER",
    created_at: "",
    updated_at: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserSlice: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  selectors: {
    selectUserSlice: (state) => state,
  },
});

export const { setUserSlice } = userSlice.actions;
export const { selectUserSlice } = userSlice.selectors;
export default userSlice.reducer;
