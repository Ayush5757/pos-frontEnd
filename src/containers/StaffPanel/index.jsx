import { ActionIcon, Box, Button, Grid, Loader, Modal, Pagination, Textarea } from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { TextInputView, TextInputViewNormal } from "../../components/Inputs";
import { PrimaryButton } from "../../components/Buttons";
import { useStyles } from "./style";
import { Form, Formik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { shoeNotification } from "../../components/Notify";
import {
  addStaffAPI,
  deleteStaffAPI,
  getSingleStaffData,
  getSingleStaffLeave,
  getStaffData,
  leave_Staff,
} from "../../services/api/staff";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { IconCircleXFilled } from "@tabler/icons-react";
import { TextN1 } from "../../components/Text";
import moment from "moment/moment";
import { DatePickerInput, MonthPickerInput } from "@mantine/dates";

const StaffPanel = () => {
  const { classes } = useStyles();
  const [member, setMember] = useState(null);
  const [updateStaffData, setUpdateStaffData] = useState(null);
  const [deletedStaffData, setdeletedStaffData] = useState(null);
  const [singleStaffID, setsingleStaffID] = useState(null);
  const [leaveStaff, setLeaveStaff] = useState(null);
  const [datevalue, setDateValue] = useState(null);
  const [leaveDateCheck, setLeaveDateCheck] = useState(null);
  const [page, setPage] = useState(1);

  const { data, refetch } = useQuery({
    queryKey: ["getStaffData"],
    queryFn: () => getStaffData(page),
    enabled: false
  });

  useEffect(()=>{
    refetch();
  },[page])
  
  const { data: singleStaffData, isFetching } = useQuery({
    queryKey: ["getSingleStaffData", localStorage.getItem("shop_user_id")],
    queryFn: () => getSingleStaffData(singleStaffID),
    enabled: singleStaffID ? true : false,
  });

  const { data: leaveCheckData, isFetching: isFetchingLeave } = useQuery({
    queryKey: ["getSingleStaffLeave", localStorage.getItem("shop_user_id"),leaveDateCheck],
    queryFn: () => getSingleStaffLeave(singleStaffID, leaveDateCheck),
    enabled: leaveDateCheck ? true : false,
  });

  const addStaffMember = useMutation({
    mutationFn: (newVal) => addStaffAPI(newVal),
  });

  const deleteStaffMember = useMutation({
    mutationFn: (newVal) => deleteStaffAPI(newVal),
  });
  const deleteStaff = async () => {
    try {
      await deleteStaffMember.mutateAsync(
        { staff_id: deletedStaffData },
        {
          onSuccess: (res) => {
            shoeNotification("success", "Deleted Successfully");
            setdeletedStaffData(null);
            refetch();
          },
        }
      );
    } catch (error) {
      shoeNotification("error", "Somthing went wrong...");
      setdeletedStaffData(null);
    }
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.ColLast} onClick={() => {}}>
            <ActionIcon
              variant="transparent"
              color="red"
              onClick={async () => {
                setdeletedStaffData(cell?.row?.original?._id);
              }}
            >
              <IconCircleXFilled />
            </ActionIcon>
            <span>
              {cell?.row?.original?.sname?.length
                ? cell?.row?.original?.sname
                : "--"}
            </span>
          </Box>
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.Col1} onClick={() => {}}>
            <span>
              {cell?.row?.original?.phone?.length
                ? cell?.row?.original?.phone
                : "--"}
            </span>
          </Box>
        ),
      },
      {
        accessorKey: "salary",
        header: "Salary",
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.Col1}>
            <span>
              <span>{cell?.row?.original?.salary ?? "--"} ₹</span>
            </span>
          </Box>
        ),
      },
      {
        accessorKey: "advance",
        header: "Advance Money",
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.Col1} onClick={() => {}}>
            <span>{cell?.row?.original?.advance_money ?? "--"} ₹</span>
          </Box>
        ),
      },
      {
        accessorKey: "other",
        header: "Other",
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.Col1} onClick={() => {}}>
            <span>{cell?.row?.original?.other ?? "--"} </span>
          </Box>
        ),
      },
      {
        accessorKey: "view",
        header: "View",
        size: 50,
        Cell: ({ renderedCellValue, cell }) => (
          <Box className={classes.ColLast} onClick={() => {}}>
            <span
              className={classes.view}
              onClick={() => setsingleStaffID(cell?.row?.original?._id)}
            >
              view
            </span>
            <span
              className={classes.Update}
              onClick={() => {
                setMember(true);
                setUpdateStaffData({ ...cell?.row?.original });
              }}
            >
              Update
            </span>
            <span
              className={classes.leave}
              onClick={() => {
                setLeaveStaff({ singleStaffInfo: cell?.row?.original });
              }}
            >
              Leave
            </span>
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

  const add_Leave = useMutation({
    mutationFn: (newVal) => leave_Staff(newVal),
  });
  console.log("leaveStaff", leaveStaff?.singleStaffInfo);
  const addLeaveHandel = async () => {
    try {
      await add_Leave.mutateAsync(
        { date: datevalue, staff_id: leaveStaff?.singleStaffInfo?._id },
        {
          onSuccess: () => {
            shoeNotification("success", "Leave Added");
            setDateValue(null);
            setLeaveStaff(null);
          },
        }
      );
    } catch (error) {
      setDateValue(null);
      setLeaveStaff(null);
      shoeNotification("error", "Somthing went wrong...");
    }
  };

  return (
    <Box>
      <Grid mt={1}>
        <Grid.Col span={12}>
          <Box className={classes.staffAddBtn}>
            <PrimaryButton onClick={() => setMember(true)}>
              Add Staff Member
            </PrimaryButton>
          </Box>
        </Grid.Col>

        <Grid.Col span={12} mt={30}>
          <Box>
            <MantineReactTable table={table} />
          </Box>
        </Grid.Col>
      </Grid>
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
      <Modal
        opened={member}
        onClose={() => {
          setMember(false);
          setUpdateStaffData(null);
        }}
        title="Staff Member"
        size={"md"}
        transitionProps={{ transition: "rotate-left", duration: 100 }}
      >
        <Formik
          initialValues={
            updateStaffData ?? {
              sname: "",
              phone: "",
              salary: 0,
              advance_money: 0,
              other: "",
            }
          }
          onSubmit={async (values) => {
            try {
              if (updateStaffData) {
                values.staffMemberID = updateStaffData?._id;
              }
              await addStaffMember.mutateAsync(values, {
                onSuccess: (res) => {
                  if (updateStaffData) {
                    shoeNotification("success", "Staff Updated");
                  } else {
                    shoeNotification("success", "New Staff Added");
                  }
                  setMember(false);
                  setUpdateStaffData(null);
                  refetch();
                },
              });
            } catch (error) {
              shoeNotification("error", "Somthing went wrong...");
              setUpdateStaffData(null);
            }
          }}
          enableReinitialize
        >
          {({ handleChange, errors, touched, values }) => (
            <Form>
              <Grid w={"100%"}>
                <Grid.Col span={12}>
                  <TextInputView
                    name="sname"
                    placeholder="Enter Name"
                    label={"Staff Name"}
                    onChange={handleChange}
                    value={values?.sname}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInputView
                    name="phone"
                    placeholder="Enter Phone"
                    label="Phone"
                    onChange={handleChange}
                    value={values?.phone}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <TextInputView
                    name="salary"
                    type="number"
                    placeholder="Enter Salary"
                    label="Salary Amount"
                    onChange={handleChange}
                    value={values?.salary}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <TextInputView
                    name="advance_money"
                    type="number"
                    placeholder="Advance Money"
                    label="Advance Amount"
                    onChange={handleChange}
                    value={values?.advance_money}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <Textarea
                    label="Other"
                    name="other"
                    placeholder="Other Informations"
                    autosize
                    minRows={2}
                    maxRows={6}
                    onChange={handleChange}
                    value={values?.other}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <PrimaryButton onClick={() => setMember(false)}>
                    cancel
                  </PrimaryButton>
                </Grid.Col>

                <Grid.Col span={6} className={classes.AddStaffPopUp}>
                  {updateStaffData ? (
                    <PrimaryButton type="submit">Update Staff</PrimaryButton>
                  ) : (
                    <PrimaryButton type="submit">Add New Staff</PrimaryButton>
                  )}
                </Grid.Col>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        opened={singleStaffID}
        onClose={() => {
          setsingleStaffID(null);
          setLeaveDateCheck(null);
        }}
        title="Staff Member Details"
        size={"xl"}
        centered
        transitionProps={{ transition: "rotate-left", duration: 100 }}
      >
        <Box h={"40vh"}>
          <Grid gutter={0}>
            <Grid.Col span={12} sm={6}>
              <TextN1 className={classes.info_text}>
                {" "}
                Name :{" "}
                <span className={classes.information}>
                  {singleStaffData?.data?.target?.sname}
                </span>
              </TextN1>
            </Grid.Col>
            <Grid.Col span={12} sm={6}>
              <TextN1 className={classes.info_text}>
                {" "}
                PhoneNumber :{" "}
                <span className={classes.information}>
                  {singleStaffData?.data?.target?.phone}
                </span>
              </TextN1>
            </Grid.Col>
            <Grid.Col span={12} sm={6}>
              <TextN1 className={classes.info_text}>
                {" "}
                Salary :{" "}
                <span className={classes.information}>
                  {singleStaffData?.data?.target?.salary} ₹
                </span>
              </TextN1>
            </Grid.Col>
            <Grid.Col span={12} sm={6}>
              <TextN1 className={classes.info_text}>
                {" "}
                Advance Money :{" "}
                <span className={classes.information}>
                  {singleStaffData?.data?.target?.advance_money} ₹
                </span>
              </TextN1>
            </Grid.Col>
            <Grid.Col span={12} sm={6}>
              <TextN1 className={classes.info_text}>
                {" "}
                Date of Joining :{" "}
                <span className={classes.information}>
                  {singleStaffData?.data?.target?.joinDate
                    ? moment(singleStaffData?.data?.target?.joinDate).format(
                        "DD, MMMM, YYYY"
                      )
                    : "--"}
                </span>
              </TextN1>
            </Grid.Col>
            <Grid.Col span={12}>
              <TextN1 className={classes.info_text}>
                {" "}
                Other :{" "}
                <span className={classes.information}>
                  {singleStaffData?.data?.target?.other}
                </span>
              </TextN1>
            </Grid.Col>
            <Grid.Col span={12} sm={6}>
              <TextN1 className={classes.info_text}>
                {" "}
                Monthly Leave's Count  : {" "}
                <span className={classes.information} >
                  {leaveCheckData?.data?.target?.length?? '--'}
                </span>
              </TextN1>
            </Grid.Col>

            <Grid.Col span={12} mt={20}>
              <Box className={classes.datePicker_box}>
                <MonthPickerInput
                  w={"100%"}
                  placeholder="Pick date"
                  value={leaveDateCheck}
                  onChange={setLeaveDateCheck}
                />
              </Box>
            </Grid.Col>

            <Grid.Col span={12} mt={20}>
              <TextN1 className={classes.info_text}>Leaves Date's</TextN1>
              <Grid gutter={10} mt={10}>
                {isFetchingLeave ? (
                  <Loader />
                ) : (
                  <>
                    {leaveCheckData?.data?.target?.length>0 ? leaveCheckData?.data?.target?.map((val) => (
                      <Grid.Col span={6} sm={4} md={3} lg={2}>
                        <Box className={classes.leave_grid}>
                          <TextN1>
                            {moment(val)?.format("DD, MMM, YYYY")}
                          </TextN1>
                        </Box>
                      </Grid.Col>
                    ))
                  : <TextN1 ml={5} className={classes.noData}> No Data Please Pick a Month</TextN1>}
                  </>
                )}
              </Grid>
            </Grid.Col>
          </Grid>
        </Box>
      </Modal>

      <Modal
        opened={deletedStaffData}
        onClose={() => {
          setdeletedStaffData(null);
        }}
        title="Staff Member"
        size={"md"}
        centered
        transitionProps={{ transition: "rotate-left", duration: 100 }}
      >
        <TextN1 className={classes.deleteConfirmMsg}>
          Are You Sure To Delete This Staff Member
        </TextN1>
        <Box className={classes.confirmBox} mt={10}>
          <PrimaryButton onClick={() => setdeletedStaffData(null)}>
            Cancel
          </PrimaryButton>
          <PrimaryButton onClick={() => deleteStaff()}>Confirm</PrimaryButton>
        </Box>
      </Modal>

      <Modal
        opened={leaveStaff}
        onClose={() => {
          setLeaveStaff(null);
        }}
        title="Staff Leave"
        size={"md"}
        centered
        transitionProps={{ transition: "rotate-left", duration: 100 }}
      >
        <Grid>
          <Grid.Col span={12}>
            <DatePickerInput
              dropdownType="modal"
              label="Pick date"
              placeholder="Pick date"
              value={datevalue}
              onChange={setDateValue}
            />
          </Grid.Col>
        </Grid>
        <Box className={classes.confirmBox} mt={20}>
          <PrimaryButton onClick={() => setLeaveStaff(null)}>
            Cancel
          </PrimaryButton>
          <PrimaryButton onClick={() => addLeaveHandel()}>
            Leave Confirmed
          </PrimaryButton>
        </Box>
      </Modal>
    </Box>
  );
};

export default StaffPanel;
