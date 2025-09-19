import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authApi } from "./api/auth";
import { userApi } from "./api/user";
import { userReducer, usersFilterReducer } from "./slices";

const persistedUserReducer = persistReducer(
  {
    key: "user",
    storage,
  },
  userReducer
);

const middlewares = [authApi.middleware, userApi.middleware];

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    usersFilter: usersFilterReducer,

    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

const persistor = persistStore(store);

export { store, persistor };
