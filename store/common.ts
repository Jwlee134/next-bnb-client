import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  authMode: "signUp" | "login";
}

const initialState: State = {
  authMode: "signUp",
};

const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setAuthMode: (state, action: PayloadAction<"signUp" | "login">) => {
      state.authMode = action.payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common.reducer;
