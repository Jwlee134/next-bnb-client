import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  authMode: "signUp" | "login";
  wishlistMode: "create" | "add";
  validation: boolean;
  showMap: boolean;
  showSearchBar: boolean;
  showMiniSearchBar: boolean;
  scaleDown: boolean;
  isGettingCoordinates: boolean;
  clickedRoomId: string;
}

const initialState: IState = {
  authMode: "signUp",
  wishlistMode: "add",
  validation: false,
  showMap: true,
  showSearchBar: true,
  showMiniSearchBar: false,
  scaleDown: false,
  isGettingCoordinates: false,
  clickedRoomId: "",
};

const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setAuthMode: (state, action: PayloadAction<"signUp" | "login">) => {
      state.authMode = action.payload;
    },
    setWishlistMode: (state, action: PayloadAction<"create" | "add">) => {
      state.wishlistMode = action.payload;
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
    setClickedRoomId: (state, action: PayloadAction<string>) => {
      state.clickedRoomId = action.payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common.reducer;
