import { createSlice } from "@reduxjs/toolkit";
import { shoeNotification } from "../../../components/Notify";

const initialState = {
  Tables: [],
};

export const TablesReduser = createSlice({
  name: "Tables",
  initialState,
  reducers: {
    AddTables: (state, action) => {
      state.Tables = [...action.payload];
    },
    
    RemoveEntireTable: (state, action) =>{
      state.Tables = [];
    },

    table_order_confirm: (state, action)=>{
      const table_type_matched_index = state.Tables.findIndex(
        (item) => item?.table_type_id === action?.payload?.table_type_id
      );
      const table_data_matched_index = state.Tables[table_type_matched_index]?.table_data.findIndex(
        (item) => item?._id === action?.payload?.table_id
      );
      if(table_type_matched_index !== -1 && table_type_matched_index !== -1){
        state.Tables[table_type_matched_index].table_data[table_data_matched_index].orderID = null;
        state.Tables[table_type_matched_index].table_data[table_data_matched_index].total = 0;
      }
    },

    table_order_added:(state, action)=>{
      console.log('table_order_added',action.payload);
      const table_type_matched_index = state.Tables.findIndex(
        (item) => item?.table_type_id === action?.payload?.table_type_id
      );
      const table_data_matched_index = state.Tables[table_type_matched_index]?.table_data.findIndex(
        (item) => item?._id === action?.payload?.table_id
      );
      if(table_type_matched_index !== -1 && table_type_matched_index !== -1){
        state.Tables[table_type_matched_index].table_data[table_data_matched_index].orderID = action.payload?.order_id;
        state.Tables[table_type_matched_index].table_data[table_data_matched_index].total = action.payload?.total;
      }
    },

// -----------------------------------------------
    BookingTable: (state,action) => {
      console.log("actionsssrr",action.payload);
      const matchedIndex = state.Tables.findIndex((val)=> val.id === action.payload.tableID)
      state.Tables[matchedIndex].booked = 1;
      state.Tables[matchedIndex].total = action.payload.totalAmount;
      shoeNotification('success','Table Booked');
      console.log('matchedIndex',matchedIndex);
    },
    AddTableCustomerInfo:(state, action)=>{
      console.log("action.payload?.customerName",action?.payload);
      const matchedIndex = state.Tables.findIndex((val)=> val.id === action.payload.tableID)
      if(matchedIndex>=0){
        state.Tables[matchedIndex].customerName = action.payload?.info?.customerName;
        state.Tables[matchedIndex].customerPhone = action.payload?.info?.customerPhone;
        state.Tables[matchedIndex].customerAddress = action.payload?.info?.customerAddress;
      }
    },
    ConfirmTable: (state,action) => {
      const matchedIndex = state.Tables.findIndex((val)=> val.id === action.payload)
      state.Tables[matchedIndex].booked = 0;
      state.Tables[matchedIndex].total = 0;
      shoeNotification('success','Bill Confirmed');
    },

    AcceptedFromNotification: (state,action) => {
      const table_type_matched_index = state.Tables.findIndex(
        (item) => item?.table_type_id === action?.payload?.table?.table_type_id
      );
      const table_data_matched_index = state.Tables[table_type_matched_index]?.table_data.findIndex(
        (item) => item?._id === action?.payload?.table?.tableID
      );
      if(table_type_matched_index !== -1 && table_type_matched_index !== -1){
        if(!state.Tables[table_type_matched_index].table_data[table_data_matched_index].orderID){
          state.Tables[table_type_matched_index].table_data[table_data_matched_index].orderID = action?.payload?.order_id;
        }
        state.Tables[table_type_matched_index].table_data[table_data_matched_index].total = action?.payload?.total + ((action?.payload?.total * 18 ) / 100);
      }
    }
  },
});

export const { AddTables,BookingTable,AcceptedFromNotification,ConfirmTable,AddTableCustomerInfo,table_order_confirm,table_order_added,RemoveEntireTable } = TablesReduser.actions;
export default TablesReduser.reducer;
