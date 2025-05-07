import { useMemo, useRef, useState } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import {
  ActionIcon,
  Box,
  Button,
  Grid,
  LoadingOverlay,
  Modal,
  Paper,
  Text,
} from "@mantine/core";
import { createStyles } from "@mantine/core";
import {
  IconCircleXFilled,
  IconDiscountCheckFilled,
  IconMessage2Heart,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { PrimaryButton } from "../Buttons";
import { shoeNotification } from "../Notify";
import { TextN1 } from "../Text";
import { TextInputViewNormal } from "../Inputs";
import ReactToPrint from "react-to-print";

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
  totalamountonBill:{
    fontWeight: 700,
    letterSpacing: 0.5,
    backgroundColor:'#1a75ff',
    padding:'5px 5px',
    borderRadius:'5px'
  },
  lowerBtns:{
    '@media (max-width: 1024px)': {
      display:'flex',
      justifyContent:'flex-end',
    }
  },
  totalPaper:{
    backgroundColor:'gray !important',
    '@media (max-width: 1024px)': {
      backgroundColor: "#1a75ff !important",
     }
  },
  total:{
    fontWeight: "bold",
    color: "#ffffff" 
  },
  gst:{
    backgroundColor: "#ff471a",
    color: "#ffffff",
    padding: "5px",
    borderRadius: "3px",
    '@media (max-width: 1024px)': {
     backgroundColor: "#1a75ff !important",
    }
  },
  gst_total:{
    backgroundColor: "#009900",
    color: "#ffffff",
    padding: "5px 0px 5px 5px",
    borderRadius: "3px",
    '@media (max-width: 1024px)': {
     backgroundColor: "#1a75ff !important",
    }
  }
}));

const CustomeTableWaiter = ({
  formikRef,
  setIskotConfirmPopup,
  isSaveDisable,
  tdata,
  tnote,
  setOpenNotes,
  removeInventryAction,
  handelConfirm,
  tableHeight,
  ChangeQtyHandler,
  ChangePLateTypeHandler,
  clickedTableID = true,
  TotalAmount,
  setCurrentDiscount,
  inventriesDiscount,
  isDeliveredFunction,
  currentTotalWithoutGST,
}) => {
  const { classes } = useStyles();
  const componentRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertSave, setisAlertSave] = useState(false);
  const [isConfirmationCompleteOrder, setisConfirmationCompleteOrder] =
    useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [PRINT_VIEW, setPRINT_VIEW] = useState(false);
  const Table = useSelector((state) => state?.TablesReduser?.Tables);
  const discountTotal = () => {
    setCurrentDiscount(discountAmount);
  };
  const handleAfterPrint = () => {
    console.log("`onAfterPrint` called");
  };

  const handleBeforePrint = () => {
    console.log("`onBeforePrint` called");
  };

  const handleOnBeforeGetContent = () => {
    console.log("`onBeforeGetContent` called");
    setIsLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve();
      }, 2000);
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
        header: "Name",
        maxSize: 250,
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
        minSize: 50,
        maxSize: 100,
        Cell: ({ renderedCellValue, cell }) => (
          <Box
            className={classes.Col1}
            onClick={() => {
              if(cell?.row?.original?.half_price){
                ChangePLateTypeHandler({
                  ...cell?.row?.original,
                  index: cell?.row?.index,
                });
              }
            }}
          >
            <span>
            {cell?.row?.original?.plate_type === "1"
                 ? `${cell?.row?.original?.price} ₹ ${cell?.row?.original?.half_price ? 'F':''}`
                : `${cell?.row?.original?.half_price} ₹ H`}
            </span>
          </Box>
        ),
      },
      {
        accessorKey: "qty",
        header: "Qty",
        minSize: 50,
        maxSize: 100,
        Cell: ({ renderedCellValue, cell }) => (
          <Box
            className={classes.Col1}
            onClick={() => {
              ChangeQtyHandler({
                ...cell?.row?.original,
                index: cell?.row?.index,
              });
            }}
          >
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: "product_amount",
        header: "Total ₹",
        inSize: 50,
        maxSize: 100,
        Cell: ({ renderedCellValue, cell }) => (
          <Box
            className={classes.Col1}
          >
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
      {
        accessorKey: "isDelivered",
        header: "Delivered",
        inSize: 50,
        maxSize: 100,
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.Col1}>
            {cell?.row?.original?.isDelivered ? (
              <ActionIcon
                variant="transparent"
                color="green"
                onClick={() => {
                  isDeliveredFunction({
                    ...cell?.row?.original,
                    isDelivered: 0,
                    index: cell?.row?.index,
                  });
                }}
              >
                <IconDiscountCheckFilled />
              </ActionIcon>
            ) : (
              <span
                style={{ color: "red" }}
                onClick={() => {
                  isDeliveredFunction({
                    ...cell?.row?.original,
                    isDelivered: 1,
                    index: cell?.row?.index,
                  });
                }}
              >
                Pending
              </span>
            )}
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
    formikRef.current.submitForm();
  };

  return (
    <>
      <Box className={classes.Wraper}>
        <Box>
          <MantineReactTable table={table} />
        </Box>
        <Paper
          shadow="xl"
          mt={5}
          w={"100%"}
          p={"7px 10px 5px 10px"}
          className={classes.totalPaper}
        >
          <Grid gutter={0}>
            <Grid.Col span={12} md={12} lg={1} >
              <Text className={classes.total}>
                Total
              </Text>
            </Grid.Col>
            <Grid.Col span={12} md={12} lg={3}>
              <span className={classes.gst}>
                SGST 9% - {" "}
                {parseFloat((currentTotalWithoutGST * 9) / 100).toFixed(2)} ₹
              </span>
            </Grid.Col>
            <Grid.Col span={12} md={12} lg={3}>
              <span className={classes.gst}>
                CGST 9% - {" "}
                {parseFloat((currentTotalWithoutGST * 9) / 100).toFixed(2)} ₹
              </span>
            </Grid.Col>
            <Grid.Col span={12} md={12} lg={5}>
              <span className={classes.gst_total}>
                {parseInt(currentTotalWithoutGST)} ₹ + {'GST ='}  <span className={classes.totalamountonBill}>{parseInt(TotalAmount)} ₹</span>
              </span>
            </Grid.Col>
          </Grid>
        </Paper>

        <Box shadow="xl" mt={10} w={"100%"} p={"0px 10px 0px 10px"}>
          <Grid gutter={0}>
            <Grid.Col span={6} lg={3}>
              <PrimaryButton
                disabled={isSaveDisable}
                variant="gradient"
                gradient={{ from: "#1a75ff", to: "#800080", deg: 105 }}
                onClick={() => {
                  if (tdata.length !== 0 && Table.length !== 0) {
                    save();
                  } else {
                    shoeNotification("error", "Please Choose Table");
                  }
                }}
              >
                {clickedTableID ? "Save Order" : "Place Order"}
              </PrimaryButton>
            </Grid.Col>
            <Grid.Col span={6} lg={3} className={classes.lowerBtns}>
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
           
          </Grid>
        </Box>

        <Modal
          opened={isAlertSave}
          onClose={() => setisAlertSave(!isAlertSave)}
          title="Reminder"
          size={"md"}
          className={classes.model}
          centered
        >
          <TextN1 fw={700}>
            {" "}
            Did You Save Your Order Before Confirming it.{" "}
          </TextN1>
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
                setisConfirmationCompleteOrder(!isConfirmationCompleteOrder);
              }}
            >
              YES
            </PrimaryButton>
          </Box>
        </Modal>

        <Modal
          opened={isConfirmationCompleteOrder}
          onClose={() =>
            setisConfirmationCompleteOrder(!isConfirmationCompleteOrder)
          }
          title="Confirmation"
          size={"xl"}
          className={classes.model}
          centered
        >
          <TextN1>Are you Sure You want To confirm this Order</TextN1>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <PrimaryButton
              mt={20}
              onClick={() => {
                setisConfirmationCompleteOrder(!isConfirmationCompleteOrder);
              }}
            >
              Canel
            </PrimaryButton>
            <PrimaryButton
              mt={20}
              onClick={() => {
                setisConfirmationCompleteOrder(!isConfirmationCompleteOrder);
                handelConfirm();
              }}
            >
              Confirmed
            </PrimaryButton>
          </Box>
        </Modal>

        <Modal
          opened={PRINT_VIEW}
          onClose={() => setPRINT_VIEW(!PRINT_VIEW)}
          title="Print"
          size={"sm"}
          className={classes.model}
          centered
        >
          <TextN1>PrintView</TextN1>

          <Box className={classes.scroll_container} ref={setComponentRef}>
            <Grid gutter={0}>
              <Grid.Col span={6}>
                <Text>Item</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text>Qty</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text>Price</Text>
              </Grid.Col>
            {tdata?.map((val) => (
              <>
                 <Grid.Col span={6}>
                   <Text>{val?.item_name}</Text>
                 </Grid.Col>
                 <Grid.Col span={3}>
                   <Text>{`${val?.qty} ${val?.plate_type === "1" ? '':'H'}`}</Text>
                 </Grid.Col>
                 <Grid.Col span={3}>
                   <Text>{val?.plate_type === "1" ? val?.qty * val?.price: val?.qty * val?.half_price}</Text>
                 </Grid.Col>
              </>
            ))}
            </Grid>
          </Box>

          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <PrimaryButton
              mt={20}
              onClick={() => {
                setPRINT_VIEW(!PRINT_VIEW);
              }}
            >
              Canel
            </PrimaryButton>
            <Box mt={20}>
              <ReactToPrint
                content={reactToPrintContent}
                documentTitle="E_Bill"
                onAfterPrint={handleAfterPrint}
                onBeforeGetContent={handleOnBeforeGetContent}
                onBeforePrint={handleBeforePrint}
                removeAfterPrint
                trigger={reactToPrintTrigger}
                print={customToPrint}
              />
            </Box>
          </Box>
        </Modal>
      </Box>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayOpacity={0}
        overlayProps={{ radius: "sm", blur: 0 }}
      />
    </>
  );
};

export default CustomeTableWaiter;
