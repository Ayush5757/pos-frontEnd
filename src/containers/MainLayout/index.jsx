import React, { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getAccessToke } from "../../utils/constFunction";
import { ActionIcon, Avatar, Box, Button, Grid, Modal } from "@mantine/core";
import { IconBrandAirtable } from "@tabler/icons-react";
import Expense from "../Expense";
import { useStyles } from "./style";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  shoeNotification,
  showNotificationWithoutClose,
} from "../../components/Notify";
import { IconBed } from "@tabler/icons-react";
import { IconRefreshDot } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { IconBellRinging } from "@tabler/icons-react";
import { remove_inventory_of_table } from "../../redux/slices/InventorySelectedItem";
import Short from "../../assets/Short.mp3";
import moment from "moment";
import axios from "axios";
import { accessTokenFunctio } from "../../services/axios";
import { IconUserHeart } from "@tabler/icons-react";
const MainLayout = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const [expensisPopUp, setExpensisPopUp] = useState(false);
  const token = getAccessToke();
  const queryClient = useQueryClient();

  const socketRef = useRef(null);
  const playNotificationSound = () => {
    const audioElement = new Audio(Short);
    audioElement.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };
  const CheckReminder = async () => {
    try {
      await axios
        .get(
          `${process.env.react_app_web_socket_backend}/api/reminder/getReminder?selectDate=${moment(
            new Date()
          ).format("YYYY-D-MMM")}`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: "Bearer " + accessTokenFunctio(),
            },
          }
        )
        .then((response) => {
          if (response?.data?.target?.reminders[0]?.reminder_message) {
            response?.data?.target?.reminders.forEach((val) => {
              showNotificationWithoutClose(
                "reminder",
                val?.reminder_message,
                "Reminder"
              );
            });
          }
        });
    } catch (error) {}
  };
  const setupSocketConnection = () => {
    const socket = io(process.env.react_app_web_socket_backend, {
      reconnection: true,
      reconnectionDelay: 1000,
      // transports: ['websocket'],
      // withCredentials: true,
    });

    socket.on("connect", () => {
      socket.emit("newUser", localStorage.getItem("shop_user_id"));
      CheckReminder();
      socket.on("newOrderArrived", () => {
        playNotificationSound();
        showNotificationWithoutClose("success", "New Table Order Arrived");
      });
      socket.on("newRoomOrderArrived", () => {
        playNotificationSound();
        showNotificationWithoutClose("success", "New Room Order Arrived");
      });
      socket.on("kotComplete", () => {
        shoeNotification("success", "Kot Completed successfully");
      });
      socket.on("notify_from_waiter", (table_ID) => {
        shoeNotification("success", "Waiter Added Order");
        dispatch(remove_inventory_of_table(table_ID));
        queryClient.invalidateQueries(["getTableAPI"]);
      });
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected. Attempting to reconnect...");
      setTimeout(() => (socketRef.current = null), 1000);
    });

    return socket;
  };

  useEffect(() => {
    if (socketRef.current) return;
    if (!socketRef.current) {
      socketRef.current = setupSocketConnection();
    }
  }, []);

  if (!token) return <Navigate to={"/login"} />;

  return (
    <>
      <Box style={{ width: "100%", padding: "10px" }}>
        <Grid
          gutter={0}
          style={{ borderBottom: "1px solid #e3e6e8", paddingBottom: "10px" }}
          w={'100%'}
        >
          <Grid.Col span={12}>
            <Grid w={"100%"} gutter={8}>
              <Grid.Col span={4} xs={2.6} sm={2} md={1.5} lg={1.2}>
                <Button
                  variant="gradient"
                  gradient={{ from: "#3333ff", to: "#000000", deg: 105 }}
                  onClick={() => {
                    setExpensisPopUp(!expensisPopUp);
                  }}
                  ml={10}
                >
                  Daily Expense
                </Button>
              </Grid.Col>
              <Grid.Col span={2} xs={1.3} sm={1} md={1} lg={1}>
                <Button
                  variant="gradient"
                  gradient={{ from: "#3333ff", to: "#000000", deg: 105 }}
                  onClick={() => {
                    navigate("/shop-order-list");
                  }}
                  ml={10}
                >
                  Orders
                </Button>
              </Grid.Col>
              <Grid.Col span={2} xs={1.2} sm={1} md={0.8} lg={0.6}>
                <ActionIcon
                  onClick={() => {
                    navigate("/shop-Tables-inventory", { replace: true });
                  }}
                  variant="filled"
                  color="yellow"
                  ml={30}
                  p={5}
                  size="lg"
                >
                  <IconBrandAirtable size={"5rem"} color="black" />
                </ActionIcon>
              </Grid.Col>
              <Grid.Col span={2} xs={0.9} sm={0.8} md={0.7} lg={0.5}>
                <ActionIcon
                  onClick={() => {
                    navigate("/shop-rooms-inventory", { replace: true });
                  }}
                  variant="filled"
                  color="yellow"
                  ml={15}
                  p={5}
                  size="lg"
                >
                  <IconBed size={"5rem"} color="black" />
                </ActionIcon>
              </Grid.Col>
              <Grid.Col span={2} xs={1} sm={0.8} md={0.7} lg={0.5}>
                <ActionIcon
                  onClick={() => {
                    navigate("/fast-order-customer", { replace: true });
                  }}
                  variant="filled"
                  color="yellow"
                  ml={15}
                  p={5}
                  size="lg"
                >
                  <span style={{ color: "black", fontWeight: 700 }}>FO</span>
                </ActionIcon>
              </Grid.Col>
              <Grid.Col span={5} xs={2} sm={2} lg={1}>
                <Button
                  variant="gradient"
                  gradient={{ from: "#3333ff", to: "#000000", deg: 105 }}
                  onClick={() => {
                    navigate("/fast-order-list", { replace: true });
                  }}
                  ml={10}
                >
                  FastOrder List
                </Button>
              </Grid.Col>

              <Grid.Col span={4} xs={3} sm={4} lg={7} className={classes.logo_notification_grid} >
                <ActionIcon
                  onClick={() => {
                    window.location.reload();
                  }}
                  variant="filled"
                  color="yellow"
                  mr={15}
                  p={5}
                  size="lg"
                >
                  <IconRefreshDot size={"5rem"} color="black" />
                </ActionIcon>

                <ActionIcon
                  onClick={() => {
                    navigate("shop-notify-order-generate-to-confirm");
                  }}
                  variant="filled"
                  color="yellow"
                  mr={15}
                  p={5}
                  size="lg"
                >
                  <IconBellRinging size={"5rem"} color="black" />
                </ActionIcon>

                <ActionIcon
                  onClick={() => {
                    navigate("/profile");
                  }}
                  variant="filled"
                  color="blue"
                  radius={'100%'}
                  p={2}
                  size={"2rem"}
                >
                  <IconUserHeart size={"5rem"} color="white" />
                </ActionIcon>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
        <Outlet />
      </Box>
      <Modal
        opened={expensisPopUp}
        onClose={() => setExpensisPopUp(false)}
        title="Expense"
        size="md"
        centered
      >
        <Expense setExpensisPopUp={setExpensisPopUp} />
      </Modal>
    </>
  );
};

export default MainLayout;
