import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  authMode: "signUp" | "login";
  validation: boolean;
  showMap: boolean;
  showSearchBar: boolean;
  showMiniSearchBar: boolean;
  scaleDown: boolean;
}

const initialState: IState = {
  authMode: "signUp",
  validation: false,
  showMap: true,
  showSearchBar: true,
  showMiniSearchBar: false,
  scaleDown: false,
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
    setShowMap: (state, action: PayloadAction<boolean>) => {
      state.showMap = action.payload;
    },
    setShowSearchBar: (state, action: PayloadAction<boolean>) => {
      state.showSearchBar = action.payload;
    },
    setShowMiniSearchBar: (state, action: PayloadAction<boolean>) => {
      state.showMiniSearchBar = action.payload;
    },
    setScaleDown: (state, action: PayloadAction<boolean>) => {
      state.scaleDown = action.payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common.reducer;
