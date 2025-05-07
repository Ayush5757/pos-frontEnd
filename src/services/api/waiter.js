import {  getWaiterRequest, postRequest, postWaiterRequest } from "../axios";


export const waiter_login_API = async (payload) =>{
    const res = await postWaiterRequest({endPoint:'/waiter/login',body: payload});
    return res;
}
export const getWaiterUser = async (payload) =>{
    const res = await postRequest({endPoint:'/waiter/shop/users/getuser',body: payload});
    return res;
}
export const Delete_User_Waiter_API = async (payload) =>{
    const res = await postRequest({endPoint:'/waiter/shop/users/delete',body: payload});
    return res;
}

export const waiter_User_Create_API = async (payload) =>{
    const res = await postRequest({endPoint:'/waiter/shop/user/create',body: payload});
    return res;
}

// - Table
export const getTableAPIWaiter = async (payload) =>{
    const res = await postWaiterRequest({endPoint:'/waiter/table/getTables',body: payload});
    return res;
}
export const getisUserValidWaiter = async () =>{
    const res = await getWaiterRequest({endPoint:'/waiter/table/isWaiterValid'});
    return res;
}
//  Waiter Inventories

export const getMenuItemsWaiter = async (catID,searchItem) =>{
    const res = await getWaiterRequest({endPoint:`/waiter/inventorie/getMenu?catID=${catID}${searchItem ? `&searchItem=${searchItem}`:''}`});
    return res;
}
export const getCategoriesWaiter = async (c) =>{
    const res = await getWaiterRequest({endPoint:`/waiter/inventorie/getCategories`});
    return res;
}
export const save_order_table_inventries_API_Waiter = async (payload) =>{
    const res = await postWaiterRequest({endPoint:'/waiter/inventoriesave/save',body: payload});
    return res;
}

export const inventries_fetch_by_tableid_API_Waiter = async (payload)=>{
    const res = await postWaiterRequest({endPoint:'/waiter/inventorie/inventries_fetch_by_tableid_API_Waiter',body: payload});
    return res;
}

