import { createSlice } from "@reduxjs/toolkit";
import { IRoomDetail } from "types/room";

interface IState {
  search: {
    searchResults: IRoomDetail[];
    originalLength: number;
  };
}

const initialState: IState = {
  search: {
    searchResults: [],
    originalLength: 0,
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
  },
});

export const roomActions = { ...room.actions };

export default room.reducer;
