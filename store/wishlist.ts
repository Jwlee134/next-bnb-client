import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWishlist } from "types/user";

const initialState: IWishlist[] = [];

const wishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<IWishlist[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const wishlistActions = { ...wishlist.actions };

export default wishlist.reducer;
