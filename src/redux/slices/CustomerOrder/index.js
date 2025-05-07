import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CustomerOrder: {},
};

export const CustomerOrderReduser = createSlice({
  name: "CustomerOrder",
  initialState,
  reducers: {
    AddCustomerOrder: (state, action) => {
      if (state?.CustomerOrder?.inventories) {
        state.CustomerOrder.inventories.push(action.payload?.inventories[0])
      }else{
        state.CustomerOrder = action.payload 
      }
    },
    RemoveCustomerOrder: (state, action) => {
      let index = action.payload;
      if (state.CustomerOrder && state.CustomerOrder.inventories) {
        state.CustomerOrder.inventories = state.CustomerOrder.inventories.filter(
          (item, array_index) => array_index !== index
        );
      }
    },
    AddCustomerInfo: (state, action) => {
      let customerInformation = action.payload;
      state.CustomerOrder = {...state.CustomerOrder ,customer:customerInformation};
    },
    RemoveAllInventories: (state, action) => {
      state.CustomerOrder.inventories = [];
    },
  },
});

export const { AddCustomerOrder,RemoveCustomerOrder,AddCustomerInfo,RemoveAllInventories } = CustomerOrderReduser.actions;
export default CustomerOrderReduser.reducer;
