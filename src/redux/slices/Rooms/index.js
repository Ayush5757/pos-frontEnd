import { createSlice } from "@reduxjs/toolkit";
import { shoeNotification } from "../../../components/Notify";

const initialState = {
  Rooms: [],
};

export const RoomsReduser = createSlice({
  name: "Rooms",
  initialState,
  reducers: {
    AddRooms: (state, action) => {
      state.Rooms = [...action.payload];
    },
    room_order_confirm: (state, action)=>{
      const room_type_matched_index = state.Rooms.findIndex(
        (item) => item?.room_type_id === action?.payload?.room_type_id
      );
      const room_data_matched_index = state.Rooms[room_type_matched_index]?.room_data.findIndex(
        (item) => item?._id === action?.payload?.room_id
      );
      if(room_type_matched_index !== -1 && room_type_matched_index !== -1){
        state.Rooms[room_type_matched_index].room_data[room_data_matched_index].orderID = null;
        state.Rooms[room_type_matched_index].room_data[room_data_matched_index].total = 0;
      }
    },

    room_order_added:(state, action)=>{
      const room_type_matched_index = state.Rooms.findIndex(
        (item) => item?.room_type_id === action?.payload?.room_type_id
      );
      const room_data_matched_index = state.Rooms[room_type_matched_index]?.room_data.findIndex(
        (item) => item?._id === action?.payload?.room_id
      );
      if(room_type_matched_index !== -1 && room_type_matched_index !== -1){
        state.Rooms[room_type_matched_index].room_data[room_data_matched_index].orderID = action.payload?.order_id;
        state.Rooms[room_type_matched_index].room_data[room_data_matched_index].total = action.payload?.total;
      }
    },

// -----------------------------------------------
    BookingRoom: (state,action) => {
      const matchedIndex = state.Rooms.findIndex((val)=> val.id === action.payload.roomID)
      state.Rooms[matchedIndex].booked = 1;
      state.Rooms[matchedIndex].total = action.payload.totalAmount;
      shoeNotification('success','Room Booked');
      console.log('matchedIndex',matchedIndex);
    },
    AddRoomCustomerInfo:(state, action)=>{
      const matchedIndex = state.Rooms.findIndex((val)=> val.id === action.payload.roomID)
      if(matchedIndex>=0){
        state.Rooms[matchedIndex].customerName = action.payload?.info?.customerName;
        state.Rooms[matchedIndex].customerPhone = action.payload?.info?.customerPhone;
        state.Rooms[matchedIndex].customerAddress = action.payload?.info?.customerAddress;
      }
    },
    ConfirmRoom: (state,action) => {
      const matchedIndex = state.Rooms.findIndex((val)=> val.id === action.payload)
      state.Rooms[matchedIndex].booked = 0;
      state.Rooms[matchedIndex].total = 0;
      shoeNotification('success','Room Bill Confirmed');
    },

    AcceptedFromNotificationRoom: (state,action) => {
      const room_type_matched_index = state.Rooms.findIndex(
        (item) => item?.room_type_id === action?.payload?.room?.room_type_id
      );
      const room_data_matched_index = state.Rooms[room_type_matched_index]?.room_data.findIndex(
        (item) => item?._id === action?.payload?.room?.roomID
      );
      if(room_type_matched_index !== -1 && room_type_matched_index !== -1){
        if(!state.Rooms[room_type_matched_index].room_data[room_data_matched_index].orderID){
          state.Rooms[room_type_matched_index].room_data[room_data_matched_index].orderID = action?.payload?.order_id;
        }
        state.Rooms[room_type_matched_index].room_data[room_data_matched_index].total = action?.payload?.total + ((action?.payload?.total * 18 ) / 100);
      }
    }
  },
});

export const { AddRooms,BookingRoom,AcceptedFromNotificationRoom,ConfirmRoom,AddRoomCustomerInfo,room_order_confirm,room_order_added } = RoomsReduser.actions;
export default RoomsReduser.reducer;
