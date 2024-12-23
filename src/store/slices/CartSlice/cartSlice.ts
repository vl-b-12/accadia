import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/types/types";

interface CartProduct extends Product {
  quantity: number;
  totalPrice: number;
}

interface CartState {
  cart: CartProduct[];
  totalQnt: number;
  totalPrice: number;
}

const initialState: CartState = {
  cart: [],
  totalQnt: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, { payload }) => {
      // const productInCart = state.cart.find(
      //   (product) => JSON.stringify(product) === JSON.stringify(payload),
      // );
      //
      // if (productInCart) {
      //   productInCart.quantity += payload.quantity;
      // } else {
      //   state.cart.push({ ...payload });
      // }
      //
      // state.totalQnt = state.cart.reduce((total, product) => {
      //   return total + product.quantity;
      // }, 0);
      //
      // state.totalPrice = state.cart.reduce((total, product) => {
      //   return total + product.totalPrice;
      // }, 0);

      state.cart.push(payload);
    },
    clearCart: (state: CartState) => {
      state.cart = [];
      state.totalQnt = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addProductToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
