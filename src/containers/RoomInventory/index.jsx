import React, { useEffect, useRef, useState } from "react";
import DrawerCustome from "../../components/DrawerCustome";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  Loader,
  Modal,
  Paper,
  ScrollArea,
  Select,
  Text,
  Textarea,
} from "@mantine/core";
import { ImageCard } from "../ShopMainPage/MenuCard/CardCustome";
import { TextInputView, TextInputViewNormal } from "../../components/Inputs";
import { useStyles } from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMenuItems } from "../../services/api/inventory";
import { useSelector, useDispatch } from "react-redux";
import { shoeNotification } from "../../components/Notify";
import { Formik, Form } from "formik";
import { TextN1 } from "../../components/Text";
import { useDisclosure } from "@mantine/hooks";
import { PrimaryButton } from "../../components/Buttons";

import QRCode from "qrcode.react";
import {
  confirm_order_room_inventries_API,
  room_KOT_Send_to_Kitchen,
  room_inventries_fetch_by_roomid_API,
  save_order_room_inventries_API,
} from "../../services/api/roominventory";
import {
  AddItemsInInventory,
  RemoveRoomAddOnCharges,
  RoomAmountAdded,
  confirm_inventory,
  delivered_inventry_item,
  remove_inventory_item,
  update_inventry_item_Plate,
  update_inventry_item_Qty,
} from "../../redux/slices/RoomInventorySelectedItem";
import { room_order_added, room_order_confirm } from "../../redux/slices/Rooms";
import RoomCustomeTable from "../../components/Tables/RoomCustomeTable";
import { debounce } from "lodash";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import ReactToPrint from "react-to-print";
import { useMediaQuery } from "react-responsive";

const RoomInventory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const formikRef = React.useRef();
  const isMobile = useMediaQuery({
    query: "(max-width: 1000px)",
  });
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();
  const [categoryID, setCategoryID] = useState();
  const [openNotes, setOpenNotes] = useState(false);
  const [openBarCodePopUp, setOpenBarCodePopUp] = useState(false);
  const [orderNote, setOrderNote] = useState();
  const [ORDER_ID, setORDER_ID] = useState(location?.state?.orderID);
  const Room = useSelector((state) => state?.RoomsReduser?.Rooms);
  const [isChangeQtyUp, setIsChangeQtyUp] = useState(null);
  const [isChangePlateType, setIsChangePlateType] = useState(null);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [currentTotalWithoutGST, setCurrentTotalWithoutGST] = useState(0);
  const [iskotConfirmPopup, setIskotConfirmPopup] = useState(false);
  const [searchItem, setSearchItem] = useState();
  const [currentDiscount, setCurrentDiscount] = useState(0);
  const componentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMenuImage, setshowMenuImage] = useState(
    localStorage.getItem("showI")
  );

  const inventorie_items = useSelector(
    (state) => state?.RoomInventoryReducer?.SelectedItems
  );

  const [inventries, setinventries] = useState(
    inventorie_items.filter(
      (val) => val?.room?.roomID === location?.state?.roomID
    )
  );
  console.log('inventries',inventries)
  if (Room?.length === 0) {
    navigate("/shop-rooms-inventory");
  }

  useEffect(() => {
    if (!location?.state?.orderID && Room.length) {
      const room_data = Room?.filter(
        (val) => val?.room_type_id === location?.state?.room_type_id
      );
      const order_id = room_data[0]?.room_data?.filter(
        (val) => val?._id === location?.state?.roomID
      );
      if (order_id) {
        setORDER_ID(order_id[0]?.orderID);
      }
    }
  }, [Room]);

  const {
    data: inventorieData,
    refetch: inventry_fetch_by_roomID,
    isFetching: isInventorieFetching,
  } = useQuery({
    queryKey: ["room_inventries_fetch_by_roomid_API", location?.state?.roomID],
    queryFn: () =>
      room_inventries_fetch_by_roomid_API({
        order_id: location?.state?.orderID,
      }),
    cacheTime: 0,
    enabled: false,
  });

  useEffect(() => {
    if (inventorieData) {
      dispatch(
        AddItemsInInventory({
          ...inventorieData?.data?.target,
          api: true,
        })
      );
    }
  }, [inventorieData]);

  useEffect(() => {
    if (location?.state?.roomID) {
      setinventries(
        inventorie_items.filter(
          (val) => val?.room?.roomID === location?.state?.roomID
        )
      );
    }
  }, [inventorie_items]);

  useEffect(() => {
    if (inventries?.length === 0) {
      if (ORDER_ID) {
        inventry_fetch_by_roomID();
      }
    }
  }, [inventries]);

  useEffect(() => {
    if (inventries[0]?.inventories?.length) {
      let total = 0;
      inventries[0]?.inventories?.forEach((element) => {
        if (element?.plate_type === "1") {
          total = total + element?.price * element?.qty;
        } else {
          total = total + element?.half_price * element?.qty;
        }
      });
      let extraCharge = 0;
      if (inventries[0]?.addOnCharges?.length) {
        inventries[0]?.addOnCharges?.forEach((val) => {
          extraCharge = extraCharge + val?.charge_price;
        });
      }

      if (currentDiscount) {
        let temp = parseInt(
          total + (total * 9) / 100 + (total * 9) / 100 - currentDiscount
        );
        if (extraCharge) {
          temp = temp + extraCharge;
        }
        setCurrentTotal(temp);
        setCurrentTotalWithoutGST(() => total);
        return;
      } else if (inventries[0]?.discount) {
        setCurrentDiscount((prev) => inventries[0]?.discount);
        let temp = parseInt(
          total +
            (total * 9) / 100 +
            (total * 9) / 100 -
            inventries[0]?.discount
        );
        if (extraCharge) {
          temp = temp + extraCharge;
        }
        setCurrentTotal(temp);
        setCurrentTotalWithoutGST(() => total);
        return;
      }

      if (extraCharge) {
        let temp =
          parseInt(total + (total * 9) / 100 + (total * 9) / 100) + extraCharge;
        setCurrentTotal(temp);
      } else {
        setCurrentTotal(
          parseInt(total + (total * 9) / 100 + (total * 9) / 100)
        );
      }
      setCurrentTotalWithoutGST(() => total);
    }
  }, [inventries, location?.state?.roomID]);

  // First Time
  useEffect(() => {
    if (inventries[0]?.inventories?.length && currentDiscount) {
      let total = 0;
      inventries[0]?.inventories?.forEach((element) => {
        if (element?.plate_type === "1") {
          total = total + element?.price * element?.qty;
        } else {
          total = total + element?.half_price * element?.qty;
        }
      });
      let extraCharge = 0;
      if (inventries[0]?.addOnCharges?.length) {
        inventries[0]?.addOnCharges?.forEach((val) => {
          extraCharge = extraCharge + val?.charge_price;
        });
      }
      let temp = parseInt(
        total + (total * 9) / 100 + (total * 9) / 100 - currentDiscount
      );
      if (extraCharge) {
        temp = temp + extraCharge;
      }
      setCurrentTotal(temp);
      setCurrentTotalWithoutGST(() => total);
    }
  }, [currentDiscount]);

  useEffect(() => {
    if (location?.state?.orderID && !inventries[0]?.inventories?.length) {
      inventry_fetch_by_roomID();
    }
  }, [location?.state?.orderID]);

  const {
    data: menuData,
    refetch: menuLoad,
    isFetching,
  } = useQuery({
    queryKey: ["getMenuItems", categoryID, searchItem],
    queryFn: () =>
      getMenuItems(
        localStorage.getItem("shop_user_id"),
        categoryID,
        searchItem
      ),
    enabled: false,
  });

  const saveOrderDetails = useMutation({
    mutationFn: (newVal) => save_order_room_inventries_API(newVal),
  });
  const confirmOrder = useMutation({
    mutationFn: (newVal) => confirm_order_room_inventries_API(newVal),
  });

  useEffect(() => {
    if (categoryID || searchItem) {
      menuLoad();
    }
  }, [categoryID, searchItem]);

  const CategoryHandelClick = (id) => {
    close();
    setCategoryID(id);
  };
  const removeInventryAction = (index) => {
    dispatch(
      remove_inventory_item({
        roomID: location.state?.roomID,
        item_index: index,
      })
    );
  };

  const handelConfirm = async () => {
    try {
      const temp = {
        order_id: ORDER_ID,
        room_id: location?.state?.roomID,
        shop_id: localStorage.getItem("shop_user_id"),
        room_type_id: location?.state?.room_type_id,
      };
      await confirmOrder.mutateAsync(temp, {
        onSuccess: () => {
          shoeNotification("success", "Order Cofirmed");
          dispatch(confirm_inventory(temp?.room_id));
          dispatch(room_order_confirm({ ...temp }));
          navigate("/shop-rooms-inventory");
        },
      });
    } catch (error) {
      shoeNotification("error", "Somthing went wrong...");
    }
  };
  const ChangeQtyHandler = (qty) => {
    setIsChangeQtyUp(qty);
  };
  const ChangePLateTypeHandler = (val) => {
    setIsChangePlateType(val);
  };
  const handleOnBeforeGetContent = () => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve();
      }, 100);
    });
  };

  const setComponentRef = (ref) => {
    componentRef.current = ref;
  };

  const reactToPrintContent = () => {
    return componentRef.current;
  };

  const reactToPrintTrigger = () => {
    return <PrimaryButton>Print Table</PrimaryButton>;
  };

  const customToPrint = (printWindow) => {
    const printContent =
      printWindow.contentDocument || printWindow.contentWindow?.document;
    const printedScrollContainer =
      printContent?.querySelector(".scroll-container");

    if (printedScrollContainer) {
      printedScrollContainer.style.overflow = "visible";
      printedScrollContainer.style.height = "fit-content";
    }
    printWindow.contentWindow.print();
    return Promise.resolve();
  };

  const downloadQR = () => {
    const canvas = document.getElementById("Room");
    if (!canvas) {
      return;
    }
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `Room${location?.state?.room_name}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const kotSend = useMutation({
    mutationFn: (newVal) => room_KOT_Send_to_Kitchen(newVal),
  });

  const kothandelClick = async () => {
    try {
      if (ORDER_ID) {
        await kotSend.mutateAsync(
          { order_id: ORDER_ID, shop_id: localStorage.getItem("shop_user_id") },
          {
            onSuccess: (res) => {
              shoeNotification("success", "KOT Sended to Kitchen");
            },
          }
        );
      } else {
        shoeNotification("error", "Pls Save Your Order First...");
      }
      setIskotConfirmPopup(false);
    } catch (error) {
      shoeNotification("error", "Problem with Kot");
    }
  };

  const debounceSearchItems = debounce((value) => {
    setSearchItem(value);
  }, 1000);

  const isDeliveredFunction = (val) => {
    dispatch(
      delivered_inventry_item({
        room_ID: location?.state?.roomID,
        room_type_id: location?.state?.room_type_id,
        item: val,
      })
    );
  };

  const structuresWathsData = () => {
    let str = "";
    inventries[0]?.inventories?.forEach((val, index) => {
      if (index === 0) {
        str = `Food Bill🎉%0A*${localStorage.getItem(
          "shopName"
        )}*%0AThankYou For Visiting Us 🥰%0A%0A -------------------------------%0A${
          index + 1
        }) ${val?.item_name} , ${
          val?.plate_type === "1"
            ? `${val?.price} ₹`
            : `${val?.half_price} ₹ (H)`
        } , qty - ${val?.qty}%0A`;
      } else {
        str =
          str +
          `%0A${index + 1}) ${val?.item_name} , ${
            val?.plate_type === "1"
              ? `${val?.price} ₹`
              : `${val?.half_price} ₹ (H)`
          } , qty - ${val?.qty}%0A`;
      }
    });

    if (currentTotal) {
      if (inventries[0]?.discount > 0) {
        str =
          str +
          `-------------------------------%0A%0ACurrent Total - ${currentTotalWithoutGST} ₹ %0ACGST - ${
            (currentTotalWithoutGST * 9) / 100
          } ₹ %0ASGST - ${
            (currentTotalWithoutGST * 9) / 100
          } ₹ %0ADiscount Amount - ${inventries[0]?.discount} ₹`;
      } else {
        str =
          str +
          `-------------------------------%0A%0ACurrent Total - ${currentTotalWithoutGST} ₹ %0ACGST - ${
            (currentTotalWithoutGST * 9) / 100
          } ₹ %0ASGST - ${(currentTotalWithoutGST * 9) / 100} ₹`;
      }
      if (inventries[0]?.addOnCharges?.length > 0) {
        inventries[0]?.addOnCharges?.forEach((val) => {
          str = str + `%0A${val?.charge_name} - ${val?.charge_price} ₹`;
        });
      }
      str =
        str +
        `%0A%0A*Your Total* - ${currentTotal} ₹%0A%0A*I hope you're having a great time byeee* 🤗`;
    }
    return str;
  };

  return (
    <Box pt={5}>
      <Grid gutter={5} w={"100%"}>
        <Grid.Col span={2} xs={1} sm={1} lg={1}>
          <DrawerCustome
            opened={opened}
            open={open}
            close={close}
            CategoryHandelClick={CategoryHandelClick}
          />
        </Grid.Col>
        <Grid.Col span={10} xs={5} sm={6} md={6}>
          <Box className={classes.box_badge_table}>
            <Button
              variant="gradient"
              gradient={{ from: "#1a75ff", to: "#800080", deg: 105 }}
              onClick={() => navigate("/shop-rooms-inventory")}
            >
              Tables
            </Button>

            <Badge
              variant="gradient"
              p={15}
              ml={10}
              gradient={{ from: "teal", to: "lime", deg: 105 }}
              onClick={() => {
                setOpenBarCodePopUp(true);
              }}
              className={classes.badge_table}
            >
              {Room?.length !== 0 &&
                `Room - ${location?.state?.room_name ?? ""}`}
            </Badge>
          </Box>
        </Grid.Col>
        <Grid.Col span={12} xs={6} sm={5} md={5}  className={classes.lastTabGrid}>
          <Box w={"100%"} className={classes.RoomPriceSelectboxwithWathsapp}>
            <Formik
              initialValues={{roomPrice:inventries[0]?.roomPrice}}
              onSubmit={(val) => {
                dispatch(
                  RoomAmountAdded({
                    room: {
                      roomID: location?.state?.roomID,
                      room_name: location?.state?.room_name,
                    },
                    price: val?.roomPrice,
                  })
                );
                shoeNotification('success','Please Save Order')
              }}
              enableReinitialize
            >
              {({ values, handleChange }) => (
                <Form>
                  <Box style={{ display: "flex",alignItems:'center' }}>
                    <TextInputViewNormal
                      type='number'
                      placeholder="Room Price"
                      id="roomPrice"
                      name="roomPrice"
                      onChange={handleChange}
                      value={values?.roomPrice}
                    />
                    <PrimaryButton type="submit" ml={2}>Add</PrimaryButton>
                  </Box>
                </Form>
              )}
            </Formik>
            <ActionIcon
              variant="filled"
              color="lime"
              size="md"
              radius="md"
              mr={10}
              onClick={() => {
                if (inventries[0]?.customer?.phone) {
                  window.open(
                    `whatsapp://send?phone=${
                      inventries[0]?.customer?.phone
                    }&text=${structuresWathsData()}`
                  );
                } else {
                  shoeNotification("error", "Number Not Found");
                }
              }}
            >
              <IconBrandWhatsapp />
            </ActionIcon>
          </Box>
        </Grid.Col>
      </Grid>

      <Grid gutter={10}>
        <Grid.Col span={12} lg={6} className={classes.leftGrid}>
          <ScrollArea w={"100%"} p={0} mah={"70vh"}>
            <Grid gutter={10} w={"100%"}>
              <Grid.Col span={12} mt={10}>
                <Box className={classes.searchItemGrid}>
                  <TextInputViewNormal
                    onChange={(e) => debounceSearchItems(e.target.value)}
                    placeholder="Search Items"
                  />
                </Box>
              </Grid.Col>
              {isFetching ? (
                <Box className={classes.categoryEmptyBox}>
                  <Loader />
                </Box>
              ) : (
                <>
                  {!isFetching && menuData?.data?.target?.length ? (
                    <>
                      {menuData?.data?.target?.map((val) => (
                        <Grid.Col
                          span={4}
                          sm={3}
                          lg={2}
                          className={classes.items}
                          onClick={() => {
                            dispatch(
                              AddItemsInInventory({
                                ...val,
                                room: {
                                  roomID: location?.state?.roomID,
                                  room_name: location?.state?.room_name,
                                },
                                api: false,
                              })
                            );
                          }}
                        >
                          {showMenuImage === "1" && val?.photoURL ? (
                            <ImageCard
                              image={val?.photoURL}
                              title={val?.item_name}
                              comments={
                                val?.price ? `Price - ${val?.price} ₹` : null
                              }
                              comments2={
                                val?.half_price
                                  ? `Half - ${val?.half_price} ₹`
                                  : null
                              }
                            />
                          ) : (
                            <Box className={classes.CardProduct}>
                              <Text className={classes.product_item}>
                                {val?.item_name}
                              </Text>
                              {val?.price && (
                                <Text
                                  className={classes.product_price}
                                >{`Price - ${val?.price} ₹`}</Text>
                              )}
                              {val?.half_price && (
                                <Text
                                  className={classes.product_price}
                                >{`Half - ${val?.half_price} ₹`}</Text>
                              )}
                            </Box>
                          )}
                        </Grid.Col>
                      ))}
                    </>
                  ) : (
                    <Box className={classes.categoryEmptyMsgBox}>
                      <TextN1 className={classes.NoCatSelec}>
                        No Record Found
                      </TextN1>
                    </Box>
                  )}
                </>
              )}
            </Grid>
          </ScrollArea>

          <Grid
            gutter={5}
            w={"100%"}
            ml={1}
            mah={"15vh"}
            className={classes.extraChargeGrid}
          >
            {inventries[0]?.addOnCharges?.map((val) => (
              <>
                <Grid.Col span={4} sm={2} ml={5}>
                  <Box className={classes.addOnChargeGrid} pt={2} pb={2}>
                    <TextN1 className={classes.chargeName}>
                      {val?.charge_name}
                    </TextN1>
                    <TextN1 className={classes.chargeValue} ml={5}>
                      {val?.charge_price} ₹
                    </TextN1>
                  </Box>
                </Grid.Col>
              </>
            ))}
            <Grid.Col
              span={2}
              sm={1}
              ml={10}
              className={classes.addOnChargeGridClear}
              p={5}
            >
              {inventries[0]?.addOnCharges &&
                inventries[0]?.addOnCharges?.length !== 0 && (
                  <PrimaryButton
                    onClick={() => {
                      dispatch(RemoveRoomAddOnCharges(inventries[0]?.room));
                    }}
                    className={classes.chargeName}
                  >
                    Clear
                  </PrimaryButton>
                )}
            </Grid.Col>
          </Grid>
        </Grid.Col>

        <Grid.Col span={12} lg={6}>
          <Paper shadow="xl" className={classes.RightSection}>
            <Formik
              initialValues={{
                name: inventries[0]?.customer?.name ?? "",
                phone: inventries[0]?.customer?.phone ?? "",
                address: inventries[0]?.customer?.address ?? "",
              }}
              onSubmit={async (values) => {
                let temp = {
                  shopID: localStorage.getItem("shop_user_id"),
                  room: {
                    roomID: location?.state?.roomID,
                    room_name: location?.state?.room_name,
                  },
                  customer: {
                    name: values?.name,
                    address: values?.address,
                    phone: values?.phone,
                  },
                  inventories: [...inventries[0]?.inventories],
                  note: orderNote ?? inventries[0]?.note ?? null,
                  order_status: 1,
                  order_id: ORDER_ID,
                  // to fine room id we refrence this t-id and total
                  room_type_id: location?.state?.room_type_id,
                  total: currentTotal,
                  discount: currentDiscount,
                  addOnCharges: inventries[0]?.addOnCharges?.length
                    ? [...inventries[0]?.addOnCharges]
                    : [],
                  roomPrice:  inventries[0]?.roomPrice??0,
                  paymentMethod: inventries[0]?.paymentMethod??'Not Added'
                };
                try {
                  await saveOrderDetails.mutateAsync(temp, {
                    onSuccess: (res) => {
                      shoeNotification("success", "Order Placed");
                      dispatch(
                        AddItemsInInventory({
                          ...temp,
                          api: true,
                        })
                      );
                      // here
                      dispatch(
                        room_order_added({
                          order_id: res?.data?.order_id,
                          total: currentTotal,
                          room_id: location?.state?.roomID,
                          room_type_id: location?.state?.room_type_id,
                        })
                      );
                    },
                  });
                } catch (error) {
                  shoeNotification("error", "Somthing went wrong...");
                }
              }}
              enableReinitialize
              innerRef={formikRef}
            >
              {({ values, setFieldValue, handleChange, errors }) => (
                <Form>
                  <Grid gutter={5}>
                    <Grid.Col span={6} md={4}>
                      <TextInputView
                        id={"name"}
                        name={"name"}
                        label={"Customer Name"}
                        onChange={handleChange}
                        placeholder={"Enter Name"}
                        value={values.name}
                      />
                    </Grid.Col>
                    <Grid.Col span={6} md={4}>
                      <TextInputView
                        id={"phone"}
                        name={"phone"}
                        label={"Customer Phone"}
                        onChange={handleChange}
                        placeholder={"Enter Phone"}
                        value={values.phone}
                      />
                    </Grid.Col>
                    <Grid.Col span={12} md={4}>
                      <TextInputView
                        id={"address"}
                        name={"address"}
                        label={"Customer Address"}
                        onChange={handleChange}
                        placeholder={"Enter Address"}
                        value={values.address}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <RoomCustomeTable
                        formikRef={formikRef}
                        tdata={inventries[0]?.inventories}
                        inventries={inventries[0]}
                        room = {
                          {roomID: location?.state?.roomID,
                          room_name: location?.state?.room_name,}
                        }
                        tnote={orderNote ?? inventries[0]?.note ?? null}
                        tableHeight={"45vh"}
                        isSaveDisable={
                          (inventries[0]?.inventories?.length || inventries[0]?.roomPrice) ? false : true
                        }
                        setOpenNotes={setOpenNotes}
                        removeInventryAction={removeInventryAction}
                        handelConfirm={handelConfirm}
                        setIskotConfirmPopup={setIskotConfirmPopup}
                        ChangeQtyHandler={ChangeQtyHandler}
                        ChangePLateTypeHandler={ChangePLateTypeHandler}
                        clickedTableID={location?.state?.roomID}
                        TotalAmount={currentTotal}
                        setCurrentDiscount={setCurrentDiscount}
                        inventriesDiscount={inventries[0]?.discount}
                        isDeliveredFunction={isDeliveredFunction}
                        currentTotalWithoutGST={currentTotalWithoutGST}
                        ORDER_ID={ORDER_ID}
                      />
                    </Grid.Col>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid.Col>
      </Grid>

      <Modal
        opened={isChangeQtyUp}
        onClose={() => setIsChangeQtyUp(null)}
        title={`Change in Qty ${isChangeQtyUp?.item_name}`}
        size={"sm"}
        className={classes.model}
        centered
      >
        <Formik
          initialValues={{ qty: 1 }}
          onSubmit={(val) => {
            if (val?.qty >= 1) {
              dispatch(
                update_inventry_item_Qty({
                  room_ID: location?.state?.roomID,
                  room_type_id: location?.state?.room_type_id,
                  item: isChangeQtyUp,
                  newQty: val?.qty,
                })
              );
            }
            setIsChangeQtyUp(null);
          }}
        >
          {({ values, handleChange, errors }) => (
            <Form>
              <TextInputView
                id={"qty"}
                name={"qty"}
                label={"Add Item Qty"}
                onChange={handleChange}
                placeholder={"qty"}
                value={values?.qty}
                type={"number"}
              />
              <PrimaryButton mt={10} type="submit">
                add
              </PrimaryButton>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        opened={isChangePlateType}
        onClose={() => setIsChangePlateType(null)}
        title={`Change in Plate Size ${isChangePlateType?.item_name}`}
        className={classes.plate_type_modal}
        centered
      >
        <Formik
          initialValues={{ plate_type: isChangePlateType?.plate_type && "1" }}
          onSubmit={(val) => {
            if (val?.plate_type) {
              dispatch(
                update_inventry_item_Plate({
                  room_ID: location?.state?.roomID,
                  room_type_id: location?.state?.room_type_id,
                  item: isChangePlateType,
                  plate_type: val?.plate_type,
                })
              );
            }
            setIsChangePlateType(null);
          }}
          enableReinitialize
        >
          {({ values, handleChange, errors, setFieldValue }) => (
            <Form>
              <Select
                id={"plate_type"}
                name={"plate_type"}
                label={"Plate Size"}
                onChange={(value) => {
                  setFieldValue("plate_type", value);
                }}
                data={[
                  { value: "1", label: "Full Plate" },
                  { value: "2", label: "Half Plate" },
                ]}
                value={values?.plate_type}
              />
              <PrimaryButton mt={10} type="submit">
                add
              </PrimaryButton>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        opened={openNotes}
        onClose={() => setOpenNotes(false)}
        title="Notes"
        size={"xl"}
        className={classes.model}
        centered
      >
        <Formik
          initialValues={{ note: orderNote ?? inventries[0]?.note ?? "" }}
          onSubmit={(val) => {
            setOrderNote(val?.note);
            setOpenNotes(false);
          }}
        >
          {({ values, setFieldValue, handleChange, errors }) => (
            <Form className={classes.customeform}>
              <Textarea
                id="note"
                name="note"
                placeholder="Enter Notes"
                label="Order Notes"
                radius="md"
                size="md"
                onChange={handleChange}
                value={values?.note ?? ""}
              />
              <PrimaryButton mt={20} type="submit">
                Add Note
              </PrimaryButton>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        opened={openBarCodePopUp}
        onClose={() => setOpenBarCodePopUp(false)}
        title={`Room ${location?.state?.room_name}`}
        size={"xl"}
        className={classes.model}
        centered
      >
        <Box className={classes.qr_outer_box}>
          <Box ref={setComponentRef}>
            <Box className={classes.printWithTextQrBox}>
              <QRCode
                id="Room"
                value={`http://localhost:3000/shop-menu-card/${localStorage.getItem(
                  "shop_user_id"
                )}/22/${location?.state?.roomID}/${
                  location?.state?.room_type_id
                }/${location?.state?.room_name}/room`}
                size={550}
                level={"H"}
                includeMargin={true}
              />
              <TextN1 className={classes.printTableNameQR}>
                Room - {location?.state?.room_name}
              </TextN1>
            </Box>
          </Box>
          <Box>
            <PrimaryButton
              onClick={() => {
                downloadQR();
              }}
            >
              Download
            </PrimaryButton>
          </Box>
          <Box mt={10}>
            <ReactToPrint
              content={reactToPrintContent}
              documentTitle="E_Bill"
              onBeforeGetContent={handleOnBeforeGetContent}
              removeAfterPrint
              trigger={reactToPrintTrigger}
              print={customToPrint}
            />
          </Box>
        </Box>
      </Modal>

      <Modal
        opened={iskotConfirmPopup}
        onClose={() => setIskotConfirmPopup(false)}
        title={`Send Kot to Kitchen`}
        size={"md"}
        className={classes.model}
        centered
      >
        <TextN1 fw={700}>Do You Want to Send this Order KOT to Kitchen.</TextN1>
        <Divider my="xs" variant="dashed" />
        <TextN1 className={classes.info_to_save_order_before_kot}>
          Pls Save Order before Sending it.
        </TextN1>
        <Box className={classes.KotconfirmbtnBox} mt={20}>
          <PrimaryButton onClick={() => setIskotConfirmPopup(false)}>
            {" "}
            cancel{" "}
          </PrimaryButton>
          <PrimaryButton
            onClick={() => {
              kothandelClick();
            }}
          >
            {" "}
            Send KOT{" "}
          </PrimaryButton>
        </Box>
      </Modal>
    </Box>
  );
};

export default RoomInventory;
