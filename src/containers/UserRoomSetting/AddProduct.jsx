import { Grid, Image } from "@mantine/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { TextInputView } from "../../components/Inputs";
import ErrorMessageView from "../../components/ErrorMessage";
import { useStyles } from "./style";
import { PrimaryButton } from "../../components/Buttons";
import DropZoneCustome from "../../components/DropZoneCustome";
import axios from "axios";
import { accesstoken } from "../../utils/constants";
import { shoeNotification } from "../../components/Notify";

const AddProduct = ({
  setselectedItemToUpdate,
  selectedItemToUpdate,
  setAddBtn,
  refetchItems,
  setisUploadLoading
}) => {
  const { classes } = useStyles();
  const [selectedImage, setSelectedImage] = useState([]);
  const accessToken = localStorage.getItem(accesstoken);
  return (
    <Formik
      initialValues={
        selectedItemToUpdate ?? {
          roomName: "",
          roomPrice: "",
          about: "",
        }
      }
      onSubmit={async (values) => {
        if (selectedImage?.length === 0) {
          delete values.image;
        }
        values.shopID = localStorage.getItem("shop_user_id");
          if (selectedItemToUpdate?.roomFirstPic || selectedItemToUpdate?._id) {
            values.isAdditional = true;
            values.room_id = selectedItemToUpdate?._id;
          }
          setisUploadLoading(()=>true)
          await axios
            .post(`${import.meta.env.VITE_WEB_SOCKET_BACKEND}/api/food/room/add`, values, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + accessToken,
              },
            })
            .then((response) => {
              
              setSelectedImage([]);
              setAddBtn(false);
              setselectedItemToUpdate(null);
              shoeNotification("success", response?.data?.msg);
            })
            .catch((error) => {
              shoeNotification("error", error?.message);
            })
            .finally(() => {
              refetchItems();
              setisUploadLoading(()=>false)
            });
      }}
    >
      {({ handleChange, values, setFieldValue }) => (
        <Form>
          <Grid>
            <Grid.Col span={12}>
              <TextInputView
                id={"roomName"}
                name={"roomName"}
                type="string"
                label={"Room Name"}
                placeholder={"enter name"}
                value={values?.roomName}
                onChange={handleChange}
              />
              <ErrorMessageView name="name" />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInputView
                id={"roomPrice"}
                type="number"
                name={"roomPrice"}
                label={"Price"}
                placeholder={"enter price"}
                value={values?.roomPrice}
                onChange={handleChange}
              />
              <ErrorMessageView name="price" />
            </Grid.Col>

            <Grid.Col span={12}>
              <TextInputView
                id={"about"}
                name={"about"}
                label={"about"}
                placeholder={"enter about"}
                value={values?.about}
                onChange={handleChange}
              />
              <ErrorMessageView name="about" />
            </Grid.Col>
            {!selectedItemToUpdate?.additionalPic && (
              <Grid.Col span={12}>
                <DropZoneCustome
                  setSelectedImage={setSelectedImage}
                  selectedImage={selectedImage && selectedImage}
                  maxSizeMB={1}
                  imageList={(imagesList) => {
                    setFieldValue("roomPic", imagesList[0]);
                  }}
                />
              </Grid.Col>
            )}
            <Grid.Col span={12}>
              <PrimaryButton type="submit" className={classes.submitBtn}>
                Save
              </PrimaryButton>
            </Grid.Col>

            {selectedItemToUpdate?.imageUrl && (
              <Grid.Col span={6}>
                <Image
                  style={{
                    boxShadow: "0 10px 8px rgba(0, 0, 0, 0.3)",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  maw={"100%"}
                  mt={10}
                  radius="10px"
                  src={selectedItemToUpdate?.imageUrl}
                  alt="Random image"
                />
              </Grid.Col>
            )}
             {selectedItemToUpdate?.additionalImageUrl && (
              <Grid.Col span={6}>
                <Image
                  style={{
                    boxShadow: "0 10px 8px rgba(0, 0, 0, 0.3)",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  maw={"100%"}
                  mt={10}
                  radius="10px"
                  src={selectedItemToUpdate?.additionalImageUrl}
                  alt="Random image"
                />
              </Grid.Col>
            )}
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default AddProduct;
