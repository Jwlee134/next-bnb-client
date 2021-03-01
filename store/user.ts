import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "types/user";

const initialState: { user: IUser | null; isLoggedIn: boolean } = {
  user: null,
  isLoggedIn: false,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    initUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const userActions = { ...user.actions };

export default user.reducer;
