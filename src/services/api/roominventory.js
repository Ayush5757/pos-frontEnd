import { getRequest, postRequest } from "../axios";


export const getMenuItems = async (shopID,catID) =>{
    const res = await getRequest({endPoint:`/food/MenuItems?shopID=${shopID}&catID=${catID}`});
    return res;
}

export const save_order_room_inventries_API = async (payload) =>{
    const res = await postRequest({endPoint:'/roominventorie/save',body: payload});
    return res;
}
export const confirm_order_room_inventries_API = async (payload) =>{
    const res = await postRequest({endPoint:'/roominventorie/confirmOrder',body: payload});
    return res;
}

export const room_inventries_fetch_by_roomid_API = async (payload)=>{
    const res = await postRequest({endPoint:'/roominventorie/roominventries_fetch_by_roomid_API',body: payload});
    return res;
}

export const room_KOT_Send_to_Kitchen = async (payload) =>{
    const res = await postRequest({endPoint:'/roominventorie/kot/send/to/kitchen',body: payload});
    return res;
}


