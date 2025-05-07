import { postRequest } from "../axios";

export const signup = async (payload) =>{
    const res = await postRequest({endPoint:'/auth/signUp',body: payload});
    return res;
}