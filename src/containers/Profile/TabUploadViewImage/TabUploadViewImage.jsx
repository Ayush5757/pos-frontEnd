import React, { useState } from "react";
import { Box, Button, Grid, LoadingOverlay, Tabs } from "@mantine/core";
import DropZoneCustome from "../../../components/DropZoneCustome";
import { useQuery } from "@tanstack/react-query";
import { getUploadedImage } from "../../../services/api/imageUpload";
import axios from "axios";
import { Form, Formik } from "formik";
import { useStyles } from "./style";

const TabUploadViewImage = () => {
  const { classes } = useStyles();
  const [activeTab, setActiveTab] = useState("first");
  const [selectedImage, setSelectedImage] = useState([]);
  const { data,isLoading } = useQuery({
    queryKey: ["getAllImage"],
    queryFn: ()=>getUploadedImage(localStorage.getItem('shop_user_id')),
  });
  return (
    <div>
      <Tabs value={activeTab} onTabChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab
            value="first"
            className={`${
              activeTab === "first"
                ? classes.selectedTab
                : classes.notSelectedTab
            } ${classes.tabOne}`}
          >
            View Images
          </Tabs.Tab>
          <Tabs.Tab
            value="second"
            className={`${
              activeTab === "second"
                ? classes.selectedTab
                : classes.notSelectedTab
            } ${classes.tabTwo}`}
          >
            Upload Image
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="first" className={classes.tabOnePanel}>
          <Box className={classes.ImageShowBox}>
            <Grid gutter={8}>
              {isLoading && <LoadingOverlay visible={true} overlayBlur={2} />}
              {data?.data?.images &&
                data?.data?.images?.map((res) => {
                  return (
                    <Grid.Col span={6}>
                      <img
                        className={classes.imagesGalleryImage}
                        src={`${process.env.react_app_web_socket_backend}/images/${res.imagePath}`}
                        alt="shopImage"
                      />
                    </Grid.Col>
                  );
                })}
            </Grid>
          </Box>
        </Tabs.Panel>
        <Tabs.Panel value="second">
          <Formik
            initialValues={{ image: "" }}
            onSubmit={(values, { resetForm }) => {
              values.shopId = localStorage.getItem('shop_user_id')
              axios
                .post(`${process.env.react_app_web_socket_backend}/api/upload-images`, values, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((response) => {
                  resetForm();
                  setSelectedImage([]);
                })
                .catch((error) => {
                  console.error("Error uploading image:", error);
                });
            }}
          >
            {({ setFieldValue }) => (
              <Form>
                <DropZoneCustome
                  setSelectedImage={setSelectedImage}
                  selectedImage={selectedImage}
                  maxSizeMB={1}
                  imageList={(imagesList) => {
                    setFieldValue("image", imagesList[0]);
                  }}
                />
                <Button type="submit" className={classes.submitBtn}>
                  {" "}
                  submit
                </Button>
              </Form>
            )}
          </Formik>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default TabUploadViewImage;
