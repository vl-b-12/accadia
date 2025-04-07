import { createSlice } from "@reduxjs/toolkit";
import { CartProduct } from "@/types/types";

interface CartState {
  cart: CartProduct[];
  totalPrice: number;
  taxPercent: number;
  totalQnt: number;
  tax: number;
  karatsBreakdown: KaratsBreakdown[] | null;
  paid: number;
  balanceDue: number;
  grandTotal: number;
  discount: number;
}

interface KaratsBreakdown {
  karats: string;
  quantity: number;
}

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
  totalQnt: 0,
  taxPercent: 0,
  tax: 0,
  karatsBreakdown: null,
  paid: 0,
  balanceDue: 0,
  grandTotal: 0,
  discount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, { payload }) => {
      state.cart.push({ ...payload, id: state.cart.length + 1 });
    },
    deleteProductFromCart: (state, { payload: sku }) => {
      state.cart = state.cart.filter((cart) => cart.sku !== sku);
    },
    clearCart: () => initialState,
    setTax: (state, { payload }) => {
      state.tax = Number(payload);
    },
    setTaxPercent: (state, { payload }) => {
      state.taxPercent = Number(payload);
    },
    setPaid: (state, { payload }) => {
      state.balanceDue = Number((state.grandTotal - payload).toFixed(2));
      state.paid = payload;
    },
    setBalanceDue: (state, { payload }) => {
      state.balanceDue = Number(payload);
    },
    setGrandTotal: (state, { payload }) => {
      state.grandTotal = Number(payload);
    },
    setDiscount: (state, { payload }) => {
      state.discount = Number(payload);
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
        state.balanceDue = state.totalPrice + state.tax;
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
  setBalanceDue,
  setGrandTotal,
  setDiscount,
  setTaxPercent,
} = cartSlice.actions;

export default cartSlice.reducer;
