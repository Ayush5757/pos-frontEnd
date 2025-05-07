import { postRequest,getRequest } from "../axios";

export const createTableAPI = async (payload) =>{
    const res = await postRequest({endPoint:'/table/addTable',body: payload});
    return res;
}
export const getTableAPI = async () =>{
    const res = await postRequest({endPoint:'/table/getTables'});
    return res;
}
export const confirmTableInventory = async (payload) =>{
    const res = await postRequest({endPoint:'/confirmTableInventory',body: payload});
    return res;
}
export const createTableSectionAPI = async (payload) =>{
    const res = await postRequest({endPoint:'/table/createTableSectionAPI',body: payload});
    return res;
}
export const getTablesSections = async () =>{
    const res = await postRequest({endPoint:'/table/getSections'});
    return res;
}
export const workingTableStatusChangeAPI = async (payload) =>{
    const res = await postRequest({endPoint:'/table/workingTableStatusChangeAPI',body: payload});
    return res;
}
export const deleteTableAPI = async (payload) =>{
    const res = await postRequest({endPoint:'/table/deleteTableAPI',body: payload});
    return res;
}
