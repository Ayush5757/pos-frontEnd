import { getRequest, postRequest } from "../axios";

export const addUserDetails = async (payload) =>{
    const res = await postRequest({endPoint:'/addUserProfile',body: payload});
    return res;
}
export const getUserDetails = async (payload) =>{
    console.log("payload",payload);
    const res = await getRequest({endPoint:`/getUserDetails/${payload.id}`});
    return res;
}
export const form_1_User = async (payload) =>{
    const res = await postRequest({endPoint:'/other/form_1_user',body: payload});
    return res;
}
export const form_2_User = async (payload) =>{
    const res = await postRequest({endPoint:'/other/form_2_user',body: payload});
    return res;
}
export const user_status = async (payload) =>{
    const res = await postRequest({endPoint:'/other/status',body: payload});
    return res;
}
export const get_form_1_User = async (payload) =>{
    const res = await postRequest({endPoint:'/other/get_form_1_details',body: payload});
    return res;
}
export const get_user_image_envalop = async (payload) =>{
    const res = await postRequest({endPoint:'/other/get_user_image_envalop',body: payload});
    return res;
}
export const get_user_bar_code = async (payload) =>{
    const res = await postRequest({endPoint:'/barcode/getBarcode',body: payload});
    return res;
}
export const delete_image_other_menu = async (payload) =>{
    const res = await postRequest({endPoint:'/other/delete_image_other_menu',body: payload});
    return res;
}
export const delete_image_other_banner = async (payload) =>{
    const res = await postRequest({endPoint:'/other/delete_image_other_banner',body: payload});
    return res;
}

export const delete_barCode = async (payload) =>{
    const res = await postRequest({endPoint:'/barcode/delete-barcode',body: payload});
    return res;
}

