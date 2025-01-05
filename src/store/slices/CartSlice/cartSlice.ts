import { createSlice } from "@reduxjs/toolkit";
import { CartProduct, Product } from "@/types/types";
import { mockProduct } from "../../../../mocks/mockProduct";

interface CartState {
  cart: CartProduct[];
  totalPrice: number;
  totalQnt: number;
  karatsBreakdown: KaratsBreakdown[] | null;
  tempFilters: Product[];
}

interface KaratsBreakdown {
  karats: string;
  quantity: number;
}

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
  totalQnt: 0,
  karatsBreakdown: null,
  tempFilters: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, { payload }) => {
      state.cart.push({ ...payload });
    },
    deleteProductFromCart: (state, { payload: id }) => {
      state.cart = state.cart.filter((cart) => cart.id !== id);
    },
    clearCart: (state) => {
      state.cart = [];
    },

    addTempFilters: (state, { payload }) => {
      state.tempFilters = mockProduct.filter((product) => {
        return Object.entries(payload).every(([key, value]) => {
          if (!value) return true;
          return product[key]
            ?.toString()
            .toLowerCase()
            .includes(value.toString().toLowerCase());
        });
      });
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
  addTempFilters,
} = cartSlice.actions;

export default cartSlice.reducer;
