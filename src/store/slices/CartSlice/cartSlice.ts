import { createSlice } from "@reduxjs/toolkit";
import { CartProduct } from "@/types/types";

interface CartState {
  cart: CartProduct[];
  totalPrice: number;
  totalQnt: number;
  tax: number;
  karatsBreakdown: KaratsBreakdown[] | null;
  paid: number;
  balanceDue: number;
}

interface KaratsBreakdown {
  karats: string;
  quantity: number;
}

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
  totalQnt: 0,
  tax: 0,
  karatsBreakdown: null,
  paid: 0,
  balanceDue: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, { payload }) => {
      state.cart.push({ ...payload });
    },
    deleteProductFromCart: (state, { payload: sku }) => {
      state.cart = state.cart.filter((cart) => cart.sku !== sku);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    setTax: (state, { payload }) => {
      state.tax = payload;
    },
    setPaid: (state, { payload }) => {
      state.balanceDue = Number((state.totalPrice - payload).toFixed(2));
      state.paid = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) =>
        action.type.endsWith("addProductToCart") ||
        action.type.endsWith("deleteProductFromCart") ||
        action.type.endsWith("clearCart"),
      (state) => {
        state.totalPrice = state.cart.reduce(
          (total, product) => total + product.price,
          0,
        );
        state.totalQnt = state.cart.length;
        state.karatsBreakdown = state.cart.reduce<KaratsBreakdown[]>(
          (acc, product) => {
            const existingKarats = acc.find(
              (entry) => entry.karats === product.karats,
            );

            if (existingKarats) {
              existingKarats.quantity++;
            } else {
              acc.push({ karats: product.karats, quantity: 1 });
            }
            return acc;
          },
          [],
        );
      },
    );
  },
});

export const {
  addProductToCart,
  clearCart,
  deleteProductFromCart,
  setTax,
  setPaid,
} = cartSlice.actions;

export default cartSlice.reducer;
