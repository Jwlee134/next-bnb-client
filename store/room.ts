import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoomDetail } from "types/room";

interface IState {
  search: {
    searchResults: IRoomDetail[];
    originalLength: number;
    hoveredItem: string;
  };
  isLoading: boolean;
}

const initialState: IState = {
  search: {
    searchResults: [],
    originalLength: 0,
    hoveredItem: "",
  },
  isLoading: false,
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
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setHoveredItem: (state, action: PayloadAction<string>) => {
      state.search.hoveredItem = action.payload;
    },
  },
});

export const roomActions = { ...room.actions };

export default room.reducer;
