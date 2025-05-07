import { getRequest, postRequest } from "../axios";



export const getStaffData = async (page) =>{
    const res = await getRequest({endPoint:`/staff/getData?page=${page}`});
    return res;
}

export const getSingleStaffData = async (payload) =>{
    const res = await getRequest({endPoint:`/staff/getSingleStaffData?staffID=${payload}`});
    return res;
}
export const getSingleStaffLeave = async (singleStaffID,leaveDateCheck) =>{
    const res = await getRequest({endPoint:`/staff/getSingleStaffLeave?staffID=${singleStaffID}&date=${leaveDateCheck}`});
    return res;
}


export const addStaffAPI = async (payload) =>{
    const res = await postRequest({endPoint:`/staff/add`,body: payload});
    return res;
}

export const deleteStaffAPI = async (payload) =>{
    const res = await postRequest({endPoint:`/staff/delete`,body: payload});
    return res;
}
export const leave_Staff = async (payload) =>{
    const res = await postRequest({endPoint:`/staff/leave`,body: payload});
    return res;
}