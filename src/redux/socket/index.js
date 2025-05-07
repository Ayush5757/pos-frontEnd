import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket:null 
};

export const socketReduser = createSlice({
  name: "socketReduser",
  initialState,

  reducers: {
    
    AddSocket: (state, action) => {
      state.socket = action.payload;
    },
}
});

export const { AddSocket } = socketReduser.actions;
export default socketReduser.reducer;
