import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export const counterSlice = createSlice({
  name: "counterss",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});


export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer