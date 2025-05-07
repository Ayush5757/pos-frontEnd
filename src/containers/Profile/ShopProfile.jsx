import { Box, Grid, LoadingOverlay } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { TextInputView } from "../../components/Inputs";
import SelectInputView from "../../components/Inputs/select";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { PrimaryButton } from "../../components/Buttons";
import ErrorMessageView from "../../components/ErrorMessage";
import { ContactIconsList } from "./UserInfoList";
import { useStyles } from "./styleShop";
import { IconPhone, IconAt, IconUserCircle } from "@tabler/icons-react";
import { IconFriends } from "@tabler/icons-react";
import { IconArticleFilledFilled } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addUserDetails, getUserDetails } from "../../services/api/user";
import { shoeNotification } from "../../components/Notify";
import { addShopDetails, getShopDetails } from "../../services/api/shop";
import DropZoneCustome from "../../components/DropZoneCustome";
import { Tabs } from "@mantine/core";

const ShopProfile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shopData, setShopData] = useState();

  const { classes } = useStyles();

  const {
    isLoading: isLoad,
    error,
    data,
    refetch,
  } = useQuery({
    queryKey: ["shopData", localStorage.getItem("shop_user_id")],
    queryFn: () => getShopDetails(localStorage.getItem("shop_user_id")),
    onSuccess: (res) => {
      setIsLoading(false);
      setShopData(res?.data?.data);
    },
  });

  const addShopDetailsMutation = useMutation({
    mutationFn: (newVal) => addShopDetails(newVal),
  });

  if (error) {
    return "error...." + error.message;
  }

  const listData = (props) => {
    return [
      {
        title: "Shop Name",
        description: props?.shopName,
        icon: IconUserCircle,
      },
      {
        title: "Shop Address",
        description: props?.shopAddress ?? "--",
        icon: IconPhone,
      },
      {
        title: "Google Map Address",
        description: props?.googleMapAddress ?? "--",
        icon: IconPhone,
      },
      {
        title: "description",
        description: props?.description ?? "--",
        icon: IconFriends,
      },
      {
        title: "Experience",
        description: props?.experience ?? "--",
        icon: IconAt,
      },
    ];
  };
  return (
    <>
      {(isEditable) ? (
        <Formik
          initialValues={{
            shopName: shopData?.shopName ?? "",
            shopAddress: shopData?.shopAddress ?? "",
            googleMapAddress: shopData?.googleMapAddress ?? "",
            description: shopData?.description ?? "",
            experience: shopData?.experience ?? "",
          }}
          
          onSubmit={(values) => {
            setIsLoading(true);
            if (shopData) {
              values.id = shopData.id;
            }
            values.userid = localStorage.getItem("shop_user_id");
            addShopDetailsMutation.mutate(values, {
              onSuccess: (res) => {
                refetch();
                setIsEditable(false);
                shoeNotification("success", "Shop Details Added");
              },
              onError: () => {
                // setIsLoading(false);
                shoeNotification("error", "Shop Details Failed");
              },
            });
          }}
          validationSchema={Yup.object({
            shopName: Yup.string().required("Required"),
            // gender: Yup.string().required("Required"),
            // mobileNumber: Yup.string().required("Required"),
            // email: Yup.string()
            //   .email("Invalid email address")
            //   .required("Required"),
          })}
        >
          {({
            // isSubmitting,
            handleChange,
            values,
            setFieldValue,
          }) => (
            <Form>
              <Grid>
                <Grid.Col span={12}>
                  <TextInputView
                    id={"shopName"}
                    name={"shopName"}
                    label={"Add Shop Name"}
                    onChange={handleChange}
                    // placeholder={"Enter Shop Name"}
                    value={values.shopName}
                  />
                  <ErrorMessageView name="shopName" />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInputView
                    id={"shopAddress"}
                    name={"shopAddress"}
                    label={"Add Shop Address"}
                    onChange={handleChange}
                    // placeholder={"Enter Shop Name"}
                    value={values.shopAddress}
                  />
                  <ErrorMessageView name="shopAddress" />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInputView
                    id={"googleMapAddress"}
                    name={"googleMapAddress"}
                    label={"Add Google Address"}
                    // placeholder={"Mobile Number"}
                    value={values.googleMapAddress}
                    onChange={handleChange}
                  />
                  <ErrorMessageView name="googleMapAddress" />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInputView
                    id={"description"}
                    name={"description"}
                    label={"Add Description"}
                    placeholder={"Waths Number"}
                    value={values.description}
                    onChange={handleChange}
                  />
                  <ErrorMessageView name="description" />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInputView
                    id={"experience"}
                    name={"experience"}
                    label={"experience"}
                    value={values.experience}
                    placeholder={"Extra Details"}
                    onChange={handleChange}
                  />
                  <ErrorMessageView name="experience" />
                </Grid.Col>

                <Grid.Col span={12}></Grid.Col>

                <Grid.Col span={6}>
                  <PrimaryButton type="submit">Add Details</PrimaryButton>
                </Grid.Col>
                <Grid.Col span={6} style={{ textAlign: "end" }}>
                  <PrimaryButton
                    onClick={() => {
                      setIsEditable(false);
                    }}
                  >
                    Cancel
                  </PrimaryButton>
                </Grid.Col>
              </Grid>
            </Form>
          )}
        </Formik>
      ) : (
        <>
          {isLoad || isLoading ? (
            <LoadingOverlay visible={true} overlayBlur={2} />
          ) : (
            <>
              {data?.data?.data && (
                <>
                  <ContactIconsList data={listData(data?.data?.data)} />
                  <Box className={classes.editBtnBox}>
                    <PrimaryButton
                      style={{
                        width: "100%",
                        marginTop: "15px",
                        textAlign: "end",
                      }}
                      onClick={() => {
                        setIsEditable(true);
                      }}
                    >
                      Edit
                    </PrimaryButton>
                  </Box>
                </>
              )}
              {!data?.data?.data && (
                <Box className={classes.editBtnBox}>
                  <PrimaryButton
                    style={{ marginTop: "15px", textAlign: "end" }}
                    onClick={() => {
                      setIsEditable(true);
                    }}
                  >
                    Add Shop Details
                  </PrimaryButton>
                </Box>
              )}
            </>
          )}
        </>
      )}

    </>
  );
};

export default ShopProfile;
