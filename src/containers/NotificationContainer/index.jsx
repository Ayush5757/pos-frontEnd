import {
  ActionIcon,
  Avatar,
  Box,
  Divider,
  Grid,
  Image,
  Loader,
  LoadingOverlay,
  Modal,
  Paper,
  PinInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import { TextN1 } from "../../components/Text";
import { PrimaryButton } from "../../components/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { IconTrash } from "@tabler/icons-react";
import {
  AddCustomerInfo,
  RemoveAllInventories,
  RemoveCustomerOrder,
} from "../../redux/slices/CustomerOrder";
import moment from "moment";
import { TextInputViewNormal } from "../../components/Inputs";
import Cookies from "js-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addToExistingOrder,
  getAlreadyOrderedItems,
  getIsTableBooked,
  getPendingOrderedItems,
  save_by_customer_order_inventrie,
  save_by_customer_order_inventrie_with_OTP,
  send_OTP_info_API,
} from "../../services/api/notification";
import { Form, Formik } from "formik";
import { shoeNotification } from "../../components/Notify";
import { useNavigate } from "react-router-dom";
import { IconSoup } from "@tabler/icons-react";
import { IconReload } from "@tabler/icons-react";
import KartLogo from "../../assets/KartLogo.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";

const NotificationContainer = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPlaceOrder, setIsPlaceOrder] = useState(false);
  const [isOTPFlag, setisOTPFlag] = useState(false);
  const [addOnOrderPopup, setAddOnOrderPopup] = useState(false);
  const [Total, setTotal] = useState(0);
  const [AlreadyOrderedTotal, setAlreadyOrderedTotal] = useState(0);
  const [PendingOrderedTotal, setPendingOrderedTotal] = useState(0);
  const CustomerOrder = useSelector(
    (state) => state?.CustomerOrderReduser?.CustomerOrder
  );
  console.log("CustomerOrder", CustomerOrder);
  const getCookei = () => {
    const customer_order_info = Cookies.get("customer_order_info");
    const parsedData = JSON.parse(customer_order_info);
    return parsedData;
  };
  console.log("Total_Total", Total);
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["istableBooked", Cookies.get("customer_order_info")],
    queryFn: () =>
      getIsTableBooked({
        shopID: CustomerOrder?.shopID,
        tableID: CustomerOrder?.table?.tableID,
        tableName: CustomerOrder?.table?.table_name,
        tableTypeID: CustomerOrder?.table?.table_type_id,
      }),
    enabled: false,
  });

  const { data: already_Order_Item_data, refetch: alreadyOrderedIten_refetch } =
    useQuery({
      queryKey: ["already_Order_Item_data", Cookies.get("customer_order_info")],
      queryFn: () =>
        getAlreadyOrderedItems({
          tableID: CustomerOrder?.table?.tableID,
          shopID: CustomerOrder?.shopID,
          customer: getCookei(),
        }),
      enabled: true,
    });

  const { data: pending_order_Item, refetch: pendingOrderedIten_refetch } =
    useQuery({
      queryKey: ["pending_order_Item_data", Cookies.get("customer_order_info")],
      queryFn: () =>
        getPendingOrderedItems({
          tableID: CustomerOrder?.table?.tableID,
          shopID: CustomerOrder?.shopID,
          customer: getCookei(),
        }),
      enabled: true,
    });

  useEffect(() => {
    if (
      CustomerOrder?.inventories?.length &&
      Object.keys(CustomerOrder).length !== 0
    ) {
      let temp = CustomerOrder?.inventories?.reduce(
        (total, val) =>
          val?.plate_type === "1"
            ? total + val?.price * val?.qty
            : total + val?.half_price * val?.qty,
        0
      );
      setTotal(temp);
      return;
    }
    setTotal(0);
  }, [CustomerOrder]);
  console.log("Total", Total);
  useEffect(() => {
    if (already_Order_Item_data?.data?.target?.inventories?.length) {
      let temp = already_Order_Item_data?.data?.target?.inventories?.reduce(
        (total, val) =>
          val?.plate_type === "1"
            ? total + val?.price * val?.qty
            : total + val?.half_price * val?.qty,
        0
      );

      setAlreadyOrderedTotal(temp);
      return;
    }
    setAlreadyOrderedTotal(0);
  }, [already_Order_Item_data]);

  useEffect(() => {
    if (pending_order_Item?.data?.target?.inventories?.length) {
      let temp = pending_order_Item?.data?.target?.inventories?.reduce(
        (total, val) =>
          val?.plate_type === "1"
            ? total + val?.price * val?.qty
            : total + val?.half_price * val?.qty,
        0
      );
      setPendingOrderedTotal(temp);
      return;
    }
    setPendingOrderedTotal(0);
  }, [pending_order_Item]);

  useEffect(() => {
    if (isPlaceOrder) {
      refetch();
    }
  }, [isPlaceOrder]);

  const add_to_existing_order = useMutation({
    mutationFn: (newVal) => addToExistingOrder(newVal),
  });
  const save_by_CustomerOrderInventorie_with_OTP = useMutation({
    mutationFn: (newVal) => save_by_customer_order_inventrie_with_OTP(newVal),
  });
  const save_by_CustomerOrderInventorie = useMutation({
    mutationFn: (newVal) => save_by_customer_order_inventrie(newVal),
  });
  const send_OTP_info = useMutation({
    mutationFn: (newVal) => send_OTP_info_API(newVal),
  });

  const Total_With_GST = () => {
    let temp = Total + AlreadyOrderedTotal + PendingOrderedTotal;
    let with_gst = temp + (temp * 18) / 100;
    if (already_Order_Item_data?.data?.target?.discount) {
      with_gst = with_gst - already_Order_Item_data?.data?.target?.discount;
    }
    if (already_Order_Item_data?.data?.target?.addOnCharges?.length) {
      const totalChargePrice =
        already_Order_Item_data?.data?.target?.addOnCharges.reduce(
          (total, charge) => total + charge.charge_price,
          0
        );
      with_gst = with_gst + totalChargePrice;
    }
    return parseInt(with_gst);
  };

  return (
    <Box className={classes.big_box}>
      <Grid gutter={0} className={classes.big_grid}>
        <Grid.Col span={6}>
          <LazyLoadImage
            src={KartLogo}
            width={"40px"}
            effect="blur"
            style={{
              objectFit: "cover",
              borderRadius: "100%",
              marginTop:'2px'
            }}
          />
        </Grid.Col>
        <Grid.Col span={6} mt={'2px'} className={classes.notifyTopIcon}>
          <ActionIcon
            onClick={() => navigate("/customer-notification-order-notify")}
            mt={"5px"}
            mr={"5px"}
          >
            <Avatar radius={50} src={null} alt="Order Icon" color="red">
              <IconSoup color="red" />
            </Avatar>
          </ActionIcon>
        </Grid.Col>
        <Grid.Col span={12} className={classes.heading_page}>
          <TextN1 color={"#ffffff"}> Your Table Order's </TextN1>
        </Grid.Col>
        <Grid.Col span={12} mt={10} mb={5}>
          <ActionIcon
            onClick={() => {
              alreadyOrderedIten_refetch();
              pendingOrderedIten_refetch();
            }}
          >
            <Avatar radius={50} src={null} alt="Order Icon" color="red">
              <IconReload color="red" />
            </Avatar>
          </ActionIcon>
        </Grid.Col>
        <Grid.Col>
          <Paper shadow="xl">
            <Grid className={classes.heading} gutter={0}>
              <Grid.Col span={8} mb={3}>
                <TextN1 className={classes.total}>
                  Date -{" "}
                  <span className={classes.current_date}>
                    {moment().format("MMM Do YYYY")}
                  </span>{" "}
                </TextN1>
                <TextN1 mt={5} color={"white"}>
                  Table -{" "}
                  <span className={classes.table_name}>
                    {CustomerOrder?.table?.table_name}
                  </span>
                </TextN1>
              </Grid.Col>
              <Grid.Col span={4} mb={3}>
                <PrimaryButton
                  onClick={() => {
                    setIsPlaceOrder(true);
                  }}
                  disabled={
                    Total === 0 ||
                    pending_order_Item?.data?.target?.inventories?.length ||
                    already_Order_Item_data?.data?.target?.inventories?.length
                      ? true
                      : false
                  }
                >
                  Place Order
                </PrimaryButton>
              </Grid.Col>
              <Grid.Col span={12}>
                <TextN1 className={classes.month}>
                  {" "}
                  Total -{" "}
                  <span className={classes.current_total}>
                    {Total_With_GST()} ₹
                  </span>{" "}
                </TextN1>
              </Grid.Col>
              <Grid.Col span={12}>
                <TextN1 className={classes.current_Orders}> Order </TextN1>
              </Grid.Col>
              <Grid.Col span={12}>
                <Grid gutter={0}>
                  <Grid.Col span={8}>
                    <TextN1 className={classes.item_name}> Name </TextN1>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <TextN1 className={classes.item_name}> Qty </TextN1>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <TextN1 className={classes.item_name}> Total </TextN1>
                  </Grid.Col>
                  {already_Order_Item_data?.data?.target?.inventories?.map(
                    (val, index) => {
                      return (
                        <>
                          <Grid.Col
                            span={8}
                            mt={2}
                            className={classes.item_name_grid}
                          >
                            <ActionIcon
                              variant="transparent"
                              color="red"
                              aria-label="Settings"
                              onClick={() => {
                                dispatch(RemoveCustomerOrder(index));
                              }}
                            >
                              <IconTrash
                                style={{ width: "70%", height: "70%" }}
                                stroke={1}
                                color="#e0e0eb"
                              />
                            </ActionIcon>
                            <TextN1 className={classes.already_order_item_name}>
                              {val?.item_name}
                            </TextN1>
                          </Grid.Col>
                          <Grid.Col mt={2} span={2}>
                            <TextN1
                              className={classes.already_order_item_name}
                            >{`${val?.qty} ,${
                              val?.plate_type === "1" ? "F" : "H"
                            }`}</TextN1>
                          </Grid.Col>
                          <Grid.Col mt={2} span={2}>
                            <TextN1 className={classes.already_order_item_name}>
                              {val?.plate_type === "1"
                                ? val?.price * val?.qty
                                : val?.half_price * val?.qty}
                            </TextN1>
                          </Grid.Col>
                        </>
                      );
                    }
                  )}

                  {pending_order_Item?.data?.target?.inventories?.map(
                    (val, index) => {
                      return (
                        <>
                          <Grid.Col
                            span={8}
                            mt={2}
                            className={classes.item_name_grid}
                          >
                            <ActionIcon
                              variant="transparent"
                              color="red"
                              aria-label="Settings"
                              onClick={() => {
                                dispatch(RemoveCustomerOrder(index));
                              }}
                            >
                              <IconTrash
                                style={{ width: "70%", height: "70%" }}
                                stroke={1}
                                color="#e0e0eb"
                              />
                            </ActionIcon>
                            <TextN1 className={classes.already_order_item_name}>
                              {val?.item_name}
                            </TextN1>
                          </Grid.Col>
                          <Grid.Col mt={2} span={2}>
                            <TextN1
                              className={classes.already_order_item_name}
                            >{`${val?.qty} ,${
                              val?.plate_type === "1" ? "F" : "H"
                            }`}</TextN1>
                          </Grid.Col>
                          <Grid.Col mt={2} span={2}>
                            <TextN1 className={classes.already_order_item_name}>
                              {val?.plate_type === "1"
                                ? val?.price * val?.qty
                                : val?.half_price * val?.qty}
                            </TextN1>
                          </Grid.Col>
                        </>
                      );
                    }
                  )}

                  {CustomerOrder?.inventories?.map((val, index) => {
                    return (
                      <>
                        <Grid.Col
                          span={8}
                          mt={2}
                          className={classes.item_name_grid}
                        >
                          <ActionIcon
                            variant="transparent"
                            color="red"
                            aria-label="Settings"
                            onClick={() => {
                              dispatch(RemoveCustomerOrder(index));
                            }}
                          >
                            <IconTrash
                              style={{ width: "70%", height: "70%" }}
                              stroke={2}
                            />
                          </ActionIcon>
                          <TextN1 className={classes.item_name}>
                            {val?.item_name}
                          </TextN1>
                        </Grid.Col>
                        <Grid.Col mt={2} span={2}>
                          <TextN1 className={classes.item_name}>{`${
                            val?.qty
                          } ,${val?.plate_type === "1" ? "F" : "H"}`}</TextN1>
                        </Grid.Col>
                        <Grid.Col mt={2} span={2}>
                          <TextN1 className={classes.item_name}>
                            {val?.plate_type === "1"
                              ? val?.price * val?.qty
                              : val?.half_price * val?.qty}
                          </TextN1>
                        </Grid.Col>
                      </>
                    );
                  })}

                  <Grid.Col
                    span={8}
                    className={classes.for_border}
                    pt={5}
                    pb={5}
                  >
                    <TextN1 className={classes.titlegst}> Total </TextN1>
                  </Grid.Col>
                  <Grid.Col
                    span={4}
                    className={`${classes.for_border} ${classes.BoxTotal}`}
                    pt={5}
                    pb={5}
                  >
                    <TextN1 className={classes.current_total}>
                      {Total + AlreadyOrderedTotal + PendingOrderedTotal} ₹
                    </TextN1>
                  </Grid.Col>

                  <Grid.Col
                    span={8}
                    className={classes.for_border}
                    pt={5}
                    pb={5}
                  >
                    <TextN1 className={classes.titlegst}> SGST </TextN1>
                  </Grid.Col>
                  <Grid.Col
                    span={4}
                    className={`${classes.for_border} ${classes.BoxTotal}`}
                    pt={5}
                    pb={5}
                  >
                    <TextN1 className={classes.current_total}>
                      {((Total + AlreadyOrderedTotal + PendingOrderedTotal) *
                        9) /
                        100}{" "}
                      ₹
                    </TextN1>
                  </Grid.Col>

                  <Grid.Col
                    span={8}
                    className={classes.for_border}
                    pt={5}
                    pb={5}
                  >
                    <TextN1 className={classes.titlegst}> CGST </TextN1>
                  </Grid.Col>
                  <Grid.Col
                    span={4}
                    className={`${classes.for_border} ${classes.BoxTotal}`}
                    pt={5}
                    pb={5}
                  >
                    <TextN1 className={classes.current_total}>
                      {((Total + AlreadyOrderedTotal + PendingOrderedTotal) *
                        9) /
                        100}{" "}
                      ₹
                    </TextN1>
                  </Grid.Col>

                  {already_Order_Item_data?.data?.target?.addOnCharges?.length >
                    0 && (
                    <>
                      {already_Order_Item_data?.data?.target?.addOnCharges?.map(
                        (val) => (
                          <>
                            <Grid.Col
                              span={8}
                              className={classes.for_border}
                              pt={5}
                              pb={5}
                            >
                              <TextN1 className={classes.titlegst}>
                                {val?.charge_name}
                              </TextN1>
                            </Grid.Col>
                            <Grid.Col
                              span={4}
                              className={`${classes.for_border} ${classes.BoxTotal}`}
                              pt={5}
                              pb={5}
                            >
                              <TextN1 className={classes.current_total}>
                                {val?.charge_price} ₹
                              </TextN1>
                            </Grid.Col>
                          </>
                        )
                      )}
                    </>
                  )}

                  {already_Order_Item_data?.data?.target?.discount > 0 && (
                    <>
                      <Grid.Col
                        span={8}
                        className={classes.for_border}
                        pt={5}
                        pb={5}
                      >
                        <TextN1 className={classes.titlegst}>Discount</TextN1>
                      </Grid.Col>
                      <Grid.Col
                        span={4}
                        className={`${classes.for_border} ${classes.BoxTotal}`}
                        pt={5}
                        pb={5}
                      >
                        <TextN1 className={classes.current_total}>
                          {already_Order_Item_data?.data?.target?.discount} ₹
                        </TextN1>
                      </Grid.Col>
                    </>
                  )}

                  <Grid.Col
                    span={8}
                    className={classes.for_border}
                    pt={5}
                    pb={5}
                  >
                    <TextN1 className={classes.current_Orders}>
                      {" "}
                      Total + GST{" "}
                    </TextN1>
                  </Grid.Col>
                  <Grid.Col
                    span={4}
                    className={`${classes.for_border} ${classes.BoxTotal}`}
                    pt={5}
                    pb={5}
                  >
                    <TextN1 className={classes.current_total}>
                      {Total_With_GST()} ₹
                    </TextN1>
                  </Grid.Col>

                  {already_Order_Item_data?.data?.target?.inventories
                    ?.length !== 0 &&
                    already_Order_Item_data?.data?.target.inventories && (
                      <Grid.Col span={12} className={classes.noteBtnGrid}>
                        {CustomerOrder?.inventories?.length !== 0 &&
                          CustomerOrder?.inventories && (
                            <PrimaryButton
                              className={classes.addOnBtn}
                              mr={20}
                              onClick={() => {
                                setAddOnOrderPopup(true);
                              }}
                            >
                              Add On
                            </PrimaryButton>
                          )}
                      </Grid.Col>
                    )}
                </Grid>
              </Grid.Col>
            </Grid>
          </Paper>
        </Grid.Col>
      </Grid>
      <Modal
        opened={isPlaceOrder}
        onClose={() => {
          setisOTPFlag(false);
          setIsPlaceOrder(false);
        }}
        title="Confirm Your Order"
        size="md"
        fullScreen
        centered
      >
        <Box className={classes.modalOuter}>
          <Box className={classes.modal_inner}>
            <Grid gutter={0}>
              {!isOTPFlag ? (
                <>
                  {!send_OTP_info?.isLoading && (
                    <>
                      {data?.data?.isBooked && (
                        <Grid.Col span={12}>
                          <TextN1 className={classes.bookedMsg}>
                            {data?.data?.msg}...
                          </TextN1>
                          <TextN1 className={classes.bookedMsg}>
                            OR You Can Scan Another Table Before Order...
                          </TextN1>
                        </Grid.Col>
                      )}
                      <Grid span={12}>
                        {data?.data?.isOTPBook ? (
                          <Grid.Col>
                            <Formik
                              initialValues={{ name: "", phone: "" }}
                              onSubmit={async (values) => {
                                try {
                                  if (!data?.data?.isBooked) {
                                    values["shop_id"] = CustomerOrder?.shopID;
                                    await send_OTP_info.mutateAsync(values, {
                                      onSuccess: () => {
                                        dispatch(AddCustomerInfo(values));
                                        setisOTPFlag(true);
                                      },
                                    });
                                  }
                                } catch (error) {
                                  shoeNotification("error", error?.message);
                                }
                              }}
                              enableReinitialize
                            >
                              {({ values, handleChange }) => (
                                <Form>
                                  <Grid span={12}>
                                    <Grid.Col span={12}>
                                      <TextInputViewNormal
                                        id="name"
                                        name="name"
                                        label="Name"
                                        onChange={handleChange}
                                        value={values?.name}
                                      />
                                    </Grid.Col>
                                    <Grid.Col span={12}>
                                      <TextInputViewNormal
                                        id="phone"
                                        name="phone"
                                        label="Phone Number"
                                        onChange={handleChange}
                                        value={values?.phone}
                                      />
                                    </Grid.Col>
                                    <Grid.Col
                                      span={12}
                                      mt={20}
                                      className={classes.confirm_btn_grid}
                                    >
                                      <PrimaryButton
                                        disabled={
                                          data?.data?.isBooked || isFetching
                                        }
                                        type="submit"
                                      >
                                        Save
                                      </PrimaryButton>
                                    </Grid.Col>
                                  </Grid>
                                </Form>
                              )}
                            </Formik>
                          </Grid.Col>
                        ) : (
                          <Grid.Col>
                            <Formik
                              initialValues={{ name: "", phone: "" }}
                              onSubmit={async (values) => {
                                try {
                                  if (
                                    values?.name?.length > 0 &&
                                    values?.phone?.length > 0
                                  ) {
                                    let temp = { ...CustomerOrder };
                                    temp["customer"] = {
                                      name: values?.name,
                                      phone: values?.phone,
                                    };
                                    temp["shopID"] = CustomerOrder?.shopID;
                                    let total = Total;
                                    temp["total"] = total;
                                    await save_by_CustomerOrderInventorie.mutateAsync(
                                      temp,
                                      {
                                        onSuccess: () => {
                                          dispatch(AddCustomerInfo(values));
                                          const jsonString =
                                            JSON.stringify(values);
                                          Cookies.set(
                                            "customer_order_info",
                                            jsonString,
                                            {
                                              expires: 5 / 24,
                                            }
                                          );
                                          dispatch(RemoveAllInventories());
                                          shoeNotification(
                                            "success",
                                            "Your Order Placed"
                                          );
                                          setisOTPFlag(false);
                                          setIsPlaceOrder(false);
                                        },
                                      }
                                    );
                                  }
                                } catch (error) {
                                  shoeNotification("error", error?.message);
                                }
                              }}
                              enableReinitialize
                            >
                              {({ values, handleChange }) => (
                                <Form>
                                  <Grid span={12}>
                                    <Grid.Col span={12}>
                                      <TextInputViewNormal
                                        id="name"
                                        name="name"
                                        label="Name"
                                        onChange={handleChange}
                                        value={values?.name}
                                      />
                                    </Grid.Col>
                                    <Grid.Col span={12}>
                                      <TextInputViewNormal
                                        id="phone"
                                        name="phone"
                                        label="Phone Number"
                                        onChange={handleChange}
                                        value={values?.phone}
                                      />
                                    </Grid.Col>
                                    <Grid.Col
                                      span={12}
                                      mt={20}
                                      className={classes.confirm_btn_grid}
                                    >
                                      <PrimaryButton
                                        disabled={
                                          data?.data?.isBooked || isFetching
                                        }
                                        type="submit"
                                      >
                                        Save
                                      </PrimaryButton>
                                    </Grid.Col>
                                  </Grid>
                                </Form>
                              )}
                            </Formik>
                          </Grid.Col>
                        )}
                      </Grid>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Grid.Col
                    span={12}
                    mt={20}
                    className={classes.loader_grid}
                  ></Grid.Col>
                  <Grid.Col
                    span={12}
                    mt={20}
                    className={classes.otp_message_grid}
                  >
                    <TextN1>Sending OTP.....</TextN1>
                    <TextN1>Confirm your Order</TextN1>
                  </Grid.Col>
                  <Grid.Col span={12} mt={20}>
                    <Formik
                      initialValues={{}}
                      onSubmit={async (values) => {
                        try {
                          let total = Total;
                          let temp = { ...CustomerOrder };
                          temp["total"] = total;
                          console.log("values", values);
                          if (values?.otp) {
                            temp["OTP"] = parseInt(values?.otp);
                          }
                          if (!temp?.OTP) {
                            shoeNotification("error", "Enter OTP First");
                          }
                          await save_by_CustomerOrderInventorie_with_OTP.mutateAsync(
                            temp,
                            {
                              onSuccess: () => {
                                const jsonString = JSON.stringify(
                                  CustomerOrder?.customer
                                );
                                Cookies.set("customer_order_info", jsonString, {
                                  expires: 5 / 24,
                                });
                                dispatch(RemoveAllInventories());
                                shoeNotification(
                                  "success",
                                  "Your Order Placed"
                                );
                                setisOTPFlag(false);
                                setIsPlaceOrder(false);
                              },
                            }
                          );
                        } catch (error) {
                          shoeNotification("error", error?.message);
                        }
                      }}
                      enableReinitialize
                    >
                      {({ values, handleChange, setFieldValue }) => (
                        <Form>
                          <Grid gutter={0}>
                            <Grid.Col
                              span={12}
                              className={classes.onCenterGrid}
                            >
                              <PinInput
                                type="number"
                                name="otp"
                                placeholder="O"
                                onChange={(val) => {
                                  setFieldValue("otp", val);
                                }}
                                value={values?.otp}
                              />
                            </Grid.Col>
                            <Grid.Col
                              span={12}
                              mt={20}
                              className={classes.confirm_btn_grid}
                            >
                              <PrimaryButton type="submit">
                                Confirm Order
                              </PrimaryButton>
                            </Grid.Col>
                          </Grid>
                        </Form>
                      )}
                    </Formik>
                  </Grid.Col>
                </>
              )}
            </Grid>
          </Box>
        </Box>
      </Modal>
      <Modal
        opened={addOnOrderPopup}
        onClose={() => {
          setAddOnOrderPopup(false);
        }}
        title="Confirm Your Order"
        size="sm"
        centered
      >
        <Box className={classes.addMoreOrderPopup}>
          <TextN1 className={classes.addMoreItemTitle}>
            {" "}
            Are You Sure You Want to Add More Items to the Order{" "}
          </TextN1>
          <PrimaryButton
            onClick={async () => {
              try {
                if (CustomerOrder?.inventories?.length) {
                  let temp = { ...CustomerOrder };
                  temp["customer"] = getCookei();
                  let total = Total;
                  temp["total"] =
                    total + AlreadyOrderedTotal + PendingOrderedTotal;
                  await add_to_existing_order.mutateAsync(temp, {
                    onSuccess: (res) => {
                      if (res?.data?.isBooked) {
                        shoeNotification("error", "Table is Already Booked");
                      } else {
                        dispatch(RemoveAllInventories());
                        alreadyOrderedIten_refetch();
                        pendingOrderedIten_refetch();
                        shoeNotification(
                          "success",
                          "Your Order Placed and Updated"
                        );
                      }
                      setAddOnOrderPopup(false);
                      setisOTPFlag(false);
                      setIsPlaceOrder(false);
                    },
                  });
                } else {
                  shoeNotification("error", "First Select Menu Items");
                }
              } catch (error) {
                shoeNotification("error", "Somthing Went wrong");
              }
            }}
          >
            {" "}
            Confirm{" "}
          </PrimaryButton>
        </Box>
      </Modal>
      <LoadingOverlay
        visible={send_OTP_info?.isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    </Box>
  );
};

export default NotificationContainer;
