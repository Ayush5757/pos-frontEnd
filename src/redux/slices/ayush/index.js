import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ayushvalue: 0,
};

export const ayushSlice = createSlice({
  name: "ayushss",
  initialState,
  reducers: {
    increment: (state) => {
      state.ayushvalue += 1;
    },
    decrement: (state) => {
      state.ayushvalue -= 1;
    },
    incrementByAmount: (state, action) => {
      state.ayushvalue += action.payload;
    },
  },
});


export const { increment, decrement, incrementByAmount } = ayushSlice.actions;
export default ayushSlice.reducer