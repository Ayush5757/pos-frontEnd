import { configureStore } from '@reduxjs/toolkit'
import  InventoryReducer  from './slices/InventorySelectedItem'
import  TablesReduser  from './slices/Tables'
import  CustomerInfoReduser  from './slices/CustomerInfo'
import  CustomerOrderReduser  from './slices/CustomerOrder'
import  FastOrderInventorieReducer  from './FastOrderInventorie'
import  socketReduser  from './socket'
import  RoomsReduser from './slices/Rooms'
import  RoomInventoryReducer  from './slices/RoomInventorySelectedItem'
import CustomerOrderRoomReduser from './slices/CustomerOrderRoom'
// import thunk from 'redux-thunk'
export const store = configureStore({
  reducer: {
    TablesReduser: TablesReduser,
    InventoryReducer: InventoryReducer,
    CustomerInfoReduser: CustomerInfoReduser,
    CustomerOrderReduser: CustomerOrderReduser,
    FastOrderInventorieReducer: FastOrderInventorieReducer,
    socketReduser: socketReduser,
    // ------------------------
    RoomsReduser: RoomsReduser,
    RoomInventoryReducer: RoomInventoryReducer,
    CustomerOrderRoomReduser: CustomerOrderRoomReduser,
  },
  // middleware: [thunk],
})