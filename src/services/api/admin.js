import { postRequest } from "../axios";

export const admin_login = async (payload) => {
  const res = await postRequest({ endPoint: "/admin/login", body: payload });
  return res;
};


export const get_all_user_admin = async (payload) => {
  const res = await postRequest({ endPoint: "/admin/users", body: payload });
  return res;
};

export const isOTPBook_Status_admin = async (payload) => {
  const res = await postRequest({ endPoint: "/admin/change/OTPStatusChange", body: payload });
  return res;
};

export const user_complete_Status_admin = async (payload) => {
  const res = await postRequest({ endPoint: "/admin/change/usercomplete", body: payload });
  return res;
};