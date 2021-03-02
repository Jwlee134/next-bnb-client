import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isForGuest: string | null;
}

const initialState: IState = {
  largeBuildingType: null,
  buildingType: null,
  roomType: null,
  isForGuest: null,
};

const hosting = createSlice({
  name: "hosting",
  initialState,
  reducers: {
    setLargeBuildingType: (state, action: PayloadAction<string>) => {
      state.largeBuildingType = action.payload;
    },
    setBuildingType: (state, action: PayloadAction<string | null>) => {
      state.buildingType = action.payload;
    },
    setRoomType: (state, action: PayloadAction<string>) => {
      state.roomType = action.payload;
    },
    setIsForGuest: (state, action: PayloadAction<string>) => {
      state.isForGuest = action.payload;
    },
  },
});

export const hostingActions = { ...hosting.actions };

export default hosting.reducer;
