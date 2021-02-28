import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  authMode: "signUp" | "login";
  validation: boolean;
}

const initialState: State = {
  authMode: "signUp",
  validation: false,
};

const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setAuthMode: (state, action: PayloadAction<"signUp" | "login">) => {
      state.authMode = action.payload;
    },
    setValidation: (state, action: PayloadAction<boolean>) => {
      state.validation = action.payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common.reducer;
