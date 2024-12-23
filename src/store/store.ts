import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiRtk } from "@/store/services";
import { cartSlice } from "@/store/slices";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  cart: cartSlice,
  [apiRtk.reducerPath]: apiRtk.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat([apiRtk.middleware]),
});

export const persistor = persistStore(store);
