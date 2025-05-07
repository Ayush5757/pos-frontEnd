import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  Box,
} from "@mantine/core";

const WaiterMainLayout = () => {
  const getToken = ()=>{
    return localStorage.getItem("waiter_access_token");
  }

  if (!getToken()) return <Navigate to={"/waiterlogin"} />;
  return (
      <Box style={{ width: "100%", padding: "10px" }}>
        <Outlet />
      </Box>
  );
};

export default WaiterMainLayout;
