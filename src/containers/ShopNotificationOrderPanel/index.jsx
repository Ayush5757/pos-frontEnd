import { Box, Grid, Paper, Text } from "@mantine/core";
import React from "react";
import { useStyles } from "./style";
import { TextN1 } from "../../components/Text";
import { PrimaryButton } from "../../components/Buttons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { shoeNotification } from "../../components/Notify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AcceptedFromNotification } from "../../redux/slices/Tables";
import { AcceptedFromNotificationInventorie } from "../../redux/slices/InventorySelectedItem";
import { add_customer_room_order_to_table, delete_customer_room_order_to_table, getLatestroomOrders } from "../../services/api/notificationroom";
import { add_customer_order_to_table, delete_customer_order_to_table, getLatestOrders } from "../../services/api/notification";
import { AcceptedFromNotificationRoom } from "../../redux/slices/Rooms";
import { AcceptedFromNotificationRoomInventorie } from "../../redux/slices/RoomInventorySelectedItem";

const ShopNotificationOrderPanel = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isFetching , refetch } = useQuery({
    queryKey: ["getRecentOrders"],
    queryFn: () => getLatestOrders({shopID:localStorage.getItem('shop_user_id')})
  });

  const addCustomerOrderToTable = useMutation({
    mutationFn: (newVal) => add_customer_order_to_table(newVal),
  });
  const deleteCustomerOrder = useMutation({
    mutationFn: (newVal) => delete_customer_order_to_table(newVal),
  });



  const { data: roomdata ,isFetching: isFetchingRoom , refetch: roomRefetch } = useQuery({
    queryKey: ["getRoomRecentOrders", localStorage.getItem('shop_user_id')],
    queryFn: () => getLatestroomOrders({shopID:localStorage.getItem('shop_user_id')})
  });

  const addCustomerOrderToRoom = useMutation({
    mutationFn: (newVal) => add_customer_room_order_to_table(newVal),
  });
  const deleteCustomerOrderToRoom = useMutation({
    mutationFn: (newVal) => delete_customer_room_order_to_table(newVal),
  });

  return (
    <Box className={classes.big_box}>
      <Grid gutter={0} className={classes.big_grid} mt={30}>
       {data?.data?.target?.length > 0 &&
        <TextN1 style={{ fontWeight: "700", color: "#00804d" }}>Table Orders</TextN1>
       }
        {data?.data?.target?.map((res,index)=>
          <Paper shadow="xl" w={"100vw"} p={10} mt={10} bg={"#ccf2ff"}>
          <Grid.Col span={12} mb={5} style={{display:'flex',justifyContent:'space-between'}}>
            <TextN1 style={{ fontWeight: "700", color: "#00804d" }}>
              Table No - {res?.table?.table_name}
            </TextN1>
          </Grid.Col>
          <Grid.Col span={12}>
            <TextN1
              style={{
                fontWeight: "700",
                lineHeight: "18px",
                color: "#b32400",
              }}
            >
              {res?.customer?.phone}
            </TextN1>
            <TextN1 style={{ fontWeight: "700", lineHeight: "18px" }}>
            {res?.customer?.name}
            </TextN1>
          </Grid.Col>
          <Grid.Col span={12} mt={10}>
            <TextN1
              style={{
                fontWeight: "700",
                lineHeight: "18px",
                color: "#009900",
              }}
            >
              Order
            </TextN1>
            <Grid gutter={5} mt={2} pl={5}>
              <Grid.Col span={10}>
                <TextN1
                  style={{ lineHeight: "18px", color: "#009900" }}
                  fz={12}
                >
                  Item
                </TextN1>
              </Grid.Col>
              <Grid.Col span={2}>
                <TextN1
                  style={{ lineHeight: "18px", fontWeight: "700", }}
                  fz={12}
                >
                  Qty
                </TextN1>
              </Grid.Col>
              {res?.inventories?.map((val) => {
                return (
                  <>
                    <Grid.Col span={10} style={{borderTop:'1px solid #d7d7c1'}}>
                      <TextN1
                        style={{ lineHeight: "18px" }}
                        fz={12}
                      >
                        {val?.item_name}
                      </TextN1>
                    </Grid.Col>
                    <Grid.Col span={2} style={{borderTop:'1px solid #d7d7c1'}}>
                      <TextN1
                        style={{ lineHeight: "18px", fontWeight: "700", }}
                        fz={12}
                      >
                        {val?.qty}
                      </TextN1>
                    </Grid.Col>
                  </>
                );
              })}
              <Grid.Col span={12} className={classes.btn_grd}>
                <PrimaryButton onClick={async ()=>{
                   try {
                      let temp = {
                        shopID: data?.data?.target[index]?.shopID,
                        tableID: data?.data?.target[index]?.table?.tableID,
                        table_type_id: data?.data?.target[index]?.table?.table_type_id,
                        customer: data?.data?.target[index]?.customer,
                      } 
                      await addCustomerOrderToTable.mutateAsync(temp, {
                        onSuccess: (res) => {
                          dispatch(AcceptedFromNotification({table:res?.data?.target?.table, order_id:res?.data?.target?.order_id, total:res?.data?.target?.total}));
                          dispatch(AcceptedFromNotificationInventorie(res?.data?.target));
                          shoeNotification("success", "Order Accepted To Table");    
                          },
                      });
                    } catch (error) {
                      shoeNotification("error", "Somthing Went wrong");
                    }
                    navigate("/shop-tables-inventory");
                }}> Confirm </PrimaryButton>
                <PrimaryButton ml={5} color={'red'} onClick={async()=>{
                   try {
                    let temp = {
                      shopID: data?.data?.target[index]?.shopID,
                      tableID: data?.data?.target[index]?.table?.tableID,
                      table_type_id: data?.data?.target[index]?.table?.table_type_id,
                      customer: data?.data?.target[index]?.customer,
                    } 
                    await deleteCustomerOrder.mutateAsync(temp, {
                      onSuccess: (res) => {
                        refetch();
                        shoeNotification("success", "Order deleted");    
                        },
                    });
                  } catch (error) {
                    shoeNotification("error", "Somthing Went wrong");
                  }
                }}> cancel Order </PrimaryButton>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Paper>
        )}
      </Grid>

{/* ------------------------------------------- */}

    <Grid gutter={0} className={classes.big_grid} mt={30}>
    {roomdata?.data?.target?.length > 0 &&
      <TextN1 style={{ fontWeight: "700", color: "#00804d" }}>Room Orders</TextN1>
    }
        {roomdata?.data?.target?.map((res,index)=>
          <Paper shadow="xl" w={"100vw"} p={10} mt={10} bg={"#ccf2ff"}>
          <Grid.Col span={12} mb={5} style={{display:'flex',justifyContent:'space-between'}}>
            <TextN1 style={{ fontWeight: "700", color: "#00804d" }}>
              Room No - {res?.room?.room_name}
            </TextN1>
          </Grid.Col>
          <Grid.Col span={12}>
            <TextN1
              style={{
                fontWeight: "700",
                lineHeight: "18px",
                color: "#b32400",
              }}
            >
              {res?.customer?.phone}
            </TextN1>
            <TextN1 style={{ fontWeight: "700", lineHeight: "18px" }}>
            {res?.customer?.name}
            </TextN1>
          </Grid.Col>
          <Grid.Col span={12} mt={10}>
            <TextN1
              style={{
                fontWeight: "700",
                lineHeight: "18px",
                color: "#009900",
              }}
            >
              Order
            </TextN1>
            <Grid gutter={5} mt={2} pl={5}>
              <Grid.Col span={10}>
                <TextN1
                  style={{ lineHeight: "18px", color: "#009900" }}
                  fz={12}
                >
                  Item
                </TextN1>
              </Grid.Col>
              <Grid.Col span={2}>
                <TextN1
                  style={{ lineHeight: "18px", fontWeight: "700", }}
                  fz={12}
                >
                  Qty
                </TextN1>
              </Grid.Col>
              {res?.inventories?.map((val) => {
                return (
                  <>
                    <Grid.Col span={10} style={{borderTop:'1px solid #d7d7c1'}}>
                      <TextN1
                        style={{ lineHeight: "18px" }}
                        fz={12}
                      >
                        {val?.item_name}
                      </TextN1>
                    </Grid.Col>
                    <Grid.Col span={2} style={{borderTop:'1px solid #d7d7c1'}}>
                      <TextN1
                        style={{ lineHeight: "18px", fontWeight: "700", }}
                        fz={12}
                      >
                        {val?.qty}
                      </TextN1>
                    </Grid.Col>
                  </>
                );
              })}
              <Grid.Col span={12} className={classes.btn_grd}>
                <PrimaryButton onClick={async ()=>{
                   try {
                      let temp = {
                        shopID: roomdata?.data?.target[index]?.shopID,
                        roomID: roomdata?.data?.target[index]?.room?.roomID,
                        room_type_id: roomdata?.data?.target[index]?.room?.room_type_id,
                        customer: roomdata?.data?.target[index]?.customer,
                      } 
                      await addCustomerOrderToRoom.mutateAsync(temp, {
                        onSuccess: (res) => {
                          dispatch(AcceptedFromNotificationRoom({room:res?.data?.target?.room, order_id:res?.data?.target?.order_id, total:res?.data?.target?.total}));
                          dispatch(AcceptedFromNotificationRoomInventorie(res?.data?.target));
                          shoeNotification("success", "Order Accepted To Room");    
                          },
                      });
                    } catch (error) {
                      shoeNotification("error", "Somthing Went wrong");
                    }
                    navigate("/shop-rooms-inventory");
                }}> Confirm </PrimaryButton>
                <PrimaryButton ml={5} color={'red'} onClick={async()=>{
                    try {
                      let temp = {
                        shopID: roomdata?.data?.target[index]?.shopID,
                        roomID: roomdata?.data?.target[index]?.room?.roomID,
                        room_type_id: roomdata?.data?.target[index]?.room?.room_type_id,
                        customer: roomdata?.data?.target[index]?.customer,
                      } 
                      await deleteCustomerOrderToRoom.mutateAsync(temp, {
                        onSuccess: (res) => {
                          roomRefetch();
                          shoeNotification("success", "Room Order deleted");    
                          },
                      });
                    } catch (error) {
                      shoeNotification("error", "Somthing Went wrong");
                    }
                }}> cancel Order </PrimaryButton>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Paper>
        )}
      </Grid>
      {(!isFetching && !isFetchingRoom) && (data?.data?.target?.length===0 && roomdata.data?.target?.length===0)  &&
      <Box className={classes.noDataBox}>
        <TextN1 style={{color:'gray'}}>No Data</TextN1>
      </Box>
      }
    </Box>
  );
};

export default ShopNotificationOrderPanel;
