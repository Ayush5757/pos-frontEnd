import { getRequest, postRequest } from "../axios";

export const getIsroomBooked = async ({ roomID, shopID,roomName,roomTypeID }) => {
  const res = await getRequest({
    endPoint: `/user/roomnotification/roomBooking?shopID=${shopID}&roomID=${roomID}&roomName=${roomName}&roomTypeID=${roomTypeID}`,
  });
  return res;
};

export const getLatestroomOrders = async ({shopID}) =>{
    const res = await getRequest({endPoint:`/roomorderInventorieRoutes/get/newOrder?shopID=${shopID}`});
    return res;
}
export const save_room_order_table_inventries_API = async (payload) =>{
    const res = await postRequest({endPoint:'/roominventorie/save',body: payload});
    return res;
}
export const add_customer_room_order_to_table = async (payload) =>{
    const res = await postRequest({endPoint:'/roomorderInventorieRoutes/change/orderlocation/inventorie',body: payload});
    return res;
}
export const delete_customer_room_order_to_table = async (payload) =>{
    const res = await postRequest({endPoint:'/roomorderInventorieRoutes/change/orderlocation/inventorie/delete',body: payload});
    return res;
}

export const getAlreadyOrderedroomItems = async (payload) =>{
    const res = await postRequest({endPoint:'/user/roomnotification/get/alreadyorderd/items',body: payload});
    return res;
}

export const getPendingOrderedroomItems = async (payload) =>{
    const res = await postRequest({endPoint:'/user/roomnotification/get/pendingordered/pendingitems',body: payload});
    return res;
}

export const addToExistingroomOrder = async (payload) =>{
    const res = await postRequest({endPoint:'/roomorderInventorieRoutes/add/to/existingorder',body: payload});
    return res;
}

export const save_by_customer_order_inventrie_with_OTP = async (payload) =>{
    const res = await postRequest({endPoint:'/roomorderInventorieRoutes/savewithotp/newOrder',body: payload});
    return res;
}

export const save_by_customer_order_room_inventrie = async (payload) =>{
    const res = await postRequest({endPoint:'/roomorderInventorieRoutes/save/newOrder',body: payload});
    return res;
}
export const send_OTP_info_room_API = async (payload) =>{
    const res = await postRequest({endPoint:'/roomorderInventorieRoutes/otp/sender',body: payload});
    return res;
}
