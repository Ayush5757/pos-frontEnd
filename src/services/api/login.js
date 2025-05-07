import { postRequest } from "../axios";

export const login = async (payload) =>{
    const res = await postRequest({endPoint:'/auth/login',body: payload});
    return res;
}

export const loginGoogle = async (payload) =>{
    const res = await postRequest({endPoint:'/auth/googlelogin',body: payload});
    return res;
}