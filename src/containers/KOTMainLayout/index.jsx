import React, { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getKOTAccessToke } from "../../utils/constFunction";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Grid,
  Modal,
} from "@mantine/core";
import { IconBell, IconDiscount2 } from "@tabler/icons-react";
import Expense from "../Expense";
import { useStyles } from "./style";
import { IconSoup } from "@tabler/icons-react";
import { io } from "socket.io-client";
import { shoeNotification } from "../../components/Notify";
import { useQueryClient } from '@tanstack/react-query';
import { getKotData } from "../../services/api/kot";
import Short from "../../assets/Short.mp3";

const KOTMainLayout = () => {
  const token = getKOTAccessToke();
  const queryClient = useQueryClient();
  const socketRef = useRef(null);

  const playNotificationSound = () => {
    const audioElement = new Audio(Short);
    audioElement.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  const setupSocketConnection = () => {
    const socket = io("http://localhost:8000", {
      reconnection: true,
      reconnectionDelay: 1000,
      // transports: ['websocket'],
      // withCredentials: true,
    });

    socket.on("connect", () => {
      socket.emit('kot_new_user', localStorage.getItem('shopID'));
      socket.on('kot_newOrderArrived', () => {
        shoeNotification("success", "New KOT Arrived"); 
        playNotificationSound();
        queryClient.invalidateQueries(["getKotData", localStorage.getItem("kot_access_token")]);
      });
      socket.on('kot_Order_status_changed', () => {
        shoeNotification("success", "Ticket Status Changed"); 
        playNotificationSound();
        queryClient.invalidateQueries(["getKotData", localStorage.getItem("kot_access_token")]);
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected. Attempting to reconnect...");
      setTimeout(() => socketRef.current = null, 1000);
    });

    return socket;
  }

  useEffect(() => {
    if (socketRef.current) return;
    if (!socketRef.current) {
      socketRef.current = setupSocketConnection();
    }
  }, []);

  // useEffect(() => {
  //   if (!socket) {
  //     const newSocket = setupSocketConnection();
  //     setSocket(newSocket);
  //   }
  // }, [socket]);


  if (!token) return <Navigate to={"/kotlogin"} />;
  return (
      <Box style={{ width: "100%", padding: "10px" }}>
        <Outlet />
      </Box>
  );
};

export default KOTMainLayout;
