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
import { ErrorMessage, Form, Formik } from "formik";
import { PrimaryButton } from "../../components/Buttons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { shoeNotification } from "../../components/Notify";
import { useSelector, useDispatch } from "react-redux";
import { IconBed } from "@tabler/icons-react";
import {
  createRoomAPI,
  createRoomSectionAPI,
  getRoomAPI,
  getRoomsSections,
  workingRoomStatusChangeAPI,
} from "../../services/api/rooms";
import { AddRooms } from "../../redux/slices/Rooms";
import { IconAdjustments } from "@tabler/icons-react";
import beds from "../../assets/beds.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

const RoomsTableContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Rooms = useSelector((state) => state?.RoomsReduser?.Rooms);
  const { classes } = useStyles();
  const [createRoomPopUp, setCreateRoomPopUp] = useState(false);
  const [createRoomSectionPopUp, setCreateRoomSectionPopUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [RoomSections, setRoomSections] = useState([]);

  const { data, refetch, isFetching, error, isFetched } = useQuery({
    queryKey: ["getRoomAPI", localStorage.getItem("shop_user_id")],
    queryFn: () =>
      getRoomAPI({
        shopID: localStorage.getItem("shop_user_id"),
      }),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, []);

  if (error) {
    shoeNotification("error", "Somthing Went Wrong");
  }

  useEffect(() => {
    if (data?.data?.target) {
      dispatch(AddRooms(data?.data?.target));
    }
  }, [data]);

  const {
    data: RoomSectionData,
    isFetching: isFetchingRoomSection,
    refetch: RoomSectionRefetch,
    error: RoomSectionError,
  } = useQuery({
    queryKey: ["getRoomsSections", localStorage.getItem("shop_user_id")],
    queryFn: () =>
      getRoomsSections({
        shopID: localStorage.getItem("shop_user_id"),
      }),
    enabled: false,
  });

  if (RoomSectionError) {
    shoeNotification("error", "Network Error");
  }

  useEffect(() => {
    let section = [];
    RoomSectionData?.data?.target?.forEach((res, index) => {
      section[index] = {
        value: res?._id,
        label: res?.roomTypeName,
      };
    });
    setRoomSections([...section]);
  }, [RoomSectionData]);

  const createRoomMutation = useMutation({
    mutationFn: (newVal) => createRoomAPI(newVal),
  });
  const createRoomSectionMutation = useMutation({
    mutationFn: (newVal) => createRoomSectionAPI(newVal),
  });
  const workingRoomStatusChange = useMutation({
    mutationFn: (newVal) => workingRoomStatusChangeAPI(newVal),
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
                  RoomSectionRefetch();
                  setCreateRoomPopUp(!createRoomPopUp);
                }}
              >
                Create Room
              </Button>
            </Grid.Col>
            <Grid.Col span={4} xs={3} sm={2.4} md={2} lg={2}>
              <Button
                variant="gradient"
                gradient={{ from: "#e62e00", to: "#000000", deg: 105 }}
                onClick={() => {
                  navigate("/fast-order-customer", { replace: true });
                }}
                ml={10}
              >
                Fast Order
              </Button>
            </Grid.Col>
            <Grid.Col span={5} xs={4} sm={3} md={3} lg={3}>
              <Button
                variant="gradient"
                gradient={{ from: "#e62e00", to: "#000000", deg: 105 }}
                onClick={() => {
                  setCreateRoomSectionPopUp(true);
                }}
              >
                Create Room Section
              </Button>
            </Grid.Col>
            <Grid.Col span={2} xs={1.5} sm={2.4} md={2} lg={3}>
              <LazyLoadImage
                src={beds}
                width={"40px"}
                effect="blur"
                style={{
                  marginLeft: 10,
                  objectFit: "cover",
                }}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
      <Grid gutter={15}>
        {Rooms?.map((sectionData) => {
          return (
            <>
              <Grid.Col span={12}>
                <TextN1 className={classes.sectionHead} ml={10} mt={10}>
                  {sectionData?.room_type}
                </TextN1>
              </Grid.Col>
              <>
                {sectionData?.room_data?.map((val) => (
                  <Grid.Col
                    span={4}
                    xs={3}
                    sm={2}
                    md={2}
                    lg={1}
                    className={classes.TableGrid}
                  >
                    <Box
                      className={classes.TableBox}
                      style={{
                        backgroundColor:
                          val?.orderID || val?.total ? "#99ff99" : "#ccccb3",
                      }}
                      onClick={() =>
                        navigate("/room-inventory", {
                          state: {
                            roomID: val?._id,
                            room_name: val?.name,
                            room_type_id: sectionData?.room_type_id,
                            orderID: val?.orderID,
                          },
                        })
                      }
                    >
                      <ActionIcon variant="transparent" p={0} size="lg">
                        <IconBed size={"2rem"} color="black" />
                      </ActionIcon>
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
                      color={val?.workingRoom ? "green" : "red"}
                      size="sm"
                      aria-label="Settings"
                      className={classes.workingRoom}
                      onClick={async () => {
                        if (val?.orderID) {
                          shoeNotification("error", "First Complete The Order");
                        } else {
                          let temp = {
                            roomID: val?._id,
                            room_type_id: sectionData?.room_type_id,
                            workingRoom: val?.workingRoom ? 0 : 1,
                          };
                          try {
                            await workingRoomStatusChange.mutateAsync(temp, {
                              onSuccess: () => {
                                refetch();
                                shoeNotification(
                                  "success",
                                  "Room Status Changed"
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
                <Grid.Col span={12}>
                  <Divider color="#f0f0f5" />
                </Grid.Col>
              </>
              <Divider variant="dashed" mt={20} />
            </>
          );
        })}
      </Grid>

      <Modal
        opened={createRoomPopUp}
        onClose={() => setCreateRoomPopUp(false)}
        title="Create Room"
        size={"md"}
        className={classes.model}
        centered
      >
        <Formik
          initialValues={{ room_name: "", room_type: "" }}
          onSubmit={async (values) => {
            try {
              setCreateRoomPopUp(false);
              setIsLoading(true);
              values["shopID"] = localStorage.getItem("shop_user_id");
              await createRoomMutation.mutateAsync(values, {
                onSuccess: () => {
                  shoeNotification("success", "Room Created");
                  refetch();
                },
              });
            } catch (error) {
              setIsLoading(false);
              shoeNotification("error", "Bad Network");
              refetch();
            } finally {
              setCreateRoomPopUp(false);
              setIsLoading(false);
            }
          }}
        >
          {({ values, setFieldValue, handleChange, errors }) => (
            <Form>
              <Grid gutter={20}>
                <Grid.Col span={12}>
                  <SelectInputView
                    id={"room_type_id"}
                    name="room_type_id"
                    label="Room Type"
                    placeholder="Select Room Type"
                    data={[...RoomSections] ?? []}
                    onChange={(res) => {
                      setFieldValue("room_type_id", res);
                    }}
                    onSearchChange={(searched) => {
                      setFieldValue("room_type", searched);
                    }}
                  />
                </Grid.Col>

                <Grid.Col span={12} h={"40%"}>
                  <TextInputView
                    id={"room_name"}
                    name={"room_name"}
                    label={"Room Name"}
                    onChange={handleChange}
                    placeholder={"Enter Name"}
                    value={values.room_name}
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
        opened={createRoomSectionPopUp}
        onClose={() => setCreateRoomSectionPopUp(false)}
        title="Create Room's Section"
        size={"md"}
        className={classes.modelSection}
        centered
      >
        <Formik
          initialValues={{ sectionName: "" }}
          onSubmit={async (values) => {
            try {
              setCreateRoomSectionPopUp(false);
              setIsLoading(true);
              values["shopID"] = localStorage.getItem("shop_user_id");
              await createRoomSectionMutation.mutateAsync(values, {
                onSuccess: () => {
                  shoeNotification("success", "Room Section Created");
                  RoomSectionRefetch();
                },
              });
            } catch (error) {
              setIsLoading(false);
              shoeNotification("error", "Bad Network");
              RoomSectionRefetch();
            } finally {
              setCreateRoomSectionPopUp(false);
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
          isLoading || (!isFetched && isFetching) || isFetchingRoomSection
        }
      />
    </Paper>
  );
};

export default RoomsTableContainer;
