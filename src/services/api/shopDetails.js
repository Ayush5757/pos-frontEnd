import { getRequest, postRequest } from "../axios";

export const getShopDetail = async () =>{
    const res = await getRequest({endPoint:'/getShopDatils'});
    return res;
}
export const addShopDetail = async (payload) =>{
    const res = await postRequest({endPoint:'/addShopDetails',body: payload});
    return res;
}