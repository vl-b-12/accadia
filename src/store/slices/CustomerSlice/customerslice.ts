import { createSlice } from "@reduxjs/toolkit";
import { Customer } from "@/types/types";
import { mockCustomers } from "../../../../mocks/mockCustomers";

interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;
}

const initialState: CustomerState = {
  customers: mockCustomers,
  selectedCustomer: null,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    selectCustomer: (state, { payload }) => {
      state.selectedCustomer = payload;
    },
    addCustomer: (state, { payload }) => {
      state.customers.push({
        ...payload,
        id: state.customers[state.customers.length - 1].id + 1,
      });
    },
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },
  },
});

export const { selectCustomer, clearSelectedCustomer, addCustomer } =
  customerSlice.actions;

export default customerSlice.reducer;
