import { Grid, LoadingOverlay } from "@mantine/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { TextInputView } from "../../components/Inputs";
import ErrorMessageView from "../../components/ErrorMessage";
import { useStyles } from "./style";
import { PrimaryButton } from "../../components/Buttons";
import DropZoneCustome from "../../components/DropZoneCustome";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "../../services/api/categories";
import SelectInputView from "../../components/Inputs/select";
import { accesstoken } from "../../utils/constants";
import { shoeNotification } from "../../components/Notify";
import { update_product } from "../../services/api/shopProductEdit";
import { TextN1 } from "../../components/Text";

const AddProduct = ({ selectedItem, setAddBtn, refetchItems }) => {
  const queryClient = useQueryClient();
  const { classes } = useStyles();
  const [selectedImage, setSelectedImage] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const accessToken = localStorage.getItem(accesstoken);
  const [isLoading, setisLoading] = useState(false);

  const { data: categoriesData } = useQuery({
    queryKey: ["getCategories", localStorage.getItem("shop_user_id")],
    queryFn: () =>
      getCategories({ shopID: localStorage.getItem("shop_user_id") }),
    enabled: Boolean(localStorage.getItem("shop_user_id")), // Only fetch when shop_user_id is present
    onSuccess: (res) => {
      const temp = res?.data?.target?.map((val) => ({
        value: val?._id,
        label: val?.categorie_name,
      }));
      if (temp && temp?.length !==0) {
        setCategoriesOptions([...temp]);
      }
    },
  });
  const updateProduct = useMutation({
    mutationFn: (newVal) => update_product(newVal),
  });
  return (
    <>
    <Formik
      initialValues={
        selectedItem ? selectedItem: {
          item_name: "",
          price: "",
          categorie_id: "",
          desc: "",
        }
      }
      onSubmit={async (values) => {
        if(!values?.categorie_id || values?.categorie_id?.length ===0){
          shoeNotification('error','Select Categorie')
          return
        }
        if (selectedImage?.length === 0) {
          delete values.image;
        }
        values.shopID = localStorage.getItem("shop_user_id");
        if (values?._id) {
          try {
            if(values?.photoURL){
              delete values.photoURL
            }
            await updateProduct.mutateAsync(values, {
              onSuccess: (res) => {
                setAddBtn(false);
                shoeNotification("success", res?.data?.msg);
                refetchItems();
              },
            });
          } catch (error) {
            shoeNotification("error", error?.message);
            refetchItems();
          }
        } else {
          setisLoading(()=>true)
          await axios
            .post(`${process.env.react_app_web_socket_backend}/api/food/add`, values, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + accessToken,
              },
            })
            .then((response) => {
              setSelectedImage([]);
              setAddBtn(false);
              shoeNotification("success", response?.data?.msg);
              queryClient.invalidateQueries(["getCategories", localStorage.getItem("shop_user_id")]);
            })
            .catch((error) => {
              shoeNotification("error", error?.message);
            })
            .finally(() => {
              setisLoading(()=>false)
              refetchItems();
            });
        }
      }}
    >
      {({ handleChange, values, setFieldValue }) => (
        <Form>
          <Grid>
            <Grid.Col span={12}>
              <TextInputView
                id={"item_name"}
                name={"item_name"}
                type="string"
                label={"Product Name"}
                placeholder={"product name"}
                value={values?.item_name}
                onChange={handleChange}
              />
              <ErrorMessageView name="name" />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInputView
                id={"price"}
                type="number"
                name={"price"}
                label={"Price"}
                placeholder={"Product Price"}
                value={values?.price}
                onChange={handleChange}
              />
              <ErrorMessageView name="price" />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInputView
                id={"half_price"}
                type="number"
                name={"half_price"}
                label={"Half Price"}
                placeholder={"Half Price"}
                value={values?.half_price}
                onChange={handleChange}
              />
              <ErrorMessageView name="price" />
            </Grid.Col>
            {!selectedItem && (
              <Grid.Col span={12}>
                <SelectInputView
                  id={"categorie_id"}
                  name={"categorie_id"}
                  label={"Select Categorie"}
                  placeholder={"select categorie"}
                  data={[...categoriesOptions] ?? []}
                  onChange={(val, dex) => {
                    setFieldValue("categorie_id", val);
                  }}
                  onSearchChange={(val) => {
                    setFieldValue("categorie_name", val);
                  }}
                />
                <ErrorMessageView name="categorie_id" />
              </Grid.Col>
            )}

            <Grid.Col span={12}>
              <TextInputView
                id={"desc"}
                name={"desc"}
                label={"Description"}
                placeholder={"product description"}
                value={values?.desc}
                onChange={handleChange}
              />
              <ErrorMessageView name="desc" />
            </Grid.Col>

            <TextN1 className={classes.nonsellpriceheading}> Non Selling Price </TextN1>
          
            <Grid.Col span={12}>
              <TextInputView
                id={"offer_price"}
                type="number"
                name={"offer_price"}
                label={"Non Selling Price"}
                placeholder={"Price"}
                value={values?.offer_price}
                onChange={handleChange}
              />
              <ErrorMessageView name="price" />
            </Grid.Col>
           
            <Grid.Col span={12}>
              <TextInputView
                id={"offer_half_price"}
                type="number"
                name={"offer_half_price"}
                label={"Non Selling Half Price"}
                placeholder={"Price"}
                value={values?.offer_half_price}
                onChange={handleChange}
              />
              <ErrorMessageView name="price" />
            </Grid.Col>

            {!selectedItem &&
            <Grid.Col span={12}>
              <DropZoneCustome
                setSelectedImage={setSelectedImage}
                selectedImage={selectedImage ?? selectedImage}
                maxSizeMB={1}
                imageList={(imagesList) => {
                  setFieldValue("photo", imagesList[0]);
                }}
                />
            </Grid.Col>
              }
            <Grid.Col span={12}>
              <PrimaryButton type="submit" className={classes.submitBtn}>
                Save
              </PrimaryButton>
            </Grid.Col>
          </Grid>
        </Form>
      )}
    </Formik>
    <LoadingOverlay visible={updateProduct?.isLoading || isLoading}/>
    </>
  );
};

export default AddProduct;
