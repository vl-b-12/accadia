import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiRtk } from "@/store/services";
import { cartSlice, customerSlice, filterSlice } from "@/store/slices";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: [
    "cart",
    "totalPrice",
    "totalQnt",
    "tax",
    "karatsBreakdown",
    "grandTotal",
    "discount",
  ],
};

const customerPersistConfig = {
  key: "customers",
  storage,
  whitelist: ["selectedCustomer"],
};

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartSlice),
  customer: persistReducer(customerPersistConfig, customerSlice),
  filter: filterSlice,
  [apiRtk.reducerPath]: apiRtk.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat([apiRtk.middleware]),
});

export const persistor = persistStore(store);
