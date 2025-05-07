import { getRequest, postRequest } from "../axios";

export const complete_fast_inventorie = async (payload) =>{
    const res = await postRequest({endPoint:'/inventorie/fast/inventorie/complete',body: payload});
    return res;
}

export const save_fast_inventorie = async (payload) =>{
    const res = await postRequest({endPoint:'/inventorie/fast/inventorie/save',body: payload});
    return res;
}

export const get_fast_orders_inventories_list = async () =>{
    const res = await getRequest({endPoint:'/inventorie/fast/inventorie/get/fastOrders/list'});
    return res;
}
export const cancel_fast_inventorie = async (payload) =>{
    const res = await postRequest({endPoint:'/fastinventorie/fast/inventorie/cancel/fastOrders',body: payload});
    return res;
}
export const complete_by_fast_inventorie = async (payload) =>{
    const res = await postRequest({endPoint:'/fastinventorie/fast/inventorie/completeby/fastOrders',body: payload});
    return res;
}
export const send_kot_to_kitchen = async (payload) =>{
    console.log('payload',payload);
    const res = await postRequest({endPoint:'/inventorie/fastorderkot/send/to/kitchen',body: payload});
    return res;
}
