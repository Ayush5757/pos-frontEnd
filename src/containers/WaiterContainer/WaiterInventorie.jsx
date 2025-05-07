import React, {
  useEffect,
  useState,
} from "react";
import {
  Badge,
  Box,
  Button,
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
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  confirm_order_table_inventries_API,
} from "../../services/api/inventory";
import {
  AddItemsInInventory,
  confirm_inventory,
  delivered_inventry_item,
  remove_inventory_item,
  update_inventry_item_Plate,
  update_inventry_item_Qty,
} from "../../redux/slices/InventorySelectedItem";
import { useSelector, useDispatch } from "react-redux";
import { shoeNotification } from "../../components/Notify";
import { Formik, Form } from "formik";
import { TextN1 } from "../../components/Text";
import { useDisclosure } from "@mantine/hooks";
import { PrimaryButton } from "../../components/Buttons";
import {
  table_order_added,
  table_order_confirm,
} from "../../redux/slices/Tables";
import { debounce } from "lodash";
import {
  getMenuItemsWaiter,
  inventries_fetch_by_tableid_API_Waiter,
  save_order_table_inventries_API_Waiter,
} from "../../services/api/waiter";
import DrawerCustomerWaiter from "../../components/DrawerCustome/DrawerCustomerWaiter";
import { useStyles } from "./stylewaiter";
import CustomeTableWaiter from "../../components/Tables/CustomeTableWaiter";

const WaiterInventorie = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const formikRef = React.useRef();
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();
  const [categoryID, setCategoryID] = useState();
  const [openNotes, setOpenNotes] = useState(false);
  const [orderNote, setOrderNote] = useState();
  const [ORDER_ID, setORDER_ID] = useState(location?.state?.orderID);
  const Table = useSelector((state) => state?.TablesReduser?.Tables);
  const [isChangeQtyUp, setIsChangeQtyUp] = useState(null);
  const [isChangePlateType, setIsChangePlateType] = useState(null);
  const [currentTotal, setCurrentTotal] = useState(0);
  const [currentTotalWithoutGST, setCurrentTotalWithoutGST] = useState(0);
  const [iskotConfirmPopup, setIskotConfirmPopup] = useState(false);
  const [searchItem, setSearchItem] = useState();
  const [currentDiscount, setCurrentDiscount] = useState(0);
  const [showImageMenu, setShowImageMenu] = useState(localStorage.getItem('showMenuImage')??false);

  const inventorie_items = useSelector(
    (state) => state?.InventoryReducer?.SelectedItems
  );

  const [inventries, setinventries] = useState(
    inventorie_items.filter(
      (val) => val?.table?.tableID === location?.state?.tableID
    )
  );

  if (Table?.length === 0) {
    navigate("/shop-tables-inventory");
  }

  useEffect(() => {
    if (!location?.state?.orderID && Table.length) {
      const table_data = Table?.filter(
        (val) => val?.table_type_id === location?.state?.table_type_id
      );
      const order_id = table_data[0]?.table_data?.filter(
        (val) => val?._id === location?.state?.tableID
      );
      if (order_id) {
        setORDER_ID(order_id[0]?.orderID);
      }
    }
  }, [Table]);

  const { data: inventorieData, refetch: inventry_fetch_by_tableID } = useQuery(
    {
      queryKey: ["inventries_fetch_by_tableid_API_Waiter"],
      queryFn: () =>
        inventries_fetch_by_tableid_API_Waiter({
          order_id: location?.state?.orderID,
        }),
      cacheTime: 0,
      // enabled: false,
    }
  );

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
    if (location?.state?.tableID) {
      setinventries(
        inventorie_items.filter(
          (val) => val?.table?.tableID === location?.state?.tableID
        )
      );
    }
  }, [inventorie_items]);

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
  }, [inventries, location?.state?.tableID]);

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
      inventry_fetch_by_tableID();
    }
  }, [location?.state?.orderID]);

  const {
    data: menuData,
    refetch: menuLoad,
    isFetching,
  } = useQuery({
    queryKey: ["getMenuItemsWaiter", categoryID, searchItem],
    queryFn: () => getMenuItemsWaiter(categoryID, searchItem),
    //   enabled: false,
  });

  const saveOrderDetails = useMutation({
    mutationFn: (newVal) => save_order_table_inventries_API_Waiter(newVal),
  });
  const confirmOrder = useMutation({
    mutationFn: (newVal) => confirm_order_table_inventries_API(newVal),
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
        tableID: location.state?.tableID,
        item_index: index,
      })
    );
  };

  const handelConfirm = async () => {
    try {
      const temp = {
        order_id: ORDER_ID,
        table_id: location?.state?.tableID,
        shop_id: localStorage.getItem("shop_user_id"),
        table_type_id: location?.state?.table_type_id,
      };
      await confirmOrder.mutateAsync(temp, {
        onSuccess: () => {
          shoeNotification("success", "Order Cofirmed");
          dispatch(confirm_inventory(temp?.table_id));
          dispatch(table_order_confirm({ ...temp }));
          navigate("/shop-tables-inventory");
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

  const debounceSearchItems = debounce((value) => {
    setSearchItem(value);
  }, 1000);

  const isDeliveredFunction = (val) => {
    dispatch(
      delivered_inventry_item({
        table_ID: location?.state?.tableID,
        table_type_id: location?.state?.table_type_id,
        item: val,
      })
    );
  };

  return (
    <Box pt={5}>
      <Grid gutter={0} w={"100%"}>
        <Grid.Col span={2} lg={1}>
          <DrawerCustomerWaiter
            opened={opened}
            open={open}
            close={close}
            CategoryHandelClick={CategoryHandelClick}
          />
        </Grid.Col>
        <Grid.Col span={8}>
          <Box className={classes.box_badge_table}>
            <Button
              variant="gradient"
              gradient={{ from: "#1a75ff", to: "#800080", deg: 105 }}
              onClick={() => navigate("/waiter-table-store")}
            >
              Tables
            </Button>

            <Badge
              variant="gradient"
              p={15}
              ml={10}
              gradient={{ from: "teal", to: "lime", deg: 105 }}
              className={classes.badge_table}
            >
              {Table?.length !== 0 &&
                `Table - ${location?.state?.table_name ?? ""}`}
            </Badge>
          </Box>
        </Grid.Col>
      </Grid>

      <Grid gutter={10}>
        <Grid.Col span={12} lg={6}>
          <ScrollArea w={"100%"} mah={"80vh"} p={0} className={classes.scroll}>
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
                                table: {
                                  tableID: location?.state?.tableID,
                                  table_name: location?.state?.table_name,
                                },
                                api: false,
                              })
                            );
                          }}
                        >
                          {(showImageMenu === '1' && val?.photoURL) ? (
                            <ImageCard
                            image={val?.photoURL}
                            title={val?.item_name}
                            comments={val?.price?`Price - ${val?.price} ₹`:null}
                            comments2={val?.half_price?`Half - ${val?.half_price} ₹`:null}
                            />
                          ) : (
                            <Box className={classes.CardProduct}>
                             <Text className={classes.product_item}>{val?.item_name}</Text>
                            {val?.price && <Text className={classes.product_price}>{`Price - ${val?.price} ₹`}</Text>}
                            {val?.half_price && <Text className={classes.product_price}>{`Half - ${val?.half_price} ₹`}</Text>}
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
                  table: {
                    tableID: location?.state?.tableID,
                    table_name: location?.state?.table_name,
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
                  // to fine table id we refrence this t-id and total
                  table_type_id: location?.state?.table_type_id,
                  total: currentTotal,
                  discount: currentDiscount,
                  addOnCharges: inventries[0]?.addOnCharges?.length
                  ? [...inventries[0]?.addOnCharges]
                  : [],
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
                        table_order_added({
                          order_id: res?.data?.order_id,
                          total: currentTotal,
                          table_id: location?.state?.tableID,
                          table_type_id: location?.state?.table_type_id,
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
                    <Grid.Col span={6}>
                      <TextInputView
                        id={"name"}
                        name={"name"}
                        label={"Customer Name"}
                        onChange={handleChange}
                        placeholder={"Enter Name"}
                        value={values.name}
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <TextInputView
                        id={"phone"}
                        name={"phone"}
                        label={"Customer Phone"}
                        onChange={handleChange}
                        placeholder={"Enter Phone"}
                        value={values.phone}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <TextInputView
                        id={"address"}
                        name={"address"}
                        label={"Customer Address"}
                        onChange={handleChange}
                        placeholder={"Enter Address"}
                        value={values.address}
                      />
                    </Grid.Col>
                    <Grid.Col span={12} mah={"70vh"}>
                      <CustomeTableWaiter
                        formikRef={formikRef}
                        tdata={inventries[0]?.inventories}
                        tnote={orderNote ?? inventries[0]?.note ?? null}
                        tableHeight={"45vh"}
                        isSaveDisable={
                          inventries[0]?.inventories?.length ? false : true
                        }
                        setOpenNotes={setOpenNotes}
                        removeInventryAction={removeInventryAction}
                        handelConfirm={handelConfirm}
                        setIskotConfirmPopup={setIskotConfirmPopup}
                        ChangeQtyHandler={ChangeQtyHandler}
                        ChangePLateTypeHandler={ChangePLateTypeHandler}
                        clickedTableID={location?.state?.tableID}
                        TotalAmount={currentTotal}
                        setCurrentDiscount={setCurrentDiscount}
                        inventriesDiscount={inventries[0]?.discount}
                        isDeliveredFunction={isDeliveredFunction}
                        currentTotalWithoutGST={currentTotalWithoutGST}
                      />
                    </Grid.Col>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid.Col>
        {inventries[0]?.addOnCharges?.length > 0 && (
          <>
            <TextN1 ml={10}>Extra Charges</TextN1>
            <Grid
              gutter={5}
              w={"100%"}
              ml={1}
              mah={"15vh"}
              className={classes.extraChargeGrid}
            >
              {inventries[0]?.addOnCharges?.map((val) => (
                <>
                  <Grid.Col
                    span={6}
                    sm={4}
                    md={3}
                  >
                    <Box className={classes.addOnChargeGrid}>
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
            </Grid>
          </>
        )}
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
            console.log("submitInven");
            if (val?.qty >= 1) {
              dispatch(
                update_inventry_item_Qty({
                  table_ID: location?.state?.tableID,
                  table_type_id: location?.state?.table_type_id,
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
                  table_ID: location?.state?.tableID,
                  table_type_id: location?.state?.table_type_id,
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
    </Box>
  );
};

export default WaiterInventorie;
