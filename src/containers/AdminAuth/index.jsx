import { Box } from "@mantine/core";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const AdminAuth = () => {
  const getToken = () => {
    return localStorage.getItem("my_admin_token");
  };
  if (!getToken()) return <Navigate to={"/Maaadmin"} />;
  return (
      <Box style={{ width: "100%"}}>
        <Outlet />
      </Box>
  );
};

export default AdminAuth;
