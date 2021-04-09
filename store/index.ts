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
import hosting from "./hosting";
import search from "./search";
import room from "./room";
import map from "./map";
import user from "./user";

const rootReducer = combineReducers({
  common,
  hosting,
  search,
  room,
  map,
  user,
});

export type RootState = ReturnType<typeof rootReducer>;

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.common.innerWidth) {
      // preserve innerWidth value on client side navigation
      nextState.common.innerWidth = state.common.innerWidth;
    }
    if (!state.map.showMap) {
      nextState.map.showMap = state.map.showMap;
    }
    return nextState;
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
    whitelist: ["map"],
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

  return store;
};

export const wrapper = createWrapper(makeStore);
