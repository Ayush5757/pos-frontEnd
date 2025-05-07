import { getRequest, postRequest } from "../axios";

export const addShopDetails = async (payload) =>{
    const res = await postRequest({endPoint:'/addShopDetails',body: payload});
    return res;
}
export const getShopDetails = async (payload) =>{
    const res = await getRequest({endPoint:`/getShopDetails/${payload}`});
    return res;
}