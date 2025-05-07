import { Box, Grid, LoadingOverlay } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { TextInputView } from "../../components/Inputs";
import SelectInputView from "../../components/Inputs/select";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { PrimaryButton } from "../../components/Buttons";
import ErrorMessageView from "../../components/ErrorMessage";
import { ContactIconsList } from "./UserInfoList";
import { useStyles } from "./style";
import { IconPhone, IconAt, IconUserCircle } from "@tabler/icons-react";
import { IconFriends } from "@tabler/icons-react";
import { IconArticleFilledFilled } from "@tabler/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addUserDetails, getUserDetails } from "../../services/api/user";
import { shoeNotification } from "../../components/Notify";

const UserProfile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState();

  const { classes } = useStyles();

  const {
    isLoading: isLoad,
    error,
    data,
    refetch,
  } = useQuery({
    queryKey: ["userData", localStorage.getItem("shop_user_id")],
    queryFn: () => getUserDetails({ id: localStorage.getItem("shop_user_id") }),
    onSuccess: (res) => {
      setIsLoading(false);
      setUserData(res?.data?.data);
    },
  });
  const addUserDetailsMutation = useMutation({
    mutationFn: (newVal) => addUserDetails(newVal),
  });
  if (error) {
    return "error...." + error.message;
  }

  const listData = (props) => {
    return [
      {
        title: "User Name",
        description: props?.name,
        icon: IconUserCircle,
      },
      {
        title: "Phone",
        description: props?.mobileNumber ?? "--",
        icon: IconPhone,
      },
      {
        title: "Whatsapp Phone",
        description: props?.wathsappNumber ?? "--",
        icon: IconPhone,
      },
      {
        title: "Gender",
        description: props?.gender ?? "--",
        icon: IconFriends,
      },
      { title: "Email", description: props?.email ?? "--", icon: IconAt },
      {
        title: "Other",
        description: props?.others ?? "--",
        icon: IconArticleFilledFilled,
      },
    ];
  };

  return (
    <>
      {isEditable ? (
        <Formik
          initialValues={{
            name: userData?.name ?? "",
            mobileNumber: userData?.mobileNumber ?? "",
            wathsappNumber: userData?.wathsappNumber ?? "",
            gender: userData?.gender ?? "",
            email: userData?.email ?? "",
            others: userData?.others ?? "",
          }}
          
          onSubmit={(values) => {
            setIsLoading(true);
            values.id = localStorage.getItem("shop_user_id");
            console.log("values", values);
            addUserDetailsMutation.mutate(values, {
              onSuccess: (res) => {
                refetch();
                setIsEditable(false);
                shoeNotification("success", "User Details Updated");
              },
              onError: () => {
                // setIsLoading(false);
                shoeNotification("error", "Login Failed");
              },
            });
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            gender: Yup.string().required("Required"),
            mobileNumber: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
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
                    id={"name"}
                    name={"name"}
                    label={"Add User Name"}
                    onChange={handleChange}
                    placeholder={"Enter User Name"}
                    value={values.name}
                  />
                  <ErrorMessageView name="name" />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInputView
                    id={"mobileNumber"}
                    name={"mobileNumber"}
                    label={"Add Mobile Number"}
                    placeholder={"Mobile Number"}
                    value={values.mobileNumber}
                    onChange={handleChange}
                  />
                  <ErrorMessageView name="mobileNumber" />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInputView
                    id={"wathsappNumber"}
                    name={"wathsappNumber"}
                    label={"Add Wathsapp Number"}
                    placeholder={"Waths Number"}
                    value={values.wathsappNumber}
                    onChange={handleChange}
                  />
                  <ErrorMessageView name="wathsappNumber" />
                </Grid.Col>
                <Grid.Col span={12}>
                  <SelectInputView
                    id={"gender"}
                    name={"gender"}
                    label={"Add Gender"}
                    placeholder={"Select Gender"}
                    value={values.gender}
                    onChange={(value) => {
                      setFieldValue("gender", value);
                    }}
                    data={[
                      { value: "1", label: "Male" },
                      { value: "0", label: "Female" },
                    ]}
                  />
                  <ErrorMessageView name="gender" />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInputView
                    type="email"
                    id={"email"}
                    name={"email"}
                    label={"Add Email"}
                    placeholder={"Email"}
                    value={values.email}
                    onChange={handleChange}
                  />
                  <ErrorMessageView name="email" />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInputView
                    id={"others"}
                    name={"others"}
                    label={"Others"}
                    value={values.others}
                    placeholder={"Extra Details"}
                    onChange={handleChange}
                  />
                </Grid.Col>
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
                      style={{ marginTop: "15px", textAlign: "end" }}
                      onClick={() => {
                        setIsEditable(true);
                      }}
                    >
                      Edit
                    </PrimaryButton>
                  </Box>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default UserProfile;
