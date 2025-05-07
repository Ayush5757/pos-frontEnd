import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAccessToke, getKOTAccessToke, getWaiterAccessToke } from "../../utils/constFunction";
const AuthLayout = () => {
  const token = getAccessToke();
  const kot_token = getKOTAccessToke();
  const waiter_token = getWaiterAccessToke();
  if(kot_token){
    return <Navigate to='/kot-ticket-counter' /> 
  }
  if(waiter_token){
    return <Navigate to='/waiter-table-store' /> 
  }
  return token ? <Navigate to='/dashboard' /> : <Outlet />
};

export default AuthLayout;
