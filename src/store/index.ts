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
import { customersApi } from "./api/customers";
import { entityApi } from "./api/entity";
import { locationApi } from "./api/location";
import { poTransApi } from "./api/po-trans";
import { productsApi } from "./api/products";
import { providersApi } from "./api/providers";
import { userApi } from "./api/user";
import {
  customersFilterReducer,
  entitiesFilterReducer,
  locationsFilterReducer,
  poTransDetailStateReducer,
  poTransFilterReducer,
  productsFilterReducer,
  providersFilterReducer,
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
  customersApi.middleware,
  entityApi.middleware,
  locationApi.middleware,
  poTransApi.middleware,
  productsApi.middleware,
  providersApi.middleware,
  userApi.middleware,
];

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
    [entityApi.reducerPath]: entityApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [poTransApi.reducerPath]: poTransApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [providersApi.reducerPath]: providersApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    customersFilter: customersFilterReducer,
    entitiesFilter: entitiesFilterReducer,
    locationsFilter: locationsFilterReducer,
    poTransDetailState: poTransDetailStateReducer,
    poTransFilter: poTransFilterReducer,
    productsFilter: productsFilterReducer,
    providersFilter: providersFilterReducer,
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
