import { getRequest, postRequest } from "../axios";


export const get_shop_menu_data = async ({shop_id,select_cat,page,search_item,special_offer}) =>{
    const res = await getRequest({endPoint:`/menu/menuCard?shop_id=${shop_id}&page=${page}${select_cat?`&select_cat=${select_cat}`:''}${search_item?`&search_item=${search_item}`:''}${special_offer?`&special_offer=${special_offer}`:''}`});
    return res;
}

export const save_order_table_inventries_API = async (payload) =>{
    const res = await postRequest({endPoint:'/inventorie/save',body: payload});
    return res;
}
