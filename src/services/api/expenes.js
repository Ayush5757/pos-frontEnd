import { getRequest, postRequest } from "../axios";

export const add_expense_API = async (payload) =>{
    const res = await postRequest({endPoint:'/expenses/add_expense',body: payload});
    return res;
}

export const getexpensesDatabyName = async (payload) =>{
    const res = await getRequest({endPoint:`/expenses/getexpensesDatabyName?shop_ID=${payload?.shopID}&expName=${payload?.expName}`});
    return res;
}


export const get_expenses_by_month = async (payload) =>{
    const res = await getRequest({endPoint:`/expenses/get_expenses_by_month?shop_ID=${payload?.shop_id}&month=${payload?.month}&year=${payload?.year}&page=${payload?.page}`}); 
    return res;
}

export const createExpensesData = async (payload) =>{
    const res = await postRequest({endPoint:'/createExpensesData',body: payload});
    return res;
}
export const deleteExpanse = async (payload) =>{
    const res = await postRequest({endPoint:'/expenses/deleteExpanse',body: payload});
    return res;
}