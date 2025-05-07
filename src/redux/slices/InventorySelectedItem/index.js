import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SelectedItems: [],
};

export const InventoryReducer = createSlice({
  name: "InventoryItems",
  initialState,
  reducers: {
    AddItemsInInventory: (state, action) => {
      if (action?.payload?.table?.tableID) {
        const table_matched_index = state.SelectedItems.findIndex(
          (item) => item.table?.tableID === action?.payload?.table?.tableID
        );
        if (action.payload?.api) {
          if (table_matched_index !== -1) {
            state.SelectedItems[table_matched_index] = action.payload;
          } else {
            state.SelectedItems.push(action.payload);
          }
        } else {
          if (table_matched_index !== -1) {
            state.SelectedItems[table_matched_index]?.inventories.push({
              item_name: action.payload?.item_name,
              qty: 1,
              plate_type: "1",
              half_price: action.payload?.half_price,
              item_id: action.payload?._id,
              price: action.payload?.price,
            });
          } else {
            let temp = {
              table: {
                ...action?.payload?.table,
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

    AddChargesInInventory: (state, action) => {
      if (action?.payload?.table?.tableID) {
        const table_matched_index = state.SelectedItems.findIndex(
          (item) => item.table?.tableID === action?.payload?.table?.tableID
        );
        if (table_matched_index !== -1) {
          if (
            state.SelectedItems[table_matched_index] &&
            state.SelectedItems[table_matched_index].addOnCharges &&
            Array.isArray(state.SelectedItems[table_matched_index].addOnCharges)
          ) {
            if (action?.payload?.charge_name && action.payload?.charge_price) {
            state.SelectedItems[table_matched_index].addOnCharges.push({
              charge_name: action.payload?.charge_name,
              charge_price: action.payload?.charge_price,
            });
          }
          } else {
            if (action?.payload?.charge_name && action.payload?.charge_price) {
              state.SelectedItems[table_matched_index].addOnCharges = [];
              state.SelectedItems[table_matched_index].addOnCharges.push({
                charge_name: action.payload?.charge_name,
                charge_price: action.payload?.charge_price,
              });
            }
          }
        }
      }
    },

    PaymentMethodTable:(state, action) =>{
      console.log('action',action.payload);
      if (action?.payload?.table_table?.tableID) {
        const table_matched_index = state.SelectedItems.findIndex(
          (item) => item.table?.tableID === action?.payload?.table_table?.tableID
        );
        if (table_matched_index !== -1) {
          state.SelectedItems[table_matched_index].paymentMethod = action?.payload?.paymentMethod
        }else{
          let temp = {
            table: {
              ...action?.payload?.table_table,
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

    RemoveAddOnCharges: (state, action) => {
      console.log("action?.payload", action?.payload);
      if (action?.payload?.tableID) {
        const table_matched_index = state.SelectedItems.findIndex(
          (item) => item.table?.tableID === action?.payload?.tableID
        );
        if (table_matched_index !== -1) {
          state.SelectedItems[table_matched_index].addOnCharges = [];
        }
      }
    },

    remove_inventory_item: (state, action) => {
      if (action.payload?.tableID && action.payload?.item_index >= 0) {
        const table_matched_index = state.SelectedItems.findIndex(
          (item) => item.table?.tableID === action?.payload?.tableID
        );
        state.SelectedItems[table_matched_index].inventories?.splice(
          action.payload?.item_index,
          1
        );
      }
    },

    confirm_inventory: (state, action) => {
      if (action.payload) {
        const table_matched_index = state.SelectedItems.findIndex(
          (item) => item.table?.tableID === action?.payload
        );
        if (table_matched_index !== -1) {
          state.SelectedItems.splice(table_matched_index, 1);
        }
      }
    },

    remove_inventory_of_table: (state, action) => {
      if (action.payload) {
        const table_matched_index = state.SelectedItems.findIndex(
          (item) => item.table?.tableID === action?.payload
        );
        if (table_matched_index !== -1) {
          state.SelectedItems.splice(table_matched_index, 1);
        }
      }
    },

    update_inventry_item_Qty: (state, action) => {
      const table_invetorie_matched_index = state.SelectedItems.findIndex(
        (item) => item.table?.tableID === action?.payload?.table_ID
      );
      console.log(
        "table_invetorie_matched_index",
        table_invetorie_matched_index
      );
      state.SelectedItems[table_invetorie_matched_index].inventories[
        action?.payload?.item?.index
      ].qty = action.payload?.newQty;
    },

    delivered_inventry_item: (state, action) => {
      const table_invetorie_matched_index = state.SelectedItems.findIndex(
        (item) => item.table?.tableID === action?.payload?.table_ID
      );
      state.SelectedItems[table_invetorie_matched_index].inventories[
        action?.payload?.item?.index
      ].isDelivered = action?.payload?.item?.isDelivered;
    },

    update_inventry_item_Plate: (state, action) => {
      const table_invetorie_matched_index = state.SelectedItems.findIndex(
        (item) => item.table?.tableID === action?.payload?.table_ID
      );
      state.SelectedItems[table_invetorie_matched_index].inventories[
        action?.payload?.item?.index
      ].plate_type = action.payload?.plate_type;
    },

    // ----------------------------------------------------

    RemoveItemsInInventory: (state, action) => {
      const { tableID, itemIndex } = action.payload;
      const matchedIndex = state.SelectedItems.findIndex(
        (item) => item.tableID === tableID
      );
      if (matchedIndex !== -1) {
        const updatedTableData = state.SelectedItems[
          matchedIndex
        ].tableData.filter(
          (_, index) =>
            state.SelectedItems[matchedIndex].tableData[index].id !== itemIndex
        );
        state.SelectedItems[matchedIndex].tableData = updatedTableData;
      }
    },

    RemoveTableFullDataInventory: (state, action) => {
      const tableID = action.payload;
      const matchedIndex = state.SelectedItems.findIndex(
        (item) => item.tableID === tableID
      );
      if (matchedIndex !== -1) {
        let data = state.SelectedItems.filter(
          (val) => val?.tableID !== tableID
        );
        state.SelectedItems = [...data];
      }
    },
    updateInventryQty: (state, action) => {
      const {
        inventryChangedData: { tableID, id },
        updatedQty,
      } = action.payload;
      console.log("qty tableID", tableID);
      console.log("qty id", id);
      const matchedIndex = state.SelectedItems.findIndex(
        (item) => item.tableID === tableID
      );
      console.log("qty matchedIndex", matchedIndex);
      if (matchedIndex !== -1) {
        state.SelectedItems[matchedIndex].tableData.forEach((val, index) => {
          if (val?.id === id) {
            state.SelectedItems[matchedIndex].tableData[
              index
            ].product_quantity = updatedQty;
          }
        });
      }
    },

    AddTableNotes: (state, action) => {
      const { tableID, note } = action.payload;
      const matchedIndex = state.SelectedItems.findIndex(
        (item) => item.tableID === tableID
      );
      if (matchedIndex !== -1) {
        state.SelectedItems[matchedIndex].notes = note;
      }
    },

    AcceptedFromNotificationInventorie: (state, action) => {
      const table_invetorie_matched_index = state.SelectedItems.findIndex(
        (item) => item.table?.tableID === action?.payload?.table?.tableID
      );
      if (table_invetorie_matched_index !== -1) {
        state.SelectedItems[table_invetorie_matched_index].inventories.push(
          ...action.payload?.inventories
        );
      } else {
        state.SelectedItems.push(action.payload);
      }
    },
  },
});

export const {
  AddItemsInInventory,
  remove_inventory_item,
  AddTableNotes,
  RemoveTableFullDataInventory,
  updateInventryQty,
  unKnownInventries,
  confirm_inventory,
  update_inventry_item_Qty,
  update_inventry_item_Plate,
  AcceptedFromNotificationInventorie,
  delivered_inventry_item,
  remove_inventory_of_table,
  AddChargesInInventory,
  RemoveAddOnCharges,
  PaymentMethodTable
} = InventoryReducer.actions;
export default InventoryReducer.reducer;
