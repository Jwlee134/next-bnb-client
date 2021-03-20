import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SearchState = {
  value: string;
  latitude: number;
  longitude: number;
  checkIn: string | null;
  checkOut: string | null;
  adults: number;
  children: number;
  infants: number;
};

const initialState: SearchState = {
  value: "",
  latitude: 0,
  longitude: 0,
  checkIn: null,
  checkOut: null,
  adults: 1,
  children: 0,
  infants: 0,
};

const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setLatitude: (state, action: PayloadAction<number>) => {
      state.latitude = action.payload;
    },
    setLongitude: (state, action: PayloadAction<number>) => {
      state.longitude = action.payload;
    },
    setCheckIn: (state, action: PayloadAction<string>) => {
      state.checkIn = action.payload;
    },
    setCheckOut: (state, action: PayloadAction<string>) => {
      state.checkOut = action.payload;
    },
    setAdults: (state, action: PayloadAction<number>) => {
      state.adults = action.payload;
    },
    setChildren: (state, action: PayloadAction<number>) => {
      state.children = action.payload;
    },
    setInfants: (state, action: PayloadAction<number>) => {
      state.infants = action.payload;
    },
    setSearch: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const searchActions = { ...search.actions };

export default search.reducer;
