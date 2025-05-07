import {
  ActionIcon,
  Box,
  Grid,
  LoadingOverlay,
  Modal,
  Textarea,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import React, { useEffect, useMemo, useState } from "react";
import { PrimaryButton } from "../../components/Buttons";
import { useStyles } from "./style";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TextN1 } from "../../components/Text";
import moment from "moment";
import { Formik, Form } from "formik";
import { shoeNotification } from "../../components/Notify";
import { IconTrash } from "@tabler/icons-react";
import {
  Add_New_Reminder,
  delete_Reminder,
  get_Reminder,
} from "../../services/api/reminder";

const Reminder = () => {
  const { classes } = useStyles();
  const [selectDate, setSelectDate] = useState();
  const [isAddingReminder, setIsAddingReminder] = useState(false);
  const [deleteReminderID, setdeleteReminderID] = useState(null);

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["get_Reminder"],
    queryFn: () => get_Reminder(selectDate),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [selectDate]);

  const addNewReminder = useMutation({
    mutationFn: (newVal) => Add_New_Reminder(newVal),
  });
  const deletingReminder = useMutation({
    mutationFn: (newVal) => delete_Reminder(newVal),
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "reminder_message",
        header: "Reminder Message",
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.Col1} onClick={() => {}}>
            <span>{cell?.row?.original?.reminder_message ?? "--"}</span>
          </Box>
        ),
      },
      {
        accessorKey: "reminder_date",
        header: "Reminder Date",
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.Col1} onClick={() => {}}>
            <span>{cell?.row?.original?.reminder_date}</span>
          </Box>
        ),
      },
      {
        accessorKey: "delete",
        header: "Delete Reminder",
        size: 10,
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.Col1} onClick={() => {}}>
            <ActionIcon
              variant="filled"
              color="red"
              size="md"
              radius="md"
              p={3}
              onClick={() => {
                setdeleteReminderID(cell?.row?.original?._id);
              }}
            >
              <IconTrash />
            </ActionIcon>
          </Box>
        ),
      },
    ],
    [data?.data?.target?.reminders]
  );
  const table = useMantineReactTable({
    columns,
    data: data?.data?.target?.reminders ?? [],
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
            </Box>
          </Grid.Col>
          <Grid.Col
            span={12}
            xs={6}
            sm={6}
            md={4}
            lg={3}
            className={classes.reminderBtn_Grid}
          >
            <Box className={classes.SearchBox}>
              <PrimaryButton ml={4} onClick={() => setIsAddingReminder(true)}>
                Add Reminder
              </PrimaryButton>
            </Box>
          </Grid.Col>
        </Grid>
      </Box>

      <Box mt={30}>
        <MantineReactTable table={table} />
      </Box>

      <Modal
        opened={isAddingReminder}
        size="md"
        onClose={() => setIsAddingReminder(false)}
        title="Delete Order"
        centered
      >
        <TextN1> Create New Reminder </TextN1>
        <Box mt={10} h={"50vh"}>
          <Formik
            initialValues={{}}
            onSubmit={async (val) => {
              try {
                if(val?.reminder_date){
                  let value = {
                    reminder_message: val?.reminder_message,
                    reminder_date: moment(val?.reminder_date).format(
                    "YYYY-D-MMM"
                  ),
                };
                await addNewReminder.mutateAsync(value, {
                  onSuccess: (res) => {
                    shoeNotification("success", "Reminder Created");
                  },
                });
              }else{
                shoeNotification("error", "Please Select Date");
              }
              } catch (error) {
                shoeNotification("error", "Somthing went wrong...");
              } finally {
                refetch();
                setIsAddingReminder(false);
              }
            }}
            enableReinitialize
          >
            {({ values, handleChange, errors, setFieldValue }) => (
              <Form className={classes.date_picker}>
                <Textarea
                  id="reminder_message"
                  name="reminder_message"
                  placeholder="Enter Your Message"
                  label="Reminder Message"
                  onChange={handleChange}
                  value={values?.message}
                />

                <DatePickerInput
                  id="reminder_date"
                  name="reminder_date"
                  label="Pick date"
                  placeholder="Pick date"
                  mt={20}
                  onChange={(val) => {
                    setFieldValue("reminder_date", val);
                  }}
                  value={values?.reminder_date}
                />
                <Box className={classes.btnBox}>
                  <PrimaryButton
                    onClick={() => setIsAddingReminder(false)}
                    mt={20}
                    ml={2}
                  >
                    Cancel
                  </PrimaryButton>
                  <PrimaryButton type="submit" mt={20} ml={2}>
                    Save
                  </PrimaryButton>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      <Modal
        opened={deleteReminderID}
        size="md"
        onClose={() => setdeleteReminderID(null)}
        title="Delete Reminder"
        centered
      >
        <TextN1 className={classes.delete_reminder_message}>
          {" "}
          Are You Sure To Delete This Reminder{" "}
        </TextN1>
        <Box className={classes.btnBox}>
          <PrimaryButton onClick={() => setdeleteReminderID(null)}>
            {" "}
            Cancel{" "}
          </PrimaryButton>
          <PrimaryButton
            onClick={async () => {
              try {
                await deletingReminder.mutateAsync(
                  { reminderID: deleteReminderID },
                  {
                    onSuccess: (res) => {
                      shoeNotification("success", "Reminder Deleted");
                    },
                  }
                );
              } catch (error) {
                shoeNotification("error", error?.message);
              } finally {
                refetch();
                setdeleteReminderID(null);
              }
            }}
          >
            {" "}
            Yes{" "}
          </PrimaryButton>
        </Box>
      </Modal>
      <LoadingOverlay visible={isFetching} />
    </>
  );
};

export default Reminder;
