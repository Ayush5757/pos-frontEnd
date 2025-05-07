import { getRequest, postRequest } from "../axios";

export const get_shop_list = async (payload) => {
  const res = await getRequest({
    endPoint: `/shoplisting/get-shop-list-shoplist?page=${
      payload?.currentPage
    }${payload?.searchName ? `&search_name=${payload?.searchName}` : ""} ${
      payload?.pinCodeInput ? `&pincode=${payload?.pinCodeInput}` : ""
    }${payload?.cityNameInput ? `&city=${payload?.cityNameInput}` : ""}`,
  });
  return res;
};
export const get_shop_list_main = async (payload) => {
  const res = await getRequest({
    endPoint: `/shoplisting/get-shop-list-main/shop?shop_id=${payload.shop_id}`,
  });
  return res;
};
export const addShopDetail = async (payload) => {
  const res = await postRequest({ endPoint: "/addShopDetails", body: payload });
  return res;
};
export const add_comment = async (payload) => {
  const res = await postRequest({ endPoint: "/comment/add", body: payload });
  return res;
};
export const get_comment = async (payload) => {
  const res = await getRequest({
    endPoint: `/comment/getComment?shop_id=${payload?.shop_id}&page=${payload?.page}`,
  });
  return res;
};
export const get_food_data = async (payload) => {
  const res = await getRequest({
    endPoint: `/shoplisting/getFoodData?shop_id=${payload.shop_id}`,
  });
  return res;
};
