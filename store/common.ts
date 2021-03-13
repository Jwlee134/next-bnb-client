import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  authMode: "signUp" | "login";
  validation: boolean;
  showMap: boolean;
  showSearchBar: boolean;
  showMiniSearchBar: boolean;
  scaleDown: boolean;
  isGettingCoordinates: boolean;
}

const initialState: IState = {
  authMode: "signUp",
  validation: false,
  showMap: true,
  showSearchBar: true,
  showMiniSearchBar: false,
  scaleDown: false,
  isGettingCoordinates: false,
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
    setIsGettingCoordinates: (state, action: PayloadAction<boolean>) => {
      state.isGettingCoordinates = action.payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common.reducer;
