import { postRequest,getRequest } from "../axios";

export const createRoomAPI = async (payload) =>{
    const res = await postRequest({endPoint:'/room/addRoom',body: payload});
    return res;
}

export const getRoomAPI = async (payload) =>{
    const res = await postRequest({endPoint:'/room/getRooms',body: payload});
    return res;
}
export const confirmRoomInventory = async (payload) =>{
    const res = await postRequest({endPoint:'/confirmRoomInventory',body: payload});
    return res;
}
export const createRoomSectionAPI = async (payload) =>{
    const res = await postRequest({endPoint:'/room/createRoomSectionAPI',body: payload});
    return res;
}
export const getRoomsSections = async (payload) =>{
    const res = await postRequest({endPoint:'/room/getRoomSections',body: payload});
    return res;
}
export const workingRoomStatusChangeAPI = async (payload) =>{
    const res = await postRequest({endPoint:'/room/workingRoomStatusChangeAPI',body: payload});
    return res;
}

export const deleteRoomAPI = async (payload) =>{
    const res = await postRequest({endPoint:'/room/deleteRoomAPI',body: payload});
    return res;
}
