import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import {
  Box,
  Grid,
  Image,
  LoadingOverlay,
  Modal,
  Paper,
} from "@mantine/core";
import DropZoneCustome from "../../components/DropZoneCustome";
import { Form, Formik } from "formik";
import { shoeNotification } from "../../components/Notify";
import { TextN1 } from "../../components/Text";
import { PrimaryButton } from "../../components/Buttons";
import axios from "axios";
import { accessTokenFunctio } from "../../services/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { delete_barCode, get_user_bar_code } from "../../services/api/user";

const BarCode = () => {
  const { classes } = useStyles();
  const [selectedBanerImage, setSelectedBanerImage] = useState([]);
  const [selectDelete, setselectDelete] = useState(null);

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["get_user_barcode"],
    queryFn: () => get_user_bar_code(),
    enabled: false
  });
  useEffect(()=>{
    refetch();
  },[])
  const deleteImage_barcode = useMutation({
    mutationFn: (newVal) => delete_barCode(newVal),
  });
  return (
    <Box>
      <Paper p={10} className={classes.box1} pb={25}>
        <Paper className={classes.heading}>
          <TextN1>Bar Code</TextN1>
        </Paper>
        {data?.data?.target.length === 0 && (
          <>
            <Formik
              initialValues={{}}
              onSubmit={async (values) => {
                if (selectedBanerImage?.length) {
                  values.shopID = localStorage.getItem("shop_user_id");
                  await axios
                    .post(
                      `${process.env.react_app_web_socket_backend}/api/barcode/barcode-add`,
                      values,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                          Authorization: "Bearer " + accessTokenFunctio(),
                        },
                      }
                    )
                    .then(() => {
                      setSelectedBanerImage([]);
                      shoeNotification("success", "Upload Successfully");
                      refetch();
                    })
                    .catch((error) => {
                      setSelectedBanerImage([]);
                    });
                } else {
                  shoeNotification("error", "Please Select Image");
                }
              }}
              enableReinitialize
            >
              {({ setFieldValue }) => (
                <Form>
                  <Grid gutter={5}>
                    <Grid.Col span={12}>
                      <DropZoneCustome
                        setSelectedImage={setSelectedBanerImage}
                        selectedImage={selectedBanerImage}
                        maxSizeMB={0.5}
                        imageList={(imagesList) => {
                          setFieldValue("photobarcode", imagesList[0]);
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
          </>
        )}
        <Grid>
          {data?.data?.target?.map((val) => (
            <Grid.Col span={6} sm={6} lg={4} xl={4} mt={20}>
              <Image src={val?.photoURL} />
              <PrimaryButton
                mt={10}
                className={classes.deleteBtn}
                onClick={() => {
                  setselectDelete(val);
                }}
              >
                Delete
              </PrimaryButton>
            </Grid.Col>
          ))}
        </Grid>
      </Paper>

      <Modal
        opened={selectDelete}
        onClose={() => setselectDelete(null)}
        title={`Delete BarCode`}
        size={"md"}
        className={classes.model}
        centered
      >
        <TextN1>Are You Sure You Want To Delete This BarCode.</TextN1>
        <Box className={classes.canselDeleteBox} mt={20}>
          <PrimaryButton onClick={() => setselectDelete(null)}>
            cancel
          </PrimaryButton>
          <PrimaryButton
            onClick={async () => {
              try {
                await deleteImage_barcode.mutateAsync(selectDelete, {
                  onSuccess: (res) => {
                    setselectDelete(() => null);
                    refetch();
                    shoeNotification("success", "Deleted successfully");
                  },
                });
              } catch (error) {
                shoeNotification("error", "error");
              }
            }}
          >
            Confirm
          </PrimaryButton>
        </Box>
      </Modal>
      <LoadingOverlay visible={isFetching} />
    </Box>
  );
};

export default BarCode;
