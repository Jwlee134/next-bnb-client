import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoom } from "types/room";

interface IState {
  search: {
    searchResults: IRoom[];
    originalLength: number;
    hoveredItemIndex: number | null;
  };
  detail: {
    room: IRoom | null;
    photoIndex: number;
  };
  isLoading: boolean;
}

const initialState: IState = {
  search: {
    searchResults: [],
    originalLength: 0,
    hoveredItemIndex: null,
  },
  detail: {
    room: null,
    photoIndex: 0,
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
    setHoveredItemIndex: (state, action: PayloadAction<number | null>) => {
      state.search.hoveredItemIndex = action.payload;
    },
    setRoom: (state, action: PayloadAction<IRoom>) => {
      state.detail.room = action.payload;
    },
    setPhotoIndex: (state, action: PayloadAction<number>) => {
      state.detail.photoIndex = action.payload;
    },
  },
});

export const roomActions = { ...room.actions };

export default room.reducer;
