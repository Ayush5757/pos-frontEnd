import {
  ActionIcon,
  Box,
  Button,
  Grid,
  LoadingOverlay,
  Modal,
  Pagination,
  ScrollArea,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import React, { useEffect, useMemo, useState } from "react";
import { TextInputViewNormal } from "../../components/Inputs";
import { PrimaryButton } from "../../components/Buttons";
import { useStyles } from "./style";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import {
  deleteOrder,
  getOrderInformation,
  getOrderList,
} from "../../services/api/orderList";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TextN1 } from "../../components/Text";
import moment from "moment";
import { Formik, Form } from "formik";
import { shoeNotification } from "../../components/Notify";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [selectDate, setSelectDate] = useState(new Date());
  const [selectName, setSelectName] = useState("");
  const [selectPhone, setSelectPhone] = useState("");
  const [selectedOrderID, setSelectedOrderID] = useState(null);
  const [openOrderInfoPopup, setOpenOrderInfoPopup] = useState(false);
  const [deleteOrderID, setdeleteOrderID] = useState(null);
  const [page, setPage] = useState(1);
  const [
    messageToSentOnWathsAppWithEdits,
    setMessageToSentOnWathsAppWithEdits,
  ] = useState("");
  const [messageData, setMessageData] = useState("");

  useEffect(() => {
    const temp = localStorage.getItem("wathsappmessage");
    if (temp) {
      setMessageData(() => temp);
      const formattedMessage = temp.replace(/%0A/g, "\n");
      setMessageToSentOnWathsAppWithEdits(() => formattedMessage);
    }
  }, []);

  const { data, refetch } = useQuery({
    queryKey: ["getOrderList"],
    queryFn: () => getOrderList(selectDate, selectName, selectPhone, page),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [page]);

  const {
    data: OrderSpecificInformation,
    refetch: OrderRefetch,
    isFetching,
  } = useQuery({
    queryKey: ["getOrderInformation"],
    queryFn: () => getOrderInformation(selectedOrderID),
    enabled: false,
  });

  const handelClick = () => {
    if (selectName || selectPhone || selectDate) {
      setPage(()=>1)
      refetch();
    }
  };

  const handelClickName = (order_id) => {
    if (order_id === selectedOrderID) {
      setOpenOrderInfoPopup(true);
    } else {
      setSelectedOrderID(order_id);
      setOpenOrderInfoPopup(true);
    }
  };

  useEffect(() => {
    if (selectedOrderID) {
      OrderRefetch();
    }
  }, [selectedOrderID]);

  useEffect(() => {
    if (selectDate) {
      refetch();
    }
  }, []);

  const deleteOrders = useMutation({
    mutationFn: (newVal) => deleteOrder(newVal),
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Item Name",
        Cell: ({ renderedCellValue, cell }) => (
          <Box
            className={classes.Col1}
            onClick={() => {
              if (cell?.row?.original?._id) {
                handelClickName(cell?.row?.original?._id);
              }
            }}
          >
            <span className={classes.customer_name}>
              {cell?.row?.original?.customer?.name?.length
                ? cell?.row?.original?.customer?.name
                : "--"}
            </span>
          </Box>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        Cell: ({ renderedCellValue, cell }) => (
          <Box
            className={`${classes.Col1} ${classes.withPhone}`}
            onClick={() => {
              window.open(
                `whatsapp://send?phone=${cell?.row?.original?.customer?.phone}&text=${messageData}`
              );
            }}
          >
            <span className={classes.phone}>
              {cell?.row?.original?.customer?.phone?.length
                ? cell?.row?.original?.customer?.phone
                : "--"}
            </span>
            {cell?.row?.original?.customer?.phone?.length > 0 && (
              <ActionIcon
                variant="filled"
                color="lime"
                size="sm"
                radius="md"
                ml={5}
              >
                <IconBrandWhatsapp />
              </ActionIcon>
            )}
          </Box>
        ),
      },
      {
        accessorKey: "table",
        header: "Table",
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.Col1}>
            <span>
              {cell?.row?.original?.table?.table_name?.length
                ? cell?.row?.original?.table?.table_name
                : "--"}
            </span>
          </Box>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.Col1} onClick={() => {}}>
            <span>{cell?.row?.original?.total ?? "--"}</span>
          </Box>
        ),
      },
      {
        accessorKey: "delete",
        header: "Remove Order",
        size: 30,
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.Col1} onClick={() => {}}>
            <ActionIcon
              variant="filled"
              color="red"
              size="md"
              radius="md"
              p={3}
              onClick={() => {
                setdeleteOrderID(cell?.row?.original?._id);
              }}
            >
              <IconTrash />
            </ActionIcon>
          </Box>
        ),
      },
    ],
    [messageToSentOnWathsAppWithEdits]
  );
  const table = useMantineReactTable({
    columns,
    data: data?.data?.target ?? [],
    enablePagination: false,
    enableRowNumbers: false,
    manualSorting: false,
    manualFiltering: false,
    enableSorting: false,
    enableStickyHeader: true,
    enableTopToolbar: false,
    enableColumnActions: false,
    enableResizing: true,
    enableStickyFooter: false,
    mantineTableContainerProps: {
      sx: { maxHeight: "100%" },
    },
  });
  return (
    <>
      <Box mt={20} p={"0 5px"}>
        <Grid
          bg={"#ffefcc"}
          className={classes.Outer_Grid}
          p={"0 10px 5px 5px"}
        >
          <Grid.Col span={12}>
            <PrimaryButton onClick={() => navigate("/room-order-list")}>
              Go to Rooms Orders
            </PrimaryButton>
          </Grid.Col>

          <Grid.Col span={12} xs={6} sm={6} md={4} lg={3}>
            <Box className={classes.SearchBox}>
              <DatePickerInput
                label="Select Date"
                placeholder="Pick date"
                w={"100%"}
                value={selectDate}
                onChange={setSelectDate}
                clearable
              />
              <PrimaryButton ml={4} onClick={handelClick}>
                Search
              </PrimaryButton>
            </Box>
          </Grid.Col>
          <Grid.Col span={12} xs={6} sm={6} md={4} lg={3}>
            <Box className={classes.SearchBox}>
              <TextInputViewNormal
                label="Search by Name"
                placeholder="Name"
                size="sm"
                w={"100%"}
                onChange={(e) => {
                  setSelectName(e.target.value);
                }}
              />
              <PrimaryButton ml={4} onClick={handelClick}>
                Search
              </PrimaryButton>
            </Box>
          </Grid.Col>
          <Grid.Col span={12} xs={6} sm={6} md={4} lg={3}>
            <Box className={classes.SearchBox}>
              <TextInputViewNormal
                label="Search by Phone Number"
                placeholder="Phone Number"
                size="sm"
                w={"100%"}
                onChange={(e) => {
                  setSelectPhone(e.target.value);
                }}
              />
              <PrimaryButton ml={4} onClick={handelClick}>
                Search
              </PrimaryButton>
            </Box>
          </Grid.Col>

          <Grid.Col span={12} xs={6} sm={6} md={4} lg={3}>
            <Formik
              initialValues={{ message: messageToSentOnWathsAppWithEdits }}
              onSubmit={(val) => {
                const formattedMessage = val?.message.replace(/\n/g, "%0A");
                localStorage.setItem("wathsappmessage", formattedMessage);
                const formattedMessageOposit = formattedMessage.replace(
                  /%0A/g,
                  "\n"
                );
                setMessageToSentOnWathsAppWithEdits(
                  () => formattedMessageOposit
                );
                setMessageData(() => formattedMessage);
                shoeNotification("success", "Message Saved");
              }}
              enableReinitialize
            >
              {({ values, handleChange, errors }) => (
                <Form>
                  <Textarea
                    name="message"
                    placeholder="Enter Your Message"
                    label="Message To Send"
                    autosize
                    minRows={1}
                    onChange={handleChange}
                    value={values?.message}
                  />
                  <PrimaryButton type="submit" mt={5} ml={2}>
                    Save
                  </PrimaryButton>
                </Form>
              )}
            </Formik>
          </Grid.Col>
          <Grid.Col span={12}>
            <TextN1>Order List</TextN1>
          </Grid.Col>
        </Grid>
      </Box>
      <Box mt={30} >
        <MantineReactTable table={table}  />
      </Box>

      <Box mt={50}> 
        {/* {data && ( */}
          <Grid gutter={12}>
            <Grid.Col
              span={2}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              {data?.data?.pageInfo?.currentPage > 1 &&
                data?.data?.pageInfo?.currentPage <= data?.data?.pageInfo?.totalPages && (
                  <Button
                    onClick={() => {
                      window.scrollTo({ bottom: 0, behavior: "smooth" });
                      setPage(data?.data?.pageInfo?.currentPage - 1);
                    }}
                  >
                    Prev
                  </Button>
                )}
            </Grid.Col>


            <Grid.Col span={8} className={classes.paginationGrid}>
              <Pagination onChange={(val)=>{
                 window.scrollTo({ bottom: 0, behavior: "smooth" });
                 setPage(val);
              }} value={data?.data?.pageInfo?.currentPage} total={data?.data?.pageInfo?.totalPages} size="sm" radius="md" withControls={false} />
            </Grid.Col>


            <Grid.Col
              span={2}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              {data?.data?.pageInfo?.currentPage < data?.data?.pageInfo?.totalPages && (
                <Button
                  onClick={() => {
                    window.scrollTo({ bottom: 0, behavior: "smooth" });
                    setPage(data?.data?.pageInfo?.currentPage + 1);
                  }}
                >
                  Next
                </Button>
              )}
            </Grid.Col>
          </Grid>
        {/* )} */}
      </Box>


      <Modal
        opened={openOrderInfoPopup}
        size="65%"
        onClose={() => setOpenOrderInfoPopup(false)}
        title="Completed Order"
        centered
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <Grid>
          <Grid.Col span={6}>
            <Box className={classes.infoBox}>
              <TextN1 className={classes.key}>
                Name -
                <span className={classes.value}>
                  {OrderSpecificInformation?.data?.target?.customer?.name}
                </span>
              </TextN1>
            </Box>
            <Box className={classes.infoBox}>
              <TextN1 className={classes.key}>
                Phone Number -
                <span className={classes.value}>
                  {OrderSpecificInformation?.data?.target?.customer?.phone}
                </span>
              </TextN1>
            </Box>
            <Box className={classes.infoBox}>
              <TextN1 className={classes.key}>
                Address -
                <span className={classes.value}>
                  {OrderSpecificInformation?.data?.target?.customer?.address}
                </span>
              </TextN1>
            </Box>
            <Box className={classes.infoBox}>
              <TextN1 className={classes.key}>
                Date -
                <span className={classes.value}>
                  {moment(
                    OrderSpecificInformation?.data?.target?.createdAt
                  ).format("YYYY-MM-DD hh:mm:ss A")}
                </span>
              </TextN1>
            </Box>
            <Box className={classes.infoBox}>
              <TextN1 className={classes.key}>
                Payment Method -
                <span className={classes.value}>
                  {
                    OrderSpecificInformation?.data?.target?.paymentMethod
                  }
                </span>
              </TextN1>
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box className={classes.infoBox}>
              <TextN1 className={classes.key}>
                Total -
                <span className={classes.value} style={{ color: "green" }}>
                  {OrderSpecificInformation?.data?.target?.total} ₹
                </span>
              </TextN1>
            </Box>
            <Box className={classes.infoBox}>
              <TextN1 className={classes.key}>
                Table No -
                <span className={classes.value} style={{ color: "orangered" }}>
                  {OrderSpecificInformation?.data?.target?.table?.table_name}
                </span>
              </TextN1>
            </Box>
            <Box className={classes.infoBox}>
              <TextN1 className={classes.key}>
                Notes -
                <span className={classes.value}>
                  {OrderSpecificInformation?.data?.target?.note}
                </span>
              </TextN1>
            </Box>
            <Box className={classes.infoBox}>
              <TextN1 className={classes.key}>
                Discount -
                <span className={classes.value}>
                  {OrderSpecificInformation?.data?.target?.discount} ₹
                </span>
              </TextN1>
            </Box>
            <Box className={classes.infoBox}>
              <TextN1 className={classes.key}>
                Order Type -
                <span className={classes.value}>
                  {OrderSpecificInformation?.data?.target?.table ? (
                    "Table Order"
                  ) : OrderSpecificInformation?.data?.target?.onlineOrder ? (
                    OrderSpecificInformation?.data?.target?.onlineOrder ===
                    1 ? (
                      <span className={classes.zomato}>Zomato</span>
                    ) : (
                      <span className={classes.swigy}>Swigy</span>
                    )
                  ) : (
                    "Quick Order"
                  )}
                </span>
              </TextN1>
            </Box>
          </Grid.Col>
          <Grid.Col span={12}>
            <Grid
              mt={10}
              style={{
                borderBottom: "1px solid #e0e0eb",
                borderTop: "1px solid #e0e0eb",
              }}
            >
              <Grid.Col span={1} fw={700}>
                S.No
              </Grid.Col>
              <Grid.Col span={3} fw={700}>
                Item Name
              </Grid.Col>
              <Grid.Col span={1} fw={700}>
                Qty
              </Grid.Col>
              <Grid.Col span={2} fw={700}>
                Plate Size
              </Grid.Col>
              <Grid.Col span={2} fw={700}>
                Price
              </Grid.Col>
              <Grid.Col span={3} fw={700}>
                Total
              </Grid.Col>
            </Grid>
            {OrderSpecificInformation?.data?.target?.inventories?.map(
              (val, index) => (
                <Grid mt={10} key={index}>
                  <Grid.Col span={1}>{`${index + 1} )`}</Grid.Col>
                  <Grid.Col span={3}>{val?.item_name}</Grid.Col>
                  <Grid.Col span={1}>{val?.qty}</Grid.Col>
                  <Grid.Col span={2}>
                    {val?.plate_type === "1" ? "Full" : "Half"}
                  </Grid.Col>
                  <Grid.Col span={2}>
                    {val?.plate_type === "1" ? val?.price : val?.half_price} ₹
                  </Grid.Col>
                  <Grid.Col span={3}>
                    {val?.plate_type === "1"
                      ? val?.qty * val?.price
                      : val?.qty * val?.half_price}{" "}
                    ₹
                  </Grid.Col>
                </Grid>
              )
            )}
          </Grid.Col>
        </Grid>
      </Modal>
      <Modal
        opened={deleteOrderID}
        size="sm"
        onClose={() => setdeleteOrderID(null)}
        title="Delete Order"
        centered
      >
        <TextN1> Do You Want To Delete This Order List </TextN1>
        <Box mt={10} className={classes.deleteBtnBox}>
          <PrimaryButton onClick={() => setdeleteOrderID(null)}>
            Cancel
          </PrimaryButton>
          <PrimaryButton
            onClick={async () => {
              try {
                await deleteOrders.mutateAsync(
                  { order_id: deleteOrderID },
                  {
                    onSuccess: (res) => {
                      refetch();
                      shoeNotification("success", "Order Deleted");
                      setdeleteOrderID(null);
                    },
                  }
                );
              } catch (error) {
                shoeNotification("error", error);
              }
            }}
          >
            Yes
          </PrimaryButton>
        </Box>
      </Modal>
      <LoadingOverlay visible={isFetching} />
    </>
  );
};

export default OrderList;
