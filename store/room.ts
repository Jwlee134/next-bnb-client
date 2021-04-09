import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReview } from "types/review";
import { IRoom } from "types/room";

interface IState {
  search: {
    searchResults: IRoom[];
    originalLength: number;
    hoveredItemIndex: number | null;
  };
  detail: {
    review: IReview[];
    page: number;
  };
}

const initialState: IState = {
  search: {
    searchResults: [],
    originalLength: 0,
    hoveredItemIndex: null,
  },
  detail: {
    review: [],
    page: 1,
  },
};

const room = createSlice({
  name: "room",
  initialState,
  reducers: {
    setSearchResults: (
      state,
      action: PayloadAction<{ data: IRoom[]; originalLength: number }>
    ) => {
      const { data, originalLength } = action.payload;
      state.search.searchResults = data;
      state.search.originalLength = originalLength;
    },
    setHoveredItemIndex: (state, action: PayloadAction<number | null>) => {
      state.search.hoveredItemIndex = action.payload;
    },
    setReview: (
      state,
      action: PayloadAction<{ review: IReview[]; page: number }>
    ) => {
      const { review, page } = action.payload;
      state.detail.review = review;
      state.detail.page = page;
    },
  },
});

export const roomActions = { ...room.actions };

export default room.reducer;
