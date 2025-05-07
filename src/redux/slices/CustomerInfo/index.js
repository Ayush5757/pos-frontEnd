import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CustomerInfo: [],
};

export const CustomerInfoReduser = createSlice({
  name: "CustomerInfo",
  initialState,
  reducers: {
 
    AddCustomerInfo:(state, action)=>{
        state.CustomerInfo.customerName = action.payload?.info?.customerName;
        state.CustomerInfo.customerPhone = action.payload?.info?.customerPhone;
        state.CustomerInfo.customerAddress = action.payload?.info?.customerAddress;
    },
    RemoveCustomerInfo:(state, action)=>{
        state.CustomerInfo.customerName = action.payload?.info?.customerName;
        state.CustomerInfo.customerPhone = action.payload?.info?.customerPhone;
        state.CustomerInfo.customerAddress = action.payload?.info?.customerAddress;
    },
  },
});

export const { AddCustomerInfo,RemoveCustomerInfo } = CustomerInfoReduser.actions;
export default CustomerInfoReduser.reducer;
