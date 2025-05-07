import { getRequest, postRequest } from "../axios";

export const addShopProducts = async (payload) =>{
    const res = await postRequest({endPoint:'/food/add',body: payload});
    return res;
}

export const getShopProducts = async (payload,page) =>{
    const res = await getRequest({endPoint:`/food/getfoods/${payload}/${page}`});
    return res;
}
export const getPaginatedCategories = async (payload,page) =>{
    const res = await getRequest({endPoint:`/food/getPaginatedCategories?shopID=${payload}&page=${page}`});
    return res;
}

export const getPaginatedFoodData = async (payload,categorie_id) =>{
    const res = await getRequest({endPoint:`/food/getPaginatedFoodData?shopID=${payload}&categorie_id=${categorie_id}`});
    return res;
}

export const delete_product = async (payload) =>{
    const res = await postRequest({endPoint:'/food/delete/product',body: payload});
    return res;
}

export const getShopRooms = async (shop_id,currentPage,searchItem) =>{
    const res = await getRequest({endPoint:`/food/room/getrooms/${shop_id}/${currentPage}${searchItem?'/'+searchItem:''}`});
    return res;
}
export const getShopRoomsLimited = async (shop_id,currentPage,searchItem) =>{
    const res = await getRequest({endPoint:`/food/room/getroomsLimited/${shop_id}`});
    return res;
}
export const delete_room = async (payload) =>{
    const res = await postRequest({endPoint:'/food/delete/room',body: payload});
    return res;
}
export const update_product = async (payload) =>{
    const res = await postRequest({endPoint:'/food/update',body: payload});
    return res;
}
export const save_title = async (payload) =>{
    const res = await postRequest({endPoint:'/food/room/title/save',body: payload});
    return res;
}