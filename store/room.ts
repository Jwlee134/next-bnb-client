import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoom } from "types/room";

interface IState {
  search: {
    searchResults: IRoom[];
    originalLength: number;
    hoveredItemIndex: number | null;
  };
}

const initialState: IState = {
  search: {
    searchResults: [],
    originalLength: 0,
    hoveredItemIndex: null,
  },
};

const room = createSlice({
  name: "room",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      const { data, originalLength } = action.payload;
      state.search.searchResults = data;
      state.search.originalLength = originalLength;
    },
    setHoveredItemIndex: (state, action: PayloadAction<number | null>) => {
      state.search.hoveredItemIndex = action.payload;
    },
  },
});

export const roomActions = { ...room.actions };

export default room.reducer;
