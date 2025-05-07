import {
  ActionIcon,
  Box,
  Button,
  Grid,
  LoadingOverlay,
  Modal,
  Pagination,
  Paper,
} from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { useStyles } from "./style";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  deleteExpanse,
  get_expenses_by_month,
} from "../../services/api/expenes";
import { TextN1 } from "../../components/Text";
import { MonthPickerInput } from "@mantine/dates";
import { IconCalendar, IconRefresh } from "@tabler/icons-react";
import { PrimaryButton } from "../../components/Buttons";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import {
  getMonthAndYear_string,
  getMonthNumber,
  getYear_by_date,
  get_item_type,
} from "../../utils/constFunction";
import { IconTrash } from "@tabler/icons-react";
import { shoeNotification } from "../../components/Notify";

const ExpenseContainer = () => {
  const { classes } = useStyles();
  const [date, setDate] = useState(new Date());
  const [deleteExpenseID, setdeleteExpenseID] = useState(null);
  const [page, setPage] = useState(1);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["get_expenses_by_month"],
    queryFn: () =>
      get_expenses_by_month({
        shop_id: localStorage.getItem("shop_user_id"),
        month: getMonthNumber(date),
        year: getYear_by_date(date),
        page: page,
      }),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [page]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "ex_name",
        header: "Item Name",
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.Col1}>
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: "ex_type",
        header: "Type",
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.Col1} onClick={() => {}}>
            <span>{get_item_type(renderedCellValue)}</span>
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
              console.log("cell", cell?.row?.original);
            }}
          >
            <span>{renderedCellValue}</span>
            {/* <span>{cell?.row?.original?.qty * cell?.row?.original?.price} ₹</span> */}
          </Box>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.Col1} onClick={() => {}}>
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: "total",
        header: "Total",
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.Col1} onClick={() => {}}>
            <span>
              {cell?.row?.original?.qty * cell?.row?.original?.price} ₹
            </span>
          </Box>
        ),
      },
      {
        accessorKey: "delete",
        header: "Remove",
        size: 50,
        Cell: ({ renderedCellValue, cell }) => (
          <Box onClick={() => {}}>
            <ActionIcon
              variant="filled"
              color="red"
              size="md"
              radius="md"
              p={3}
              onClick={() => {
                setdeleteExpenseID(cell?.row?.original?._id);
              }}
            >
              <IconTrash />
            </ActionIcon>
          </Box>
        ),
      },
    ],
    []
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

  const deleteExpenseAPI = useMutation({
    mutationFn: (newVal) => deleteExpanse(newVal),
  });

  return (
    <>
      <Grid className={classes.heading} gutter={0}>
        <Grid.Col span={12}>
          <TextN1 className={classes.month}>
            {" "}
            Month - {getMonthAndYear_string(date)}{" "}
          </TextN1>
        </Grid.Col>
        <Grid.Col span={12}>
          <TextN1 className={classes.total}>
            {" "}
            Total Month Expense - {
              data?.data?.month_total
            } ₹{" "}
          </TextN1>
        </Grid.Col>
        <Grid.Col span={8} xs={7} sm={6} md={3}>
          <MonthPickerInput
            clearable
            icon={<IconCalendar size="1.1rem" stroke={1.5} />}
            label="Pick date"
            placeholder="Pick date"
            className={classes.date}
            value={date}
            clearButtonProps={{
              onClick: () => {
                setDate(new Date());
              },
            }}
            onChange={setDate}
          />
        </Grid.Col>
        <Grid.Col span={3} ml={5} className={classes.searchBox}>
          <PrimaryButton
            disabled={date ? false : true}
            onClick={() => {
              setPage(() => 1);
              refetch();
            }}
          >
            search
          </PrimaryButton>
        </Grid.Col>
      </Grid>
      <Grid gutter={0}>
        <Grid.Col mt={20} span={12} className={classes.refresh_grid}>
          <PrimaryButton rightIcon={<IconRefresh />} onClick={() => refetch()}>
            Fresh Data
          </PrimaryButton>
        </Grid.Col>
        <Grid.Col span={12} mt={10} className={classes.table_grid}>
          <MantineReactTable table={table} />
        </Grid.Col>

        <Grid.Col span={12} mt={30}>
          <Grid gutter={12}>
            <Grid.Col
              span={2}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              {data?.data?.pageInfo?.currentPage > 1 &&
                data?.data?.pageInfo?.currentPage <=
                  data?.data?.pageInfo?.totalPages && (
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
              <Pagination
                onChange={(val) => {
                  window.scrollTo({ bottom: 0, behavior: "smooth" });
                  setPage(val);
                }}
                value={data?.data?.pageInfo?.currentPage}
                total={data?.data?.pageInfo?.totalPages}
                size="sm"
                radius="md"
                withControls={false}
              />
            </Grid.Col>

            <Grid.Col
              span={2}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              {data?.data?.pageInfo?.currentPage <
                data?.data?.pageInfo?.totalPages && (
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
        </Grid.Col>
      </Grid>
      <LoadingOverlay visible={isFetching} />

      <Modal
        opened={deleteExpenseID}
        size="sm"
        onClose={() => setdeleteExpenseID(null)}
        title="Delete Order"
        centered
      >
        <TextN1> Do You Want To Delete This Expense </TextN1>
        <Box mt={10} className={classes.deleteBtnBox}>
          <PrimaryButton onClick={() => setdeleteExpenseID(null)}>
            Cancel
          </PrimaryButton>
          <PrimaryButton
            onClick={async () => {
              try {
                await deleteExpenseAPI.mutateAsync(
                  {
                    expense_id: deleteExpenseID,
                    month: getMonthNumber(date),
                    year: getYear_by_date(date),
                  },
                  {
                    onSuccess: (res) => {
                      refetch();
                      shoeNotification("success", "Expense Deleted");
                      setdeleteExpenseID(null);
                    },
                  }
                );
              } catch (error) {
                shoeNotification("error", "Internet Problem");
                setdeleteExpenseID(null);
              }
            }}
          >
            Yes
          </PrimaryButton>
        </Box>
      </Modal>
    </>
  );
};

export default ExpenseContainer;
