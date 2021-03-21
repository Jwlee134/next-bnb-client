import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import {
  TypedUseSelectorHook,
  useSelector as useTypedSelector,
} from "react-redux";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import common from "./common";
import user from "./user";
import hosting from "./hosting";
import search from "./search";
import room from "./room";
import wishlist from "./wishlist";

const rootReducer = combineReducers({
  common,
  user,
  hosting,
  search,
  room,
  wishlist,
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

const makeStore = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return configureStore({
      reducer,
      middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    });
  }

  const { persistReducer } = require("redux-persist");
  const storage = require("redux-persist/lib/storage").default;

  const persistConfig = {
    key: "nextjs",
    whitelist: [],
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, reducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
  initialRootState = store.getState();

  return store;
};

export const wrapper = createWrapper(makeStore);
