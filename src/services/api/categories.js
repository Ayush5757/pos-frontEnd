import { postRequest } from "../axios";

export const setCategories = async (payload) =>{
    const res = await postRequest({endPoint:'/food/create/categorie',body: payload});
    return res;
}

export const getCategories = async (payload) =>{
    const res = await postRequest({endPoint:'/food/getCategories',body: payload});
    return res;
}

export const deleteCategories = async (payload) =>{
    const res = await postRequest({endPoint:'/food/delete/categorie',body: payload});
    return res;
}

export const updateCategories = async (payload) =>{
    const res = await postRequest({endPoint:'/food/updateCategories/categorie',body: payload});
    return res;
}