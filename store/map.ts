import { createSlice } from "@reduxjs/toolkit";

interface IState {
  showMap: boolean;
}

const initialState: IState = {
  showMap: true,
};

const map = createSlice({
  name: "map",
  initialState,
  reducers: {
    setShowMap: (state, action: PayloadAction<boolean>) => {
      state.showMap = action.payload;
    },
  },
});

export const mapActions = { ...map.actions };

export default map.reducer;
