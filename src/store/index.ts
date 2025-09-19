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
import { entityApi } from "./api/entity";
import { locationApi } from "./api/location";
import { userApi } from "./api/user";
import {
  entitiesFilterReducer,
  locationsFilterReducer,
  userReducer,
  usersFilterReducer,
} from "./slices";

const persistedUserReducer = persistReducer(
  {
    key: "user",
    storage,
  },
  userReducer
);

const middlewares = [
  authApi.middleware,
  entityApi.middleware,
  locationApi.middleware,
  userApi.middleware,
];

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [entityApi.reducerPath]: entityApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    entitiesFilter: entitiesFilterReducer,
    locationsFilter: locationsFilterReducer,
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
