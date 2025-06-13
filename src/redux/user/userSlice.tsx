import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/types";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user") || "")
    : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      sessionStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
