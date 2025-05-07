import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SelectedItems: [],
};

export const RoomInventoryReducer = createSlice({
  name: "RoomInventory",
  initialState,
  reducers: {
    AddItemsInInventory: (state, action) => {
      if (action?.payload?.room?.roomID) {
        const room_matched_index = state.SelectedItems.findIndex(
          (item) => item.room?.roomID === action?.payload?.room?.roomID
        );
        if (action.payload?.api) {
          if (room_matched_index !== -1) {
            state.SelectedItems[room_matched_index] = action.payload;
          } else {
            state.SelectedItems.push(action.payload);
          }
        } else {
          if (room_matched_index !== -1) {
            state.SelectedItems[room_matched_index]?.inventories.push({
              item_name: action.payload?.item_name,
              qty: 1,
              plate_type: "1",
              half_price: action.payload?.half_price,
              item_id: action.payload?._id,
              price: action.payload?.price,
            });
          } else {
            let temp = {
              room: {
                ...action?.payload?.room,
              },
              customer: {
                name: "",
                address: "",
                phone: "",
              },
              inventories: [
                {
                  item_name: action.payload?.item_name,
                  qty: 1,
                  plate_type: "1",
                  half_price: action.payload?.half_price,
                  item_id: action.payload?._id,
                  price: action.payload?.price,
                },
              ],
              note: "",
              order_status: 1,
            };
            state.SelectedItems.push(temp);
          }
        }
      }
    },

    AddRoomChargesInInventory: (state, action) => {
      if (action?.payload?.room?.roomID) {
        const room_matched_index = state.SelectedItems.findIndex(
          (item) => item.room?.roomID === action?.payload?.room?.roomID
        );
        if (room_matched_index !== -1) {
          if (
            state.SelectedItems[room_matched_index] &&
            state.SelectedItems[room_matched_index].addOnCharges &&
            Array.isArray(state.SelectedItems[room_matched_index].addOnCharges)
          ) {
            if (action?.payload?.charge_name && action.payload?.charge_price) {
              state.SelectedItems[room_matched_index].addOnCharges.push({
                charge_name: action.payload?.charge_name,
                charge_price: action.payload?.charge_price,
              });
            }
          } else {
            if (action?.payload?.charge_name && action.payload?.charge_price) {
              state.SelectedItems[room_matched_index].addOnCharges = [];
              state.SelectedItems[room_matched_index].addOnCharges.push({
                charge_name: action.payload?.charge_name,
                charge_price: action.payload?.charge_price,
              });
            }
          }
        }
      }
    },

    RoomAmountAdded:(state, action) =>{
      if (action?.payload?.room?.roomID) {
        const room_matched_index = state.SelectedItems.findIndex(
          (item) => item.room?.roomID === action?.payload?.room?.roomID
        );
        if (room_matched_index !== -1) {
          state.SelectedItems[room_matched_index].roomPrice = action?.payload?.price
        }else{
          let temp = {
            room: {
              ...action?.payload?.room,
            },
            customer: {
              name: "",
              address: "",
              phone: "",
            },
            inventories: [],
            note: "",
            order_status: 1,
            roomPrice: action?.payload?.price
          };
          state.SelectedItems.push(temp);
        }
      }
    },

    PaymentMethodRoom:(state, action) =>{
      if (action?.payload?.room?.roomID) {
        const room_matched_index = state.SelectedItems.findIndex(
          (item) => item.room?.roomID === action?.payload?.room?.roomID
        );
        if (room_matched_index !== -1) {
          state.SelectedItems[room_matched_index].paymentMethod = action?.payload?.paymentMethod
        }else{
          let temp = {
            room: {
              ...action?.payload?.room,
            },
            customer: {
              name: "",
              address: "",
              phone: "",
            },
            inventories: [],
            note: "",
            order_status: 1,
            paymentMethod: action?.payload?.paymentMethod
          };
          state.SelectedItems.push(temp);
        }
      }
    },

    RemoveRoomAddOnCharges: (state, action) => {
      console.log("action?.payload", action?.payload);
      if (action?.payload?.roomID) {
        const room_matched_index = state.SelectedItems.findIndex(
          (item) => item.room?.roomID === action?.payload?.roomID
        );
        if (room_matched_index !== -1) {
          state.SelectedItems[room_matched_index].addOnCharges = [];
        }
      }
    },

    remove_inventory_item: (state, action) => {
      if (action.payload?.roomID && action.payload?.item_index >= 0) {
        const room_matched_index = state.SelectedItems.findIndex(
          (item) => item.room?.roomID === action?.payload?.roomID
        );
        state.SelectedItems[room_matched_index].inventories?.splice(
          action.payload?.item_index,
          1
        );
      }
    },

    confirm_inventory: (state, action) => {
      console.log("confirm_inventory", action.payload);
      if (action.payload) {
        const room_matched_index = state.SelectedItems.findIndex(
          (item) => item.room?.roomID === action?.payload
        );
        if (room_matched_index !== -1) {
          state.SelectedItems.splice(room_matched_index, 1);
        }
      }
    },

    update_inventry_item_Qty: (state, action) => {
      console.log("action.payload", action.payload);
      const room_invetorie_matched_index = state.SelectedItems.findIndex(
        (item) => item.room?.roomID === action?.payload?.room_ID
      );
      console.log("room_invetorie_matched_index", room_invetorie_matched_index);
      state.SelectedItems[room_invetorie_matched_index].inventories[
        action?.payload?.item?.index
      ].qty = action.payload?.newQty;
    },

    delivered_inventry_item: (state, action) => {
      const room_invetorie_matched_index = state.SelectedItems.findIndex(
        (item) => item.room?.roomID === action?.payload?.room_ID
      );
      state.SelectedItems[room_invetorie_matched_index].inventories[
        action?.payload?.item?.index
      ].isDelivered = action?.payload?.item?.isDelivered;
    },

    update_inventry_item_Plate: (state, action) => {
      const room_invetorie_matched_index = state.SelectedItems.findIndex(
        (item) => item.room?.roomID === action?.payload?.room_ID
      );
      state.SelectedItems[room_invetorie_matched_index].inventories[
        action?.payload?.item?.index
      ].plate_type = action.payload?.plate_type;
    },

    // ----------------------------------------------------

    RemoveItemsInInventory: (state, action) => {
      const { roomID, itemIndex } = action.payload;
      const matchedIndex = state.SelectedItems.findIndex(
        (item) => item.roomID === roomID
      );
      if (matchedIndex !== -1) {
        const updatedRoomData = state.SelectedItems[
          matchedIndex
        ].roomData.filter(
          (_, index) =>
            state.SelectedItems[matchedIndex].roomData[index].id !== itemIndex
        );
        state.SelectedItems[matchedIndex].roomData = updatedRoomData;
      }
    },
    RemoveRoomFullDataInventory: (state, action) => {
      const roomID = action.payload;
      const matchedIndex = state.SelectedItems.findIndex(
        (item) => item.roomID === roomID
      );
      if (matchedIndex !== -1) {
        let data = state.SelectedItems.filter((val) => val?.roomID !== roomID);
        state.SelectedItems = [...data];
      }
    },
    updateInventryQty: (state, action) => {
      const {
        inventryChangedData: { roomID, id },
        updatedQty,
      } = action.payload;
      console.log("qty roomID", roomID);
      console.log("qty id", id);
      const matchedIndex = state.SelectedItems.findIndex(
        (item) => item.roomID === roomID
      );
      console.log("qty matchedIndex", matchedIndex);
      if (matchedIndex !== -1) {
        state.SelectedItems[matchedIndex].roomData.forEach((val, index) => {
          if (val?.id === id) {
            state.SelectedItems[matchedIndex].roomData[index].product_quantity =
              updatedQty;
          }
        });
      }
    },

    AddRoomNotes: (state, action) => {
      const { roomID, note } = action.payload;
      const matchedIndex = state.SelectedItems.findIndex(
        (item) => item.roomID === roomID
      );
      if (matchedIndex !== -1) {
        state.SelectedItems[matchedIndex].notes = note;
      }
    },

    AcceptedFromNotificationRoomInventorie: (state, action) => {
      const room_invetorie_matched_index = state.SelectedItems.findIndex(
        (item) => item.room?.roomID === action?.payload?.room?.roomID
      );
      if (room_invetorie_matched_index !== -1) {
        state.SelectedItems[room_invetorie_matched_index].inventories.push(
          ...action.payload?.inventories
        );
      } else {
        state.SelectedItems.push(action.payload);
      }
    },
  },
});

export const {
  AcceptedFromNotificationRoomInventorie,
  AddRoomNotes,
  updateInventryQty,
  RemoveRoomFullDataInventory,
  RemoveItemsInInventory,
  update_inventry_item_Plate,
  update_inventry_item_Qty,
  confirm_inventory,
  remove_inventory_item,
  AddItemsInInventory,
  delivered_inventry_item,
  AddRoomChargesInInventory,
  RemoveRoomAddOnCharges,
  RoomAmountAdded,
  PaymentMethodRoom
} = RoomInventoryReducer.actions;
export default RoomInventoryReducer.reducer;
