import {
  ActionIcon,
  Box,
  Divider,
  Grid,
  Image,
  Loader,
  LoadingOverlay,
  Modal,
  Paper,
} from "@mantine/core";
import React, { useState } from "react";
import { useStyles } from "./style";
import { Form, Formik } from "formik";
import { TextN1 } from "../../components/Text";
import DropZoneCustome from "../../components/DropZoneCustome";
import { PrimaryButton } from "../../components/Buttons";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  delete_image_other_banner,
  delete_image_other_menu,
  get_user_image_envalop,
} from "../../services/api/user";
import CardMessage from "../../components/Card/CardMessage";
import { IconTrashXFilled } from "@tabler/icons-react";
import { shoeNotification } from "../../components/Notify";

const ShopBanerImagesTaking = () => {
  const { classes } = useStyles();
  const [selectedBanerImage, setSelectedBanerImage] = useState([]);
  const [selectedMenuImage, setSelectedMenuImage] = useState([]);
  const [deleteBanerImageID, setdeleteBanerImageID] = useState(null);
  const [deletemenuImageID, setdeletemenuImageID] = useState(null);
  const [imgLoading, setimgLoading] = useState(false);
  const { data, refetch } = useQuery({
    queryKey: ["getInventriesbyTableID", localStorage.getItem("shop_user_id")],
    queryFn: () =>
      get_user_image_envalop({
        UT_ID: localStorage.getItem("accesstoken"),
      }),
  });
  const deleteImage_menuInstance = useMutation({
    mutationFn: (newVal) => delete_image_other_menu(newVal),
  });
  const deleteImage_bannerImage = useMutation({
    mutationFn: (newVal) => delete_image_other_banner(newVal),
  });
  return (
    <>
      <Box className={classes.outer_box} mt={20}>
        <Box className={classes.inner_box}>
          <Paper shadow="xl" p={10} className={classes.box1} pb={25}>
            <Formik
              initialValues={{}}
              onSubmit={async (values) => {
                if (data?.data?.banner_image?.length >= 4) {
                  shoeNotification("error", "4 Image Limit");
                  return;
                } else {
                  if (selectedBanerImage?.length) {
                    values.shopID = localStorage.getItem("shop_user_id");
                    setimgLoading(() => true);
                    await axios
                      .post(
                        "http://localhost:8000/api/otherimage/banner/image",
                        values,
                        {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        }
                      )
                      .then(() => {
                        setimgLoading(() => false);
                        setSelectedBanerImage(null);
                        shoeNotification("success", "Upload Successfully");
                        refetch();
                      })
                      .catch((error) => {
                        setimgLoading(() => false);
                        setSelectedBanerImage(null);
                      });
                  } else {
                    shoeNotification("error", "Please Select Image");
                  }
                }
              }}
              enableReinitialize
            >
              {({ setFieldValue }) => (
                <Form>
                  <Grid gutter={5}>
                    <Grid.Col span={12} mt={0}>
                      <Paper className={classes.heading}>
                        <TextN1>Shop Banner Images</TextN1>
                      </Paper>
                      <Divider />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <DropZoneCustome
                        setSelectedImage={setSelectedBanerImage}
                        selectedImage={selectedBanerImage}
                        maxSizeMB={0.5}
                        imageList={(imagesList) => {
                          setFieldValue("photobanner", imagesList[0]);
                        }}
                      />
                    </Grid.Col>
                    <Grid.Col
                      span={12}
                      mt={5}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <PrimaryButton
                        type="submit"
                        className={classes.save_btn}
                        style={{ width: "40%" }}
                      >
                        Save
                      </PrimaryButton>
                    </Grid.Col>
                  </Grid>
                </Form>
              )}
            </Formik>
            <Grid>
              {data?.data?.banner_image?.map((val) => {
                return (
                  <Grid.Col span={6} sm={6} lg={4} xl={3} mt={20}>
                    <CardMessage
                      shadow={"xl"}
                      padding="0px"
                      imgH="12rem"
                      className={classes.food_card_inside}
                      customeLowerBox={
                        <Box className={classes.box_delete}>
                          <ActionIcon
                            variant="transparent"
                            size="1.4rem"
                            color="red"
                            onClick={async () => {
                              setdeleteBanerImageID(val);
                            }}
                          >
                            <IconTrashXFilled size="2.2rem" color="red" />
                          </ActionIcon>
                        </Box>
                      }
                      imageUrl={val?.photoURL}
                    />
                  </Grid.Col>
                );
              })}
            </Grid>
            <LoadingOverlay
              color="blue"
              type="bars"
              visible={
                imgLoading ||
                deleteImage_menuInstance?.isLoading ||
                deleteImage_bannerImage?.isLoading
              }
              h={'100vh'}
            />
          </Paper>

          <Paper shadow="xl" p={10} className={classes.box1} mt={20} pb={25}>
            <Formik
              initialValues={{}}
              onSubmit={async (values) => {
                if (data?.data?.menu_instance_image?.length >= 4) {
                  shoeNotification("error", "4 Image Limit");
                  return;
                } else {
                  if (selectedMenuImage?.length) {
                    values.shopID = localStorage.getItem("shop_user_id");
                    setimgLoading(true);
                    await axios
                      .post(
                        "http://localhost:8000/api/otherimage/menuInstance/image",
                        values,
                        {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        }
                      )
                      .then(() => {
                        setimgLoading(() => false);
                        setSelectedMenuImage(null);
                        shoeNotification("success", "Upload Successfully");
                        refetch();
                      })
                      .catch((error) => {
                        setSelectedBanerImage(null);
                      });
                  } else {
                    shoeNotification("error", "Please Select Image");
                  }
                }
              }}
              enableReinitialize
            >
              {({ setFieldValue }) => (
                <Form>
                  <Grid gutter={5}>
                    <Grid.Col span={12} mt={5}>
                      <Paper className={classes.heading}>
                        <TextN1>Menu Images</TextN1>
                      </Paper>
                      <Divider />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <DropZoneCustome
                        setSelectedImage={setSelectedMenuImage}
                        selectedImage={selectedMenuImage}
                        maxSizeMB={1}
                        imageList={(imagesList) => {
                          setFieldValue("photomenu", imagesList[0]);
                        }}
                      />
                    </Grid.Col>
                    <Grid.Col
                      span={12}
                      mt={5}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <PrimaryButton type="submit" style={{ width: "40%" }}>
                        Save
                      </PrimaryButton>
                    </Grid.Col>
                  </Grid>
                </Form>
              )}
            </Formik>
            <Grid>
              {data?.data?.menu_instance_image?.map((val, index) => {
                return (
                  <Grid.Col
                    span={6}
                    sm={6}
                    lg={4}
                    xl={3}
                    mt={20}
                    className={classes.grid_card_message}
                  >
                    <CardMessage
                      shadow={"xl"}
                      imgH="12rem"
                      padding="0"
                      className={classes.food_card_inside}
                      customeLowerBox={
                        <Box className={classes.box_delete}>
                          <ActionIcon
                            variant="transparent"
                            size="1.4rem"
                            color="red"
                            onClick={() => {
                              setdeletemenuImageID(val);
                            }}
                          >
                            <IconTrashXFilled size="2.2rem" color="red" />
                          </ActionIcon>
                        </Box>
                      }
                      imageUrl={val?.photoURL}
                    />
                  </Grid.Col>
                );
              })}
            </Grid>
            <LoadingOverlay
              color="blue"
              type="bars"
              visible={
                imgLoading ||
                deleteImage_menuInstance?.isLoading ||
                deleteImage_bannerImage?.isLoading
              }
              mt={'80vh'}
              h={'100vh'}
            />
          </Paper>
        </Box>

        <Modal
          opened={deleteBanerImageID}
          onClose={() => setdeleteBanerImageID(null)}
          title={`Send Kot to Kitchen`}
          size={"md"}
          className={classes.model}
          centered
        >
          <TextN1>Are You Sure You Want To Delete This Image.</TextN1>
          <Box className={classes.canselDeleteBox} mt={20}>
            <PrimaryButton onClick={() => setdeleteBanerImageID(null)}>
              cancel
            </PrimaryButton>
            <PrimaryButton
              onClick={async () => {
                try {
                  await deleteImage_bannerImage.mutateAsync(
                    {
                      image_id: deleteBanerImageID?._id,
                      UT_ID: localStorage.getItem("accesstoken"),
                      photo: deleteBanerImageID?.photo,
                    },
                    {
                      onSuccess: (res) => {
                        setdeleteBanerImageID(() => null);
                        refetch();
                        shoeNotification("success", "Deleted successfully");
                      },
                    }
                  );
                } catch (error) {
                  shoeNotification("error", "error");
                }
              }}
            >
              Confirm
            </PrimaryButton>
          </Box>
        </Modal>

        <Modal
          opened={deletemenuImageID}
          onClose={() => setdeletemenuImageID(null)}
          title={`Delete Menu`}
          size={"md"}
          className={classes.model}
          centered
        >
          <TextN1>Are You Sure You Want To Delete This Image.</TextN1>
          <Box className={classes.canselDeleteBox} mt={20}>
            <PrimaryButton onClick={() => setdeletemenuImageID(null)}>
              cancel
            </PrimaryButton>
            <PrimaryButton
              onClick={async () => {
                try {
                  await deleteImage_menuInstance.mutateAsync(
                    {
                      image_id: deletemenuImageID?._id,
                      UT_ID: localStorage.getItem("accesstoken"),
                      photo: deletemenuImageID?.photo,
                    },
                    {
                      onSuccess: (res) => {
                        setdeletemenuImageID(() => null);
                        refetch();
                        shoeNotification("success", "Deleted successfully");
                      },
                    }
                  );
                } catch (error) {
                  shoeNotification("error", "error");
                }
              }}
            >
              Confirm
            </PrimaryButton>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default ShopBanerImagesTaking;
