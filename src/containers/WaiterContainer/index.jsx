import {
  ActionIcon,
  Box,
  Divider,
  Grid,
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
  getTablesSections,
} from "../../services/api/tables";
import { ErrorMessage, Form, Formik } from "formik";
import { PrimaryButton } from "../../components/Buttons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { shoeNotification } from "../../components/Notify";
import { useSelector, useDispatch } from "react-redux";
import { AddTables, RemoveEntireTable } from "../../redux/slices/Tables";
import {
  getTableAPIWaiter,
  getisUserValidWaiter,
} from "../../services/api/waiter";
import { IconCloudDownload } from "@tabler/icons-react";
import { IconPhotoHeart } from "@tabler/icons-react";

const WaiterContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Tables = useSelector((state) => state?.TablesReduser?.Tables);
  const { classes } = useStyles();
  const [createTablePopUp, setCreateTablePopUp] = useState(false);
  const [createTableSectionPopUp, setCreateTableSectionPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [TableSections, setTableSections] = useState([]);
  const [showMenuImagePopup, setShowMenuImagePopup] = useState(false);
  const [LogOut, setLogOut] = useState(false);

  const { data, refetch, isFetching, error, isFetched } = useQuery({
    queryKey: ["getTableAPIWaiter"],
    queryFn: () => getTableAPIWaiter(),
    enabled: false,
  });
  const { data: userData } = useQuery({
    queryKey: ["getisUserValidWaiter"],
    queryFn: () => getisUserValidWaiter(),
  });
  if (userData?.data?.target === null) {
    localStorage.removeItem("waiter_access_token");
    navigate("/loginwaiter");
  }
  useEffect(() => {
    refetch();
  }, []);

  if (error) {
    shoeNotification("error", error?.message);
  }

  if (data?.data?.target) {
    if (Tables.length === 0) {
      dispatch(AddTables(data?.data?.target));
    }
  }

  const {
    data: TableSectionData,
    isFetching: isFetchingTableSection,
    refetch: TableSectionRefetch,
    error: TableSectionError,
  } = useQuery({
    queryKey: ["getTablesSections"],
    queryFn: () =>
      getTablesSections({
        shopID: localStorage.getItem("shop_user_id"),
      }),
    enabled: false,
  });

  if (TableSectionError) {
    shoeNotification("error", error?.message);
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

  return (
    <Paper mt={10}>
      <Grid gutter={7}>
        <Grid.Col span={4}>
          <Box style={{display:'flex'}}>
          <ActionIcon
            variant="light"
            color="red"
            size="lg"
            onClick={() => {
              dispatch(RemoveEntireTable());
              refetch();
            }}
          >
            <IconCloudDownload
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
          {isFetching && 'loading...'}
            </Box>
        </Grid.Col>
        <Grid.Col span={4} className={classes.middleGrid}>
            <PrimaryButton onClick={()=>setLogOut(true)}>LogOut</PrimaryButton>
        </Grid.Col>
        <Grid.Col span={4} className={classes.secondGrid}>
          <ActionIcon
            variant="light"
            color="red"
            size="lg"
            onClick={() => {
              setShowMenuImagePopup(!showMenuImagePopup);
            }}
          >
            <IconPhotoHeart
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        </Grid.Col>
        {data?.data?.target?.map((sectionData) => {
          return (
            <>
              <Grid.Col span={12}>
                <TextN1 className={classes.sectionHead} ml={10} mt={2}>
                  {sectionData?.table_type}
                </TextN1>
              </Grid.Col>
              <>
                {sectionData?.table_data?.map((val) => (
                  <Grid.Col span={4} lg={1} className={classes.TableGrid}>
                    <Box
                      className={classes.TableBox}
                      style={{
                        backgroundColor:
                          val?.orderID || val?.total ? "#99ff99" : "#ccccb3",
                      }}
                      onClick={() =>
                        navigate("/waiter-inventorie", {
                          state: {
                            tableID: val?._id,
                            table_name: val?.name,
                            table_type_id: sectionData?.table_type_id,
                            orderID: val?.orderID,
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
                  </Grid.Col>
                ))}
              </>
              <Divider variant="dashed" mt={20} />
            </>
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
              shoeNotification("error", error?.message);
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
                    data={[...TableSections] ?? []}
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
              shoeNotification("error", error?.message);
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

      <Modal
        opened={showMenuImagePopup}
        onClose={() => setShowMenuImagePopup(false)}
        title="Check Food Images"
        size={"md"}
        className={classes.modelSection}
        centered
      >
        <TextN1> Do You want To Show Menu Images </TextN1>
        <Box className={classes.showMenuPopBox} mt={20}>
          <PrimaryButton
            onClick={() => {
              localStorage.setItem("showMenuImage", '1');
              setShowMenuImagePopup(false);
            }}
          >
            Yes
          </PrimaryButton>
          <PrimaryButton
            onClick={() => {
              localStorage.setItem("showMenuImage", '0');
              setShowMenuImagePopup(false);
            }}
          >
            No
          </PrimaryButton>
        </Box>
      </Modal>

      <Modal
        opened={LogOut}
        onClose={() => setLogOut(false)}
        title="LogOut Waiter"
        size={"md"}
        className={classes.modelSection}
        centered
      >
        <TextN1> Are you sure you want to logout? </TextN1>
        <Box className={classes.showMenuPopBox} mt={20}>
          <PrimaryButton
            onClick={() => {
              localStorage.removeItem("waiter_access_token");
              setLogOut(()=>false);
              navigate('/loginwaiter');
            }}
          >
            Yes
          </PrimaryButton>
          <PrimaryButton
            onClick={() => {
              setLogOut(false);
            }}
          >
            No
          </PrimaryButton>
        </Box>
      </Modal>
      <LoadingOverlay
        visible={
          isLoading || (!isFetched && isFetching) || isFetchingTableSection
        }
      />
    </Paper>
  );
};

export default WaiterContainer;
