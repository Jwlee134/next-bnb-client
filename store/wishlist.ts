import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  mode: "create" | "add";
  clickedRoomId: string;
  wishlist: {
    title: string;
    idList: string[];
  }[];
}

const initialState: WishlistState = {
  mode: "add",
  clickedRoomId: "",
  wishlist: [],
};

const wishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<"create" | "add">) => {
      state.mode = action.payload;
    },
    setClickedRoomId: (state, action: PayloadAction<string>) => {
      state.clickedRoomId = action.payload;
    },
    makeWishlist: (state, action: PayloadAction<string>) => {
      state.wishlist.push({ title: action.payload, idList: [] });
    },
    addItem: (state, action: PayloadAction<number>) => {
      state.wishlist[action.payload].idList.push(state.clickedRoomId);
    },
    deleteItem: (
      state,
      action: PayloadAction<{ title: string; id: string }>
    ) => {
      const { title, id } = action.payload;
      const index = state.wishlist.findIndex((list) => list.title === title);
      const filtered = state.wishlist[index].idList.filter(
        (roomId) => roomId !== id
      );
      state.wishlist[index].idList = filtered;
    },
  },
});

export const wishlistActions = { ...wishlist.actions };

export default wishlist.reducer;
