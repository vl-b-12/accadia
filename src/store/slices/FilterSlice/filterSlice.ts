import { Filters } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  selectedFilters: Filters | null;
};

const initialState: InitialState = {
  selectedFilters: null,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    selectFilter: (state, { payload }) => {
      state.selectedFilters = payload;
    },
    clearSelectedFilters: (state) => {
      state.selectedFilters = null;
    },
  },
});

export const { selectFilter, clearSelectedFilters } = filterSlice.actions;

export default filterSlice.reducer;
