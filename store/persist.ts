import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  showMap: boolean;
  redirectUrl: string;
}

const initialState: IState = {
  showMap: true,
  redirectUrl: "",
};

const persist = createSlice({
  name: "map",
  initialState,
  reducers: {
    setShowMap: (state, action: PayloadAction<boolean>) => {
      state.showMap = action.payload;
    },
    setRedirectUrl: (state, action: PayloadAction<string>) => {
      state.redirectUrl = action.payload;
    },
  },
});

export const persistActions = { ...persist.actions };

export default persist.reducer;
