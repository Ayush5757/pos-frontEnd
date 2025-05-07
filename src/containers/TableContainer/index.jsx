import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Grid,
  Image,
  LoadingOverlay,
  Modal,
  Paper,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import { TextN1 } from "../../components/Text";
import { TextInputView } from "../../components/Inputs";
import SelectInputView from "../../components/Inputs/select";
import { useNavigate } from "react-router-dom";
import {
  createTableAPI,
  createTableSectionAPI,
  getTableAPI,
  getTablesSections,
  workingTableStatusChangeAPI,
} from "../../services/api/tables";
import { ErrorMessage, Form, Formik } from "formik";
import { PrimaryButton } from "../../components/Buttons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { shoeNotification } from "../../components/Notify";
import { useSelector, useDispatch } from "react-redux";
import { AddTables } from "../../redux/slices/Tables";
import { IconAdjustments } from "@tabler/icons-react";
import diningtable from "../../assets/diningtable.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const TableContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Tables = useSelector((state) => state?.TablesReduser?.Tables);
  const { classes } = useStyles();
  const [createTablePopUp, setCreateTablePopUp] = useState(false);
  const [createTableSectionPopUp, setCreateTableSectionPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [TableSections, setTableSections] = useState([]);

  const { data, refetch, isFetching, error, isFetched } = useQuery({
    queryKey: ["getTableAPI"],
    queryFn: () => getTableAPI(),
  });

  if (error) {
    shoeNotification("error", "Somthing Went Wrong");
  }

  useEffect(() => {
    console.log("mannuData");
    if (data?.data?.target) {
      dispatch(AddTables(data?.data?.target));
    }
  }, [data]);

  const {
    data: TableSectionData,
    isFetching: isFetchingTableSection,
    refetch: TableSectionRefetch,
    error: TableSectionError,
  } = useQuery({
    queryKey: ["getTablesSections"],
    queryFn: () => getTablesSections(),
    enabled: false,
  });

  if (TableSectionError) {
    shoeNotification("error", "Network Error");
  }

  useEffect(() => {
    let section = [];
    TableSectionData?.data?.target?.forEach((res, index) => {
      section[index] = {
        value: res?._id,
        label: res?.tableTypeName,
      };
    });
    setTableSections([...section]);
  }, [TableSectionData]);

  const createTableMutation = useMutation({
    mutationFn: (newVal) => createTableAPI(newVal),
  });
  const createTableSectionMutation = useMutation({
    mutationFn: (newVal) => createTableSectionAPI(newVal),
  });
  const workingTableStatusChange = useMutation({
    mutationFn: (newVal) => workingTableStatusChangeAPI(newVal),
  });
  return (
    <Paper mt={10}>
      <Grid>
        <Grid.Col
          span={12}
          xs={10}
          sm={10}
          md={8}
          lg={7}
          className={classes.btnsGrid}
        >
          <Grid gutter={8} w={"100%"}>
            <Grid.Col span={4} xs={3.5} sm={2.4} md={2.4} lg={2}>
              <Button
                variant="gradient"
                gradient={{ from: "#e62e00", to: "#000000", deg: 105 }}
                onClick={() => {
                  TableSectionRefetch();
                  setCreateTablePopUp(!createTablePopUp);
                }}
              >
                Create Tables
              </Button>
            </Grid.Col>
            <Grid.Col span={4} xs={3} sm={2.4} md={2} lg={2}>
              <Button
                variant="gradient"
                gradient={{ from: "#e62e00", to: "#000000", deg: 105 }}
                onClick={() => {
                  navigate("/fast-order-customer");
                }}
              >
                Fast Order
              </Button>
            </Grid.Col>
            <Grid.Col span={5} xs={4} sm={3} md={3} lg={3}>
              <Button
                variant="gradient"
                gradient={{ from: "#e62e00", to: "#000000", deg: 105 }}
                onClick={() => {
                  setCreateTableSectionPopUp(true);
                }}
              >
                Create Table Section
              </Button>
            </Grid.Col>
            <Grid.Col span={2} xs={1.5} sm={2.4} md={2} lg={3}>
              <LazyLoadImage
                alt="dining"
                src={diningtable}
                width={"40px"}
                style={{ marginLeft: 10 ,objectFit: "cover" }}
                fit="contain"
                effect="blur"
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
      <Grid gutter={15}>
        {Tables?.map((sectionData , i) => {
          return (
            <React.Fragment key={i}>
              <Grid.Col span={12}>
                <TextN1 className={classes.sectionHead} ml={10} mt={10}>
                  {sectionData?.table_type}
                </TextN1>
              </Grid.Col>
              <>
                {sectionData?.table_data?.map((val , i) => (
                  <Grid.Col
                    span={4}
                    xs={3}
                    sm={2}
                    md={2}
                    lg={1}
                    className={classes.TableGrid}
                    key={i}
                  >
                    <Box
                      className={classes.TableBox}
                      style={{
                        backgroundColor:
                          val?.orderID || val?.total ? "#99ff99" : "#ccccb3",
                      }}
                      onClick={() =>
                        navigate("/shop-Inventory", {
                          state: {
                            tableID: val?._id,
                            table_name: val?.name,
                            table_type_id: sectionData?.table_type_id,
                            orderID: val?.orderID,
                            tableTotal: parseInt(val?.total),
                          },
                        })
                      }
                    >
                      <TextN1 className={classes.Tableprice}>
                        {val?.name}
                      </TextN1>
                      <TextN1 className={classes.Tableprice}>
                        {" "}
                        {val?.total ? `₹${parseInt(val?.total)}` : "+"}{" "}
                      </TextN1>
                    </Box>
                    <ActionIcon
                      variant="filled"
                      color={val?.workingTable ? "green" : "red"}
                      size="sm"
                      aria-label="Settings"
                      className={classes.workingTable}
                      onClick={async () => {
                        if (val?.orderID) {
                          shoeNotification("error", "First Complete The Order");
                        } else {
                          let temp = {
                            tableID: val?._id,
                            table_type_id: sectionData?.table_type_id,
                            workingTable: val?.workingTable ? 0 : 1,
                          };
                          console.log("temp", temp);
                          try {
                            await workingTableStatusChange.mutateAsync(temp, {
                              onSuccess: () => {
                                refetch();
                                shoeNotification(
                                  "success",
                                  "Table Status Changed"
                                );
                              },
                            });
                          } catch (error) {
                            shoeNotification("error", "Bad Network");
                          }
                        }
                      }}
                    >
                      <IconAdjustments
                        style={{ width: "70%", height: "70%" }}
                        stroke={1.5}
                      />
                    </ActionIcon>
                  </Grid.Col>
                ))}
              </>
              <Grid.Col span={12}>
                <Divider color="#e0e0eb" />
              </Grid.Col>
            </React.Fragment>
          );
        })}
      </Grid>

      <Modal
        opened={createTablePopUp}
        onClose={() => setCreateTablePopUp(false)}
        title="Create Table"
        size={"md"}
        className={classes.model}
        centered
      >
        <Formik
          initialValues={{ table_name: "", table_type: "" }}
          onSubmit={async (values) => {
            try {
              setCreateTablePopUp(false);
              setIsLoading(true);
              values["shopID"] = localStorage.getItem("shop_user_id");
              await createTableMutation.mutateAsync(values, {
                onSuccess: () => {
                  shoeNotification("success", "Table Created");
                  refetch();
                },
              });
            } catch (error) {
              setIsLoading(false);
              shoeNotification("error", "Bad Network");
              refetch();
            } finally {
              setCreateTablePopUp(false);
              setIsLoading(false);
            }
          }}
        >
          {({ values, setFieldValue, handleChange, errors }) => (
            <Form>
              <Grid gutter={20}>
                <Grid.Col span={12}>
                  <SelectInputView
                    id={"table_type_id"}
                    name="table_type_id"
                    label="Table Type"
                    placeholder="Select Table Type"
                    data={Array.isArray(TableSections) ? [...TableSections] : []}
                    onChange={(res) => {
                      setFieldValue("table_type_id", res);
                    }}
                    onSearchChange={(searched) => {
                      setFieldValue("table_type", searched);
                    }}
                  />
                </Grid.Col>

                <Grid.Col span={12} h={"40%"}>
                  <TextInputView
                    id={"table_name"}
                    name={"table_name"}
                    label={"Table Name"}
                    onChange={handleChange}
                    placeholder={"Enter Name"}
                    value={values.table_name}
                  />
                </Grid.Col>
                <Grid.Col>
                  <PrimaryButton type="submit">Create</PrimaryButton>
                </Grid.Col>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>

      <Modal
        opened={createTableSectionPopUp}
        onClose={() => setCreateTableSectionPopUp(false)}
        title="Create Section"
        size={"md"}
        className={classes.modelSection}
        centered
      >
        <Formik
          initialValues={{ sectionName: "" }}
          onSubmit={async (values) => {
            try {
              setCreateTableSectionPopUp(false);
              setIsLoading(true);
              values["shopID"] = localStorage.getItem("shop_user_id");
              await createTableSectionMutation.mutateAsync(values, {
                onSuccess: () => {
                  shoeNotification("success", "Table Section Created");
                  TableSectionRefetch();
                },
              });
            } catch (error) {
              setIsLoading(false);
              shoeNotification("error", "Bad Network");
              TableSectionRefetch();
            } finally {
              setCreateTableSectionPopUp(false);
              setIsLoading(false);
            }
          }}
        >
          {({ values, handleChange, errors }) => (
            <Form>
              <Grid gutter={20}>
                <Grid.Col span={12} h={"40%"}>
                  <TextInputView
                    id={"sectionName"}
                    name={"sectionName"}
                    label={"Section Name"}
                    onChange={handleChange}
                    placeholder={"Enter Section Name"}
                    value={values.sectionName}
                  />
                </Grid.Col>
                <ErrorMessage name="sectionName" />
                <Grid.Col>
                  <PrimaryButton type="submit">Create</PrimaryButton>
                </Grid.Col>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>
      <LoadingOverlay
        visible={
          isLoading || (!isFetched && isFetching) || isFetchingTableSection
        }
      />
    </Paper>
  );
};

export default TableContainer;
