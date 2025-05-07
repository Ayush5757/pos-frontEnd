import { getRequest, postRequest } from "../axios";

export const send_contactUs_form = async (payload) =>{
    const res = await postRequest({endPoint:'/home/contactUs/send',body: payload});
    return res;
}
export const get_home_image = async () =>{
    const res = await getRequest({endPoint:'/home/getPhotos'});
    return res;
}