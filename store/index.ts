import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import {
  TypedUseSelectorHook,
  useSelector as useTypedSelector,
} from "react-redux";

import common from "./common";
import user from "./user";
import hosting from "./hosting";
import search from "./search";
import room from "./room";

const rootReducer = combineReducers({
  common,
  user,
  hosting,
  search,
  room,
});

export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      return {
        ...state,
        ...action.payload,
      };
    }
    return state;
  }
  return rootReducer(state, action);
};

export const useSelector: TypedUseSelectorHook<RootState> = useTypedSelector;

const initStore: MakeStore = () => {
  const store = configureStore({
    reducer,
  });
  initialRootState = store.getState();
  return store;
};

export const wrapper = createWrapper(initStore);
