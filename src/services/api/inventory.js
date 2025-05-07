import { getRequest, postRequest } from "../axios";


export const getMenuItems = async (shopID,catID,searchItem) =>{
    const res = await getRequest({endPoint:`/food/MenuItems?shopID=${shopID}&catID=${catID}${searchItem ? `&searchItem=${searchItem}`:''}`});
    return res;
}

export const save_order_table_inventries_API = async (payload) =>{
    const res = await postRequest({endPoint:'/inventorie/save',body: payload});
    return res;
}
export const confirm_order_table_inventries_API = async (payload) =>{
    const res = await postRequest({endPoint:'/inventorie/confirmOrder',body: payload});
    return res;
}

export const inventries_fetch_by_tableid_API = async (payload)=>{
    const res = await postRequest({endPoint:'/inventorie/inventries_fetch_by_tableid_API',body: payload});
    return res;
}

export const KOT_Send_to_Kitchen = async (payload) =>{
    const res = await postRequest({endPoint:'/inventorie/kot/send/to/kitchen',body: payload});
    return res;
}


