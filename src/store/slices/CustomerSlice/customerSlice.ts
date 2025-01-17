import { Customer } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface CustomerState {
  selectedCustomer: Customer | null;
  selectedHistoryCustomer: Customer | null;
}

const initialState: CustomerState = {
  selectedCustomer: null,
  selectedHistoryCustomer: null,
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
    setSelectedHistoryCustomer: (state, { payload }) => {
      state.selectedHistoryCustomer = payload;
    },
    clearSelectedHistoryCustomer: (state) => {
      state.selectedHistoryCustomer = null;
    },
  },
});

export const {
  selectCustomer,
  clearSelectedCustomer,
  setSelectedHistoryCustomer,
  clearSelectedHistoryCustomer,
} = customerSlice.actions;

export default customerSlice.reducer;
