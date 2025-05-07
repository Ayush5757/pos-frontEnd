import { getRequest, postKotRequest, postRequest } from "../axios";


// to show and delete Kot User
export const getKotUsers = async (shopID) =>{
    const res = await getRequest({endPoint:`/kot/getKot/users?shopID=${shopID}`});
    return res;
}

export const getKotData = async (shopID) =>{
    const res = await postKotRequest({endPoint:`/isauth/kot/getKot/data?shopID=${shopID}`});
    return res;
}


export const Kot_User_Create_API = async (payload) =>{
    const res = await postRequest({endPoint:'/kot/user/create',body: payload});
    return res;
}

export const Kot_User_Login_API = async (payload) =>{
    const res = await postRequest({endPoint:'/unA/kot/user/login',body: payload});
    return res;
}

export const Delete_User_Create_API = async (payload) =>{
    const res = await postRequest({endPoint:'/kot/user/delete',body: payload});
    return res;
}

// export const KOT_is_complete_ticket = async (payload) =>{
//     const res = await postKotRequest({endPoint:'/isauth/kot/iscomplete',body: payload});
//     return res;
// }
// export const room_KOT_is_complete_ticket = async (payload) =>{
//     const res = await postKotRequest({endPoint:'/isauth/kot/room/iscomplete',body: payload});
//     return res;
// }