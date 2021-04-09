import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReview } from "types/review";

interface IState {
  userDetail: {
    reviewFromGuest: IReview[];
    reviewFromGuestPage: number;
    reviewFromHost: IReview[];
    reviewFromHostPage: number;
  };
}

const initialState: IState = {
  userDetail: {
    reviewFromGuest: [],
    reviewFromHost: [],
    reviewFromGuestPage: 1,
    reviewFromHostPage: 1,
  },
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setReviewFromGuest: (state, action: PayloadAction<IReview[]>) => {
      state.userDetail.reviewFromGuest.push(...action.payload);
    },
    setReviewFromGuestPage: (state, action: PayloadAction<number>) => {
      state.userDetail.reviewFromGuestPage = action.payload;
    },
    setReviewFromHost: (state, action: PayloadAction<IReview[]>) => {
      state.userDetail.reviewFromHost.push(...action.payload);
    },
    setReviewFromHostPage: (state, action: PayloadAction<number>) => {
      state.userDetail.reviewFromHostPage = action.payload;
    },
    initState: (state) => {
      state.userDetail = initialState.userDetail;
      return state;
    },
  },
});

export const userActions = { ...user.actions };

export default user.reducer;
