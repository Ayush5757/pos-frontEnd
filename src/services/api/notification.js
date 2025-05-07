import { getRequest, postRequest } from "../axios";


export const getIsTableBooked = async ({shopID, tableID, tableName, tableTypeID}) =>{
    const res = await getRequest({endPoint:`/user/notification/tableBooking?shopID=${shopID}&tableID=${tableID}&tableName=${tableName}&tableTypeID=${tableTypeID}`});
    return res;
}

export const getLatestOrders = async ({shopID}) =>{
    const res = await getRequest({endPoint:`/orderInventorieRoutes/get/newOrder?shopID=${shopID}`});
    return res;
}
export const save_order_table_inventries_API = async (payload) =>{
    const res = await postRequest({endPoint:'/inventorie/save',body: payload});
    return res;
}
export const add_customer_order_to_table = async (payload) =>{
    const res = await postRequest({endPoint:'/orderInventorieRoutes/change/orderlocation/inventorie',body: payload});
    return res;
}
export const delete_customer_order_to_table = async (payload) =>{
    const res = await postRequest({endPoint:'/orderInventorieRoutes/change/orderlocation/inventorie/delete',body: payload});
    return res;
}
export const getAlreadyOrderedItems = async (payload) =>{
    const res = await postRequest({endPoint:'/user/notification/get/alreadyorderd/items',body: payload});
    return res;
}

export const getPendingOrderedItems = async (payload) =>{
    const res = await postRequest({endPoint:'/user/notification/get/pendingordered/pendingitems',body: payload});
    return res;
}

export const addToExistingOrder = async (payload) =>{
    const res = await postRequest({endPoint:'/orderInventorieRoutes/add/to/existingorder',body: payload});
    return res;
}

export const save_by_customer_order_inventrie_with_OTP = async (payload) =>{
    const res = await postRequest({endPoint:'/orderInventorieRoutes/savewithotp/newOrder',body: payload});
    return res;
}
export const save_by_customer_order_inventrie = async (payload) =>{
    const res = await postRequest({endPoint:'/orderInventorieRoutes/save/newOrder',body: payload});
    return res;
}
export const send_OTP_info_API = async (payload) =>{
    const res = await postRequest({endPoint:'/orderInventorieRoutes/otp/sender',body: payload});
    return res;
}
