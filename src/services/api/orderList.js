import moment from "moment";
import { getRequest, postRequest } from "../axios";


export const getOrderList = async (selectDate,selectName,selectPhone,page) =>{
    const formattedDate = moment(selectDate).format("YYYY-MM-DD");
    const isValidDate = moment(formattedDate, "YYYY-MM-DD", true).isValid();
    const res = await getRequest({endPoint:`/orderList/orders?selectDate=${isValidDate?formattedDate:''}&selectName=${selectName}&selectPhone=${selectPhone}&page=${page}`});
    return res;
}
export const getOrderListRoom = async (selectDate,selectName,selectPhone,page) =>{
    const formattedDate = moment(selectDate).format("YYYY-MM-DD");
    const isValidDate = moment(formattedDate, "YYYY-MM-DD", true).isValid();
    const res = await getRequest({endPoint:`/orderList/ordersRoom?selectDate=${isValidDate?formattedDate:''}&selectName=${selectName}&selectPhone=${selectPhone}&page=${page}`});
    return res;
}
export const getOrderInformation = async (payload) =>{
    const res = await getRequest({endPoint:`/orderList/specific_order?orderID=${payload}`});
    return res;
}
export const getOrderInformationRoom = async (payload) =>{
    const res = await getRequest({endPoint:`/orderList/specific_orderRoom?orderID=${payload}`});
    return res;
}

export const deleteOrder = async (payload) =>{
    const res = await postRequest({endPoint:'/orderList/delete',body: payload});
    return res;
}
export const deleteOrderRoom = async (payload) =>{
    const res = await postRequest({endPoint:'/orderList/Room/delete',body: payload});
    return res;
}