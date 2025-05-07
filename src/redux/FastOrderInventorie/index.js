import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  FastInventorieItems: {
    inventories: [],
    customer: {
      name: "",
      phone: "",
      address: "",
    },
    note: null,
  },
};

export const FastOrderInventorieReducer = createSlice({
  name: "FastInventorieItems",
  initialState,
  reducers: {
    AddFullInventorie: (state, action) => {
      state.FastInventorieItems = action?.payload;
    },
    AddFastInventorieItem: (state, action) => {
      let temp = {
        ...action.payload,
        qty: 1,
        plate_type: "1",
      };
      state.FastInventorieItems.inventories.push(temp);
    },

    AddChargesInFastInventory: (state, action) => {
      if (
        state.FastInventorieItems &&
        state.FastInventorieItems.addOnCharges &&
        Array.isArray(state.FastInventorieItems.addOnCharges)
      ) {
        state.FastInventorieItems.addOnCharges.push({
          charge_name: action.payload?.charge_name,
          charge_price: action.payload?.charge_price,
        });
      } else {
        state.FastInventorieItems.addOnCharges = [];
        state.FastInventorieItems.addOnCharges.push({
          charge_name: action.payload?.charge_name,
          charge_price: action.payload?.charge_price,
        });
      }
    },

    PaymentMethodFastOrder: (state, action) => {
      state.FastInventorieItems.paymentMethod = action?.payload?.paymentMethod;
    },

    RemoveAddOnChargesFastOrder: (state, action) => {
      state.FastInventorieItems.addOnCharges = [];
    },

    RemoveFastInventorieItem: (state, action) => {
      const updatedTableinventories =
        state.FastInventorieItems?.inventories?.filter(
          (_, index) => index !== action.payload
        );
      state.FastInventorieItems.inventories = updatedTableinventories;
    },
    ChangeQtyFastInventorie: (state, action) => {
      state.FastInventorieItems.inventories[action?.payload?.item_index].qty =
        action?.payload?.qty;
    },
    ChangePlateSizeFastInventorie: (state, action) => {
      state.FastInventorieItems.inventories[
        action?.payload?.item_index
      ].plate_type = action?.payload?.plate_type;
    },
    AddCustomerInfoFastInventorie: (state, action) => {
      if (!state.FastInventorieItems.customer) {
        state.FastInventorieItems.customer = {};
      }
      state.FastInventorieItems.customer[action?.payload?.field] =
        action?.payload?.value;
    },
    AddNoteFastInventorie: (state, action) => {
      state.FastInventorieItems.note = action?.payload;
    },
    RemoveEntireFastInventorie: (state, action) => {
      state.FastInventorieItems = {
        inventories: [],
        customer: {
          name: "",
          phone: "",
          address: "",
        },
        note: null,
      };
    },
    RemoveOnlineOrder: (state, action) => {
      state.FastInventorieItems.onlineOrder = 0;
    },
  },
});

export const {
  AddFastInventorieItem,
  RemoveFastInventorieItem,
  ChangeQtyFastInventorie,
  ChangePlateSizeFastInventorie,
  AddCustomerInfoFastInventorie,
  AddNoteFastInventorie,
  RemoveEntireFastInventorie,
  AddFullInventorie,
  RemoveOnlineOrder,
  AddChargesInFastInventory,
  RemoveAddOnChargesFastOrder,
  PaymentMethodFastOrder
} = FastOrderInventorieReducer.actions;
export default FastOrderInventorieReducer.reducer;
