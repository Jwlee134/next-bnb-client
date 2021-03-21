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
      state.sort((a, b) => b.idList.length - a.idList.length);
    },
    deleteItem: (
      state,
      action: PayloadAction<{ index: number; id: string }>
    ) => {
      const { index, id } = action.payload;
      const filtered = state[index].idList.filter((roomId) => roomId !== id);
      state[index].idList = filtered;
      state.sort((a, b) => b.idList.length - a.idList.length);
    },
  },
});

export const wishlistActions = { ...wishlist.actions };

export default wishlist.reducer;
