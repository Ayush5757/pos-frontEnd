import { getRequest, postRequest } from "../axios";

export const uploadImageApi = async (payload) =>{
    const res = await postRequest({endPoint:'/upload-images',body: payload});
    return res;
}
export const getUploadedImage = async (payload) =>{
    const res = await getRequest({endPoint:`/get-images/${payload}`});
    return res;
}