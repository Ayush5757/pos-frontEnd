import { useEffect, useMemo, useRef, useState } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Grid,
  Image,
  Indicator,
  LoadingOverlay,
  Modal,
  NumberInput,
  Paper,
  Select,
  Switch,
  Text,
} from "@mantine/core";
import { createStyles, rem } from "@mantine/core";
import { IconCircleXFilled, IconMessage2Heart } from "@tabler/icons-react";
import { useDispatch } from "react-redux";

import {
  NumberInputViewNormal,
  TextInputView,
  TextInputViewNormal,
} from "../Inputs";
import { PrimaryButton } from "../Buttons";
import { shoeNotification } from "../Notify";
import { TextN1 } from "../Text";
import ReactToPrint from "react-to-print";
import moment from "moment";
import { Form, Formik } from "formik";
import {
  AddChargesInFastInventory,
  AddFastInventorieItem,
  PaymentMethodFastOrder,
} from "../../redux/FastOrderInventorie";
import { useQuery } from "@tanstack/react-query";
import { get_user_bar_code } from "../../services/api/user";

export const useStyles = createStyles((theme) => ({
  Wraper: {
    table: {
      thead: {
        tr: {
          backgroundColor: "#1a75ff !important",
          color: "#ffffff",
        },
      },
    },
    ".mantine-vl6xmj": {
      display: "none",
    },
  },
  Col1: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "2px",
  },
  scroll_container: {
    "@media print": {
      overflow: "visible !important",
      height: "fit-content !important",
    },
  },
  totalamountonBill: {
    fontWeight: 700,
    letterSpacing: 0.5,
    backgroundColor: "#1a75ff",
    padding: "5px 5px",
    borderRadius: "5px",
  },
  shop_name: {
    display: "flex",
    justifyContent: "center",
    fontWeight: 700,
  },
  thankyouMsg: {
    display: "flex",
    justifyContent: "center",
  },
  printSubTotal: {
    display: "flex",
    justifyContent: "flex-end",
  },
  discountandAddItemBox: {
    display: "flex",
    justifyContent: "space-between",
  },
  extraName: {
    lineHeight: "14px",
    marginTop: "5px",
  },
  togelBox: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: "5px",
    label: {
      backgroundColor: "#3399ff !important",
    },
  },
  barcodeGrid: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  barcodeImage: {
    width: "70% !important",
    marginTop: "10px",
  },
  calculatePositive: {
    color: "green",
  },
  calculateNegative: {
    color: "red",
  },
  totalPaper: {
    backgroundColor: "gray !important",
    "@media (max-width: 1024px)": {
      backgroundColor: "#1a75ff !important",
    },
  },
  total: {
    fontWeight: "bold",
    color: "#ffffff",
  },
  gst: {
    backgroundColor: "#ff471a",
    color: "#ffffff",
    padding: "5px",
    borderRadius: "3px",
    "@media (max-width: 1024px)": {
      backgroundColor: "#1a75ff !important",
    },
  },
  gst_total: {
    backgroundColor: "#009900",
    color: "#ffffff",
    padding: "5px 0px 5px 5px",
    borderRadius: "3px",
    "@media (max-width: 1024px)": {
      backgroundColor: "#1a75ff !important",
    },
  },
  Formik: {
    input: {
      border: "1px solid #a1a8af !important",
    },
  },
}));

const FastOrderCustomeTable = ({
  formikRef,
  tdata,
  tnote,
  setOpenNotes,
  removeInventryAction,
  setCurrentDiscount,
  tableHeight,
  ChangeQtyHandler,
  ChangePLateTypeHandler,
  currentTotal,
  currentDiscount,
  SaveFastOrder,
  handelDone,
  handelKot,
  fast_inventorie_items,
}) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const [isAlertSave, setisAlertSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const componentRef = useRef(null);
  const [PRINT_VIEW, setPRINT_VIEW] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [newItem, setNewItem] = useState(false);
  const [newCharge, setNewCharge] = useState(false);
  const [calculateCharge, setcalculateCharge] = useState(null);
  const [calculateInput, setcalculateInput] = useState(null);
  const [showBarcode, setshowBarcode] = useState(false);

  const getAddress = () => {
    let temp = localStorage.getItem("address");
    if (temp && temp !== "undefined" && temp !== null && temp !== "null") {
      return temp;
    }
    return "--";
  };
  const getPhone = () => {
    let temp = localStorage.getItem("phone");
    if (temp && temp !== "undefined" && temp !== null && temp !== "null") {
      return temp;
    }
    return "--";
  };
  const getGstInLocal = () => {
    let temp = localStorage.getItem("GSTIN");
    if (temp && temp !== "undefined" && temp !== null && temp !== "null") {
      return temp;
    }
    return "--";
  };

  const discountTotal = () => {
    setCurrentDiscount(discountAmount);
  };

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["get_user_barcode"],
    queryFn: () => get_user_bar_code(),
    enabled: showBarcode ? true : false,
  });

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
    return <PrimaryButton>Print And Display all content</PrimaryButton>;
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

  const columns = useMemo(
    () => [
      {
        accessorKey: "item_name",
        header: "Item Name",
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.Col1}>
            <ActionIcon
              variant="transparent"
              color="red"
              onClick={() => {
                removeInventryAction(cell?.row?.index);
              }}
            >
              <IconCircleXFilled />
            </ActionIcon>
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        Cell: ({ renderedCellValue, cell }) => (
          <Box
            className={classes.Col1}
            onClick={() => {
              if (cell?.row?.original?.half_price) {
                ChangePLateTypeHandler(cell?.row?.index);
              } else {
                shoeNotification("success", "Don't Have Half Plate");
              }
            }}
          >
            <span>
              {cell?.row?.original?.plate_type === "1"
                ? `${cell?.row?.original?.price} ₹ ${
                    cell?.row?.original?.half_price ? "F" : ""
                  }`
                : `${cell?.row?.original?.half_price} ₹ H`}
            </span>
          </Box>
        ),
      },
      {
        accessorKey: "qty",
        header: "Qty",
        Cell: ({ renderedCellValue, cell }) => (
          <Box
            className={classes.Col1}
            onClick={() => {
              ChangeQtyHandler(cell?.row?.index);
            }}
          >
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: "product_amount",
        header: "Total",
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.Col1}>
            <span>
              {cell?.row?.original?.plate_type === "1"
                ? cell?.row?.original?.qty * cell?.row?.original?.price
                : cell?.row?.original?.qty *
                  cell?.row?.original?.half_price}{" "}
              ₹
            </span>
          </Box>
        ),
      },
    ],
    []
  );
  const table = useMantineReactTable({
    columns,
    data: tdata ?? [],
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
      sx: { maxHeight: tableHeight },
    },
  });

  const save = () => {
    setisAlertSave(true);
  };

  return (
    <Box className={classes.Wraper}>
      <MantineReactTable table={table} />
      <Paper
        shadow="xl"
        mt={5}
        w={"100%"}
        p={"7px 10px 5px 10px"}
        className={classes.totalPaper}
      >
        <Grid gutter={0}>
          <Grid.Col span={12} md={1} lg={1}>
            <Text className={classes.total}>Total</Text>
          </Grid.Col>
          <Grid.Col span={12} lg={3}>
            <span className={classes.gst}>
              SGST 9% - {parseFloat((currentTotal?.total * 9) / 100).toFixed(2)}
            </span>
          </Grid.Col>
          <Grid.Col span={12} md={5} lg={3}>
            <span className={classes.gst}>
              CGST 9% - {parseFloat((currentTotal?.total * 9) / 100).toFixed(2)}
            </span>
          </Grid.Col>
          <Grid.Col span={12} md={12} lg={5}>
            <span className={classes.gst_total}>
              {parseInt(currentTotal?.total)} ₹ + {"GST ="}{" "}
              <span className={classes.totalamountonBill}>
                {parseInt(currentTotal?.total_with_GST)} ₹
              </span>
            </span>
          </Grid.Col>
        </Grid>
      </Paper>
      <Box className={classes.discountandAddItemBox} mt={5}>
        <TextN1 mt={5} pl={"10px"}>
          {" "}
          Discount Amount - {fast_inventorie_items?.discount ?? 0} ₹
        </TextN1>
        <ActionIcon
          variant="gradient"
          size="sm"
          aria-label="Gradient action icon"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
          mt={2}
          onClick={() => setNewItem(true)}
        >
          +
        </ActionIcon>
      </Box>

      <Paper shadow="xl" mt={5} w={"100%"} p={"10px 10px 0px 10px"}>
        <Grid gutter={7}>
          <Grid.Col span={3} sm={3}>
            <Button
              variant="gradient"
              gradient={{ from: "#1a75ff", to: "#800080", deg: 105 }}
              onClick={() => {
                if (tdata?.length !== 0) {
                  setDiscountAmount(0);
                  SaveFastOrder();
                } else {
                  shoeNotification("error", "Please Add Items First");
                }
              }}
            >
              Save
            </Button>
          </Grid.Col>

          <Grid.Col span={4} sm={3}>
            <Button
              variant="gradient"
              gradient={{ from: "#1a75ff", to: "#800080", deg: 105 }}
              onClick={() => setOpenNotes(true)}
            >
              Add Notes
              {tnote && (
                <ActionIcon variant="transparent">
                  <IconMessage2Heart color="#ffff66" size="1.125rem" />
                </ActionIcon>
              )}
            </Button>
          </Grid.Col>

          <Grid.Col span={2} sm={2}>
            <Button
              variant="gradient"
              gradient={{ from: "#1a75ff", to: "#800080", deg: 105 }}
              onClick={() => {
                handelKot();
              }}
            >
              Kot
            </Button>
          </Grid.Col>

          <Grid.Col span={4} sm={1.5}>
            <Button
              variant="gradient"
              gradient={{ from: "#1a75ff", to: "#800080", deg: 105 }}
              onClick={() => {
                handelDone();
              }}
            >
              Done
            </Button>
          </Grid.Col>

          <Grid.Col span={3} sm={2}>
            <Button
              variant="gradient"
              gradient={{ from: "#1a75ff", to: "#800080", deg: 105 }}
              onClick={() => {
                setPRINT_VIEW(!PRINT_VIEW);
              }}
            >
              View
            </Button>
          </Grid.Col>
          <Grid.Col span={3} sm={3}>
            <PrimaryButton
              variant="gradient"
              gradient={{ from: "#1a75ff", to: "#800080", deg: 105 }}
              onClick={() => {
                if (tdata.length !== 0) {
                  save();
                } else {
                  shoeNotification("error", "Chose Food Items");
                }
              }}
            >
              Order Complete
            </PrimaryButton>
          </Grid.Col>

          <Grid.Col span={12} sm={3}>
            <NumberInputViewNormal
              value={discountAmount}
              min={0}
              onChange={(val) => {
                setDiscountAmount(val);
              }}
              placeHolder="Discount Amount"
            />
          </Grid.Col>
          <Grid.Col span={12} sm={6} md={6} lg={6}>
            <PrimaryButton
              onClick={() => {
                discountTotal();
              }}
            >
              Discount
            </PrimaryButton>
            <PrimaryButton
              onClick={() => {
                setNewCharge(true);
              }}
              ml={10}
            >
              + Charge
            </PrimaryButton>
            <PrimaryButton
              onClick={() => {
                setcalculateCharge(currentTotal?.total_with_GST);
              }}
              ml={10}
            >
              Calculate
            </PrimaryButton>
          </Grid.Col>
          <Grid.Col span={12} xs={6} sm={4} lg={4}>
            <Select
              maw={"100%"}
              placeholder="Payment"
              data={["Cash", "Card", "UPI", "Other", "None"]}
              onChange={(val) => {
                dispatch(
                  PaymentMethodFastOrder({ paymentMethod: val })
                );
              }}
              value={fast_inventorie_items?.paymentMethod ?? []}
            />
          </Grid.Col>
        </Grid>
      </Paper>

      <Modal
        opened={isAlertSave}
        onClose={() => setisAlertSave(!isAlertSave)}
        title="Reminder"
        size={"xl"}
        className={classes.model}
        centered
      >
        <TextN1> Are You Sure You Want To Comple This Order. </TextN1>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <PrimaryButton
            mt={20}
            onClick={() => {
              setisAlertSave(!isAlertSave);
            }}
          >
            NO
          </PrimaryButton>
          <PrimaryButton
            mt={20}
            onClick={() => {
              setisAlertSave(!isAlertSave);
              formikRef.current.submitForm();
            }}
          >
            YES
          </PrimaryButton>
        </Box>
      </Modal>

      <Modal
        opened={PRINT_VIEW}
        onClose={() => {
          setshowBarcode(() => false);
          setPRINT_VIEW(!PRINT_VIEW);
        }}
        title="Bill Print"
        size={"sm"}
        className={classes.model}
        centered
      >
        <Box className={classes.scroll_container} ref={setComponentRef}>
          <Grid gutter={0} p={10}>
            <Grid.Col span={12} className={classes.shop_name}>
              <Text>{localStorage.getItem("shopName")}</Text>
            </Grid.Col>
            <Grid.Col span={8} mt={5}>
              <Text fz={"12px"}>
                Bill No: {fast_inventorie_items?._id ?? "--"}
              </Text>
            </Grid.Col>
            <Grid.Col
              fz={"12px"}
              span={4}
              mt={5}
              className={classes.printSubTotal}
            >
              <Text>Date: {moment(new Date()).format("DD/MM/YYYY")}</Text>
            </Grid.Col>
            <Grid.Col span={12} fz={"12px"} mt={2}>
              <Text lh={"1rem"}>Phone: {getPhone()}</Text>
            </Grid.Col>
            <Grid.Col span={12} fz={"12px"} mt={2}>
              <Text lh={"1rem"}>Address: {getAddress()}</Text>
            </Grid.Col>
            <Grid.Col
              span={12}
              fz={"12px"}
              mt={2}
              className={classes.thankyouMsg}
            >
              <Text lh={"1rem"}>GSTIN: {getGstInLocal()}</Text>
            </Grid.Col>

            <Grid.Col span={12} mt={5} mb={5}>
              <Divider color="#c2c2d6" />
            </Grid.Col>
            <Grid.Col span={5}>
              <Text fw={700}>Item</Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <Text fw={700}>Qty</Text>
            </Grid.Col>
            <Grid.Col span={2}>
              <Text fw={700}>Price</Text>
            </Grid.Col>
            <Grid.Col span={3}>
              <Text fw={700} className={classes.printSubTotal}>
                Total
              </Text>
            </Grid.Col>
            {tdata?.map((val, index) => (
              <>
                <Grid.Col span={5}>
                  <Text>{`${index + 1}) ${val?.item_name}`}</Text>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Text>{`${val?.qty} ${
                    val?.plate_type === "1" ? "" : "H"
                  }`}</Text>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Text>
                    {val?.plate_type === "1" ? val?.price : val?.half_price} ₹
                  </Text>
                </Grid.Col>
                <Grid.Col span={3} className={classes.printSubTotal}>
                  <Text>
                    {val?.plate_type === "1"
                      ? val?.qty * val?.price
                      : val?.qty * val?.half_price}{" "}
                    ₹
                  </Text>
                </Grid.Col>
              </>
            ))}
            <Grid.Col span={12} mt={3} mb={3}>
              <Divider color="#c2c2d6" />
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>SUB TOTAL</Text>
            </Grid.Col>
            <Grid.Col span={6} className={classes.printSubTotal}>
              <Text>{currentTotal?.total} ₹</Text>
            </Grid.Col>

            <Grid.Col span={6}>
              <Text>Add CGST 9%</Text>
            </Grid.Col>
            <Grid.Col span={6} className={classes.printSubTotal}>
              <Text>
                {parseFloat((currentTotal?.total * 9) / 100).toFixed(2)} ₹
              </Text>
            </Grid.Col>

            <Grid.Col span={6}>
              <Text>Add SGST 9%</Text>
            </Grid.Col>
            <Grid.Col span={6} className={classes.printSubTotal}>
              <Text>
                {parseFloat((currentTotal?.total * 9) / 100).toFixed(2)} ₹
              </Text>
            </Grid.Col>

            {fast_inventorie_items?.addOnCharges?.length > 0 ? (
              <>
                {fast_inventorie_items?.addOnCharges?.map((val) => (
                  <>
                    <Grid.Col span={6}>
                      <Text className={classes.extraName}>
                        {val?.charge_name}
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={6} className={classes.printSubTotal}>
                      <Text>{val?.charge_price} ₹</Text>
                    </Grid.Col>
                  </>
                ))}
              </>
            ) : (
              ""
            )}

            {fast_inventorie_items?.discount &&
            parseInt(fast_inventorie_items?.discount) ? (
              <>
                <Grid.Col span={6}>
                  <Text>Discount Amount</Text>
                </Grid.Col>
                <Grid.Col span={6} className={classes.printSubTotal}>
                  <Text>{fast_inventorie_items?.discount} ₹</Text>
                </Grid.Col>
              </>
            ) : (
              ""
            )}

            <Grid.Col span={12} mt={3} mb={3}>
              <Divider color="#c2c2d6" />
            </Grid.Col>
            <Grid.Col span={6}>
              <Text fw={700}>TOTAL</Text>
            </Grid.Col>
            <Grid.Col span={6} className={classes.printSubTotal}>
              <Text fw={700}>{currentTotal?.total_with_GST} ₹</Text>
            </Grid.Col>

            {showBarcode && (
              <Grid.Col span={12}>
                <Box className={classes.barcodeGrid}>
                  <Image
                    className={classes.barcodeImage}
                    src={data?.data?.target[0]?.photoURL}
                  />
                </Box>
              </Grid.Col>
            )}

            <Grid.Col span={12} mt={20} className={classes.thankyouMsg}>
              <Text> ThankYou For Visiting Us Have a Nice Day</Text>
            </Grid.Col>
            <Grid.Col span={12} className={classes.thankyouMsg}>
              <Text> Byeee </Text>
            </Grid.Col>
          </Grid>
        </Box>

        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <PrimaryButton
            mt={20}
            onClick={() => {
              setshowBarcode(() => false);
              setPRINT_VIEW(!PRINT_VIEW);
            }}
          >
            Canel
          </PrimaryButton>
          <Box className={classes.togelBox}>
            <Switch
              size="md"
              onLabel="ON"
              offLabel="OFF"
              onChange={(e) => {
                setshowBarcode(e?.target?.checked);
              }}
            />
          </Box>
          <Box mt={20}>
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
        opened={newItem}
        onClose={() => setNewItem(!newItem)}
        title="Add Extra Item"
        size={"md"}
        className={classes.model}
        centered
      >
        <Formik
          initialValues={{}}
          onSubmit={(val) => {
            dispatch(AddFastInventorieItem(val));
            setNewItem(!newItem);
          }}
        >
          {({ values, handleChange, errors }) => (
            <Form>
              <TextInputView
                id={"item_name"}
                name={"item_name"}
                label={"Item Name"}
                onChange={handleChange}
                placeholder={"name"}
                value={values.item_name}
              />
              <TextInputView
                mt={10}
                id={"price"}
                name={"price"}
                label={"Price"}
                onChange={handleChange}
                placeholder={"price"}
                value={values?.price}
                type={"number"}
              />
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <PrimaryButton
                  mt={20}
                  onClick={() => {
                    setNewItem(!newItem);
                  }}
                >
                  Canel
                </PrimaryButton>
                <PrimaryButton mt={20} type="submit">
                  Add Me
                </PrimaryButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        opened={newCharge}
        onClose={() => setNewCharge(null)}
        title="Add Charges"
        size={"md"}
        className={classes.model}
        centered
      >
        <Formik
          initialValues={{}}
          onSubmit={(val) => {
            dispatch(
              AddChargesInFastInventory({
                ...val,
              })
            );
            setNewCharge(null);
          }}
        >
          {({ handleChange, errors, setFieldValue }) => (
            <Form>
              <TextInputViewNormal
                id={"charge_name"}
                name={"charge_name"}
                label={"Charge Name"}
                onChange={handleChange}
                placeholder={"Charge name"}
              />
              <Box className={classes.Formik} mt={10}>
                <NumberInput
                  hideControls
                  id={"charge_price"}
                  name={"charge_price"}
                  label="Enter Amount"
                  onChange={(val) => {
                    setFieldValue("charge_price", val);
                  }}
                  placeholder={"Charge price"}
                />
              </Box>
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <PrimaryButton
                  mt={20}
                  onClick={() => {
                    setNewCharge(null);
                  }}
                >
                  Canel
                </PrimaryButton>
                <PrimaryButton mt={20} type="submit">
                  Add Charge
                </PrimaryButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        opened={calculateCharge}
        onClose={() => {
          setcalculateInput(() => null);
          setcalculateCharge(() => null);
        }}
        title="Calculate"
        size={"md"}
        className={classes.model}
        centered
      >
        <Formik
          initialValues={{}}
          onSubmit={(val) => {
            setcalculateInput(val?.enteramount);
          }}
        >
          {({ handleChange, errors, setFieldValue }) => (
            <Form>
              <TextInputViewNormal
                id="enteramount"
                name="enteramount"
                type="number"
                label={"Amount You Get From Customer"}
                placeHolder="Add Getting Amount"
                onChange={handleChange}
              />
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <PrimaryButton
                  mt={20}
                  onClick={() => {
                    setcalculateCharge(() => null);
                    setcalculateInput(() => null);
                  }}
                >
                  Canel
                </PrimaryButton>
                <PrimaryButton mt={20} type="submit">
                  Check it
                </PrimaryButton>
              </Box>
            </Form>
          )}
        </Formik>

        <TextN1>Total Amount {calculateCharge} ₹</TextN1>

        {calculateInput && (
          <>
            {calculateInput - calculateCharge > 0 ? (
              <TextN1 className={classes.calculatePositive}>
                Return To Customer {calculateInput - calculateCharge} ₹
              </TextN1>
            ) : (
              <TextN1 className={classes.calculateNegative}>
                Receive From Customer{" "}
                {Math.abs(calculateInput - calculateCharge)} ₹
              </TextN1>
            )}
          </>
        )}
      </Modal>

      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayOpacity={0}
        overlayProps={{ radius: "sm", blur: 0 }}
      />
    </Box>
  );
};

export default FastOrderCustomeTable;
