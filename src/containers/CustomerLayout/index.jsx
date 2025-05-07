import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  ActionIcon,
  Avatar,
  Box,
  Grid,
} from "@mantine/core";
import { IconDiscount2 } from "@tabler/icons-react";
import { useStyles } from "./style";
import { IconSoup } from "@tabler/icons-react";


const CustomerLayout = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  return (
    <Box style={{ width: "100%", padding: "0 10px ", }}>
      <Outlet />
    </Box>
  );
};

export default CustomerLayout;
