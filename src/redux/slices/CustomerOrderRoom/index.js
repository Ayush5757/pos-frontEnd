import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CustomerOrderRoom: {},
};

export const CustomerOrderRoomReduser = createSlice({
  name: "CustomerOrderRoom",
  initialState,
  reducers: {
    AddCustomerOrderRoom: (state, action) => {
      if (state?.CustomerOrderRoom?.inventories) {
        state.CustomerOrderRoom.inventories.push(action.payload?.inventories[0])
      }else{
        state.CustomerOrderRoom = action.payload 
      }
    },
    RemoveCustomerOrderRoom: (state, action) => {
      let index = action.payload;
      if (state.CustomerOrderRoom && state.CustomerOrderRoom.inventories) {
        state.CustomerOrderRoom.inventories = state.CustomerOrderRoom.inventories.filter(
          (item, array_index) => array_index !== index
        );
      }
    },
    AddCustomerInfoRoom: (state, action) => {
      let customerInformation = action.payload;
      state.CustomerOrderRoom = {...state.CustomerOrderRoom ,customer:customerInformation};
    },
    RemoveAllInventoriesRoom: (state, action) => {
      state.CustomerOrderRoom.inventories = [];
    },
  },
});

export const { AddCustomerOrderRoom,RemoveCustomerOrderRoom,AddCustomerInfoRoom,RemoveAllInventoriesRoom } = CustomerOrderRoomReduser.actions;
export default CustomerOrderRoomReduser.reducer;
