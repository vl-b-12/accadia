import { Customer } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface CustomerState {
  selectedCustomer: Customer | null;
}

const initialState: CustomerState = {
  selectedCustomer: null,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    selectCustomer: (state, { payload }) => {
      state.selectedCustomer = payload;
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },
  },
});

export const { selectCustomer, clearSelectedCustomer } = customerSlice.actions;

export default customerSlice.reducer;
