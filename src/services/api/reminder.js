import moment from "moment";
import { getRequest, postRequest } from "../axios";

export const get_Reminder = async (selectDate) =>{
    const res = await getRequest({endPoint:`/reminder/getReminder${selectDate ?`?selectDate=${moment(selectDate).format('YYYY-D-MMM')}`:''}`});
    return res;
}
export const Add_New_Reminder = async (payload) =>{
    const res = await postRequest({endPoint:'/reminder/addNew',body: payload});
    return res;
}
export const delete_Reminder = async (payload) =>{
    const res = await postRequest({endPoint:'/reminder/delete',body: payload});
    return res;
}