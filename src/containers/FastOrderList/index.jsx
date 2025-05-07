import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { cancel_fast_inventorie, complete_by_fast_inventorie, get_fast_orders_inventories_list } from "../../services/api/fastInventorie";
import { Box, Divider, Grid, LoadingOverlay } from "@mantine/core";
import { TextN1 } from "../../components/Text";
import { useStyles } from "./style";
import { PrimaryButton } from "../../components/Buttons";
import { shoeNotification } from "../../components/Notify";
import { useNavigate } from "react-router-dom";

const FastOrderList = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["getFastOrderList"],
    queryFn: () => get_fast_orders_inventories_list(),
  });
  const order_cancel = useMutation({
    mutationFn: (newVal) => cancel_fast_inventorie(newVal),
  });
  const order_ompleted = useMutation({
    mutationFn: (newVal) => complete_by_fast_inventorie(newVal),
  });
  return (
    <Box>
      <LoadingOverlay visible={isFetching} />
      <TextN1> Fast Order List </TextN1>
      <Grid mt={10}>
        {data?.data?.target?.map((val) => {
          return (
            <Grid.Col span={12} xs={6} sm={6} md={4} lg={3} mt={10}>
              <Grid gutter={0} p={15} className={classes.grid_box}>
                <Grid.Col span={6}>
                  <TextN1 className={classes.heading}>Name</TextN1>
                  <TextN1>
                    {val?.customer?.name?.length ? val?.customer?.name : "--"}
                  </TextN1>
                </Grid.Col>
                <Grid.Col span={6} className={classes.phone_grid}>
                  <TextN1 className={classes.heading}>Phone Number</TextN1>
                  <TextN1>
                    {val?.customer?.phone?.length ? val?.customer?.phone : "--"}
                  </TextN1>
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextN1 className={classes.heading}>Address</TextN1>
                  <TextN1>
                    {val?.customer?.address?.length
                      ? val?.customer?.address
                      : "--"}
                  </TextN1>
                  <Divider color="#f0f0f5"  mb={10}/>
                </Grid.Col>
                <Grid.Col className={classes.table_heading} span={5}>Item</Grid.Col>
                <Grid.Col className={classes.table_heading2} span={2}>Price</Grid.Col>
                <Grid.Col className={classes.table_heading2} span={2}>Qty</Grid.Col>
                <Grid.Col className={classes.table_heading2} span={3}>Total</Grid.Col>
                {val?.inventories?.map((item) => {
                  return (
                    <>
                      <Grid.Col className={classes.table_val} span={5}>{item?.item_name}</Grid.Col>
                      <Grid.Col className={classes.table_val2} span={2}>{item?.plate_type==='1'?`${item?.price} F`:`${item?.half_price} H`}</Grid.Col>
                      <Grid.Col className={classes.table_val2} span={2} pr={5}>{item?.qty}</Grid.Col>
                      <Grid.Col className={classes.table_val2} span={3}>{item?.plate_type==='1'?item?.price*item?.qty: item?.half_price*item?.qty}</Grid.Col>
                    </>
                  );
                })}
                <Grid.Col span={12} mt={5} mb={5}>
                  <Divider color="#f0f0f5"/>
                </Grid.Col>
                <Grid.Col span={6}> Total + GST </Grid.Col>
                <Grid.Col span={6} className={classes.grid_total}> {val?.total} </Grid.Col>
                <Grid.Col span={6} mt={5}> <PrimaryButton onClick={async()=>{
                   try {
                    let temp = {
                      order_id : val?._id
                    }
                    await order_cancel.mutateAsync(temp, {
                      onSuccess: () => {
                        refetch();
                        shoeNotification("success", "Order Deleted Successfully");
                      },
                    });
                  } catch (error) {
                    shoeNotification("error", "Somthing went wrong...");
                  }
                }}>Canel</PrimaryButton> 
                {console.log('val',val)}
                <PrimaryButton ml={5} onClick={()=>{
                  navigate('/fast-order-customer',{state:{...val}})
                }}> Edit </PrimaryButton>
                </Grid.Col>
                <Grid.Col span={6} mt={5} className={classes.completeOrder_Grid}> 
                <PrimaryButton onClick={ async()=>{
                   try {
                    let temp = {
                      order_id : val?._id
                    }
                    await order_ompleted.mutateAsync(temp, {
                      onSuccess: () => {
                        refetch();
                        shoeNotification("success", "Order Completed Successfully");
                      },
                    });
                  } catch (error) {
                    shoeNotification("error", "Somthing went wrong...");
                  }
                }}>Complete Order</PrimaryButton> </Grid.Col>
              </Grid>
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
};

export default FastOrderList;
