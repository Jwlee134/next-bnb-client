import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  authMode: "signUp" | "login";
  wishlistMode: "create" | "add";
  hostingMode: "register" | "update";
  searchMode: "location" | "date" | "guest";
  validation: boolean;
  showSearchBar: boolean;
  showMiniSearchBar: boolean;
  showLocationPopup: boolean;
  scaleDown: boolean;
  isGettingCoordinates: boolean;
  clickedRoomId: string;
  photoIndex: number;
  isLoading: boolean;
  innerWidth: number;
}

const initialState: IState = {
  authMode: "login",
  wishlistMode: "add",
  hostingMode: "register",
  searchMode: "location",
  validation: false,
  showSearchBar: true,
  showMiniSearchBar: false,
  showLocationPopup: false,
  scaleDown: false,
  isGettingCoordinates: false,
  clickedRoomId: "",
  photoIndex: 0,
  isLoading: false,
  innerWidth: 0,
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
    setHostingMode: (state, action: PayloadAction<"register" | "update">) => {
      state.hostingMode = action.payload;
    },
    setSearchMode: (
      state,
      action: PayloadAction<"location" | "date" | "guest">
    ) => {
      state.searchMode = action.payload;
    },
    setValidation: (state, action: PayloadAction<boolean>) => {
      state.validation = action.payload;
    },
    setShowSearchBar: (state, action: PayloadAction<boolean>) => {
      state.showSearchBar = action.payload;
    },
    setShowMiniSearchBar: (state, action: PayloadAction<boolean>) => {
      state.showMiniSearchBar = action.payload;
    },
    setShowLocationPopup: (state, action: PayloadAction<boolean>) => {
      state.showLocationPopup = action.payload;
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
    setPhotoIndex: (state, action: PayloadAction<number>) => {
      state.photoIndex = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setInnerWidth: (state, action: PayloadAction<number>) => {
      state.innerWidth = action.payload;
    },
  },
});

export const commonActions = { ...common.actions };

export default common.reducer;
