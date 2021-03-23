import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWishlist } from "types/user";

interface IState {
  wishlist: IWishlist[];
  detail: IWishlist | undefined;
}

const initialState: IState = {
  wishlist: [],
  detail: undefined,
};

const wishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<IWishlist[]>) => {
      state.wishlist = action.payload;
    },
    setTitle: (
      state,
      action: PayloadAction<{ title: string; listId: string }>
    ) => {
      const { title, listId } = action.payload;
      const index = state.wishlist.findIndex((list) => list._id === listId);
      state.wishlist[index].title = title;
    },
    setDetail: (state, action: PayloadAction<IWishlist | undefined>) => {
      state.detail = action.payload;
    },
  },
});

export const wishlistActions = { ...wishlist.actions };

export default wishlist.reducer;
