import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWishlist } from "types/user";

interface IState {
  wishlist: IWishlist[];
  list: IWishlist | null;
}

const initialState: IState = {
  wishlist: [],
  list: undefined,
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
    setList: (state, action: PayloadAction<IWishlist | undefined>) => {
      state.list = action.payload;
    },
  },
});

export const wishlistActions = { ...wishlist.actions };

export default wishlist.reducer;
