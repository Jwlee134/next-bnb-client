import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WishlistState = {
  title: string;
  idList: string[];
}[];

const initialState: WishlistState = [];

const wishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    makeWishlist: (state, action: PayloadAction<string>) => {
      state.push({ title: action.payload, idList: [] });
    },
    addItem: (
      state,
      action: PayloadAction<{ index: number; clickedRoomId: string }>
    ) => {
      const { index, clickedRoomId } = action.payload;
      state[index].idList.push(clickedRoomId);
    },
    deleteItem: (
      state,
      action: PayloadAction<{ title: string; id: string }>
    ) => {
      const { title, id } = action.payload;
      const index = state.findIndex((list) => list.title === title);
      const filtered = state[index].idList.filter((roomId) => roomId !== id);
      state[index].idList = filtered;
    },
  },
});

export const wishlistActions = { ...wishlist.actions };

export default wishlist.reducer;
