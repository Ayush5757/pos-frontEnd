import { getRequest, postRequest } from "../axios";

export const getExpandSalesTotal = async (month,year,date,isIncludeStaffSal) =>{
    const res = await getRequest({endPoint:`/dashboard/getSalesandExpensesTotal?month=${month}&year=${year}&fulldate=${date}&isincludeStaffSalary=${isIncludeStaffSal}`}); 
    return res;
}


export const deleteExpanse = async (payload) =>{
    const res = await postRequest({endPoint:'/deleteExpanse',body: payload});
    return res;
}