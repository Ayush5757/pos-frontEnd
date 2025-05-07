import {
  Box,
  Checkbox,
  Grid,
  Input,
  LoadingOverlay,
  MultiSelect,
  Paper,
  Switch,
  Textarea,
  rem,
} from "@mantine/core";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { TextInputViewNormal } from "../../components/Inputs";
import { TimeInput } from "@mantine/dates";
import { TextN1 } from "../../components/Text";
import { useStyles } from "./style";
import { PrimaryButton } from "../../components/Buttons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { shoeNotification } from "../../components/Notify";
import {
  form_1_User,
  form_2_User,
  get_form_1_User,
  user_status,
} from "../../services/api/user";

const UserProfileStructure = () => {
  const { classes } = useStyles();
  const { data, isFetching } = useQuery({
    queryKey: ["getUserProfileStructure", localStorage.getItem("shop_user_id")],
    queryFn: () =>
      get_form_1_User({
        UT_ID: localStorage.getItem("accesstoken"),
      }),
  });
  const userForm1 = useMutation({
    mutationFn: (newVal) => form_1_User(newVal),
  });
  const userForm2 = useMutation({
    mutationFn: (newVal) => form_2_User(newVal),
  });
  const userStatus = useMutation({
    mutationFn: (newVal) => user_status(newVal),
  });
  const setGstInLocal = (data)=>{
    localStorage.setItem('GSTIN',data)
  }
  const setPhoneAndAddress = (phone,address)=>{
    localStorage.setItem('phone',phone)
    localStorage.setItem('address',address)
  }
  
  return (
    <Box className={classes.outer_box}>
      <Box className={classes.inner_box}>
        {!data?.data?.userForm1?.length!==0 && (
          <>
            <Formik
              initialValues={data?.data?.userForm1[0]?.status !== 0?{checking:1}:{checking:0}}
              onSubmit={async (values) => {
                try {
                  await userStatus.mutateAsync(values, {
                    onSuccess: () => {
                      shoeNotification("success", "Updated Successfully");
                    },
                  });
                } catch (error) {
                  shoeNotification("error", "error");
                }
              }}
              enableReinitialize
            >
              {({ values, setFieldValue, errors }) => (
                <Form>
                  <Grid gutter={5}>
                    <Grid.Col span={12} mt={5}></Grid.Col>
                    <Switch
                      name="checking"
                      className={classes.check_status}
                      checked={values?.checking}
                      onChange={(event) =>
                        setFieldValue('checking',event?.currentTarget?.checked)
                      }
                      color="teal"
                      size="md"
                      label="Status"
                      
                    />
                    <Grid.Col span={12} lg={12} mt={5}>
                    <>
                  </>
                      <PrimaryButton type="submit">
                        Save
                      </PrimaryButton>
                    </Grid.Col>
                  </Grid>
                </Form>
              )}
            </Formik>

            <Formik
              initialValues={
                data?.data?.userForm1[0]?.length !== 0
                  ? {
                      shopName: data?.data?.userForm1[0]?.shopName,
                      address: data?.data?.userForm1[0]?.address,
                      phone: data?.data?.userForm1[0]?.phone,
                      alt_phone: data?.data?.userForm1[0]?.alt_phone,
                      about: data?.data?.userForm1[0]?.about,
                      pincode: data?.data?.userForm1[0]?.pincode,
                      gstin: data?.data?.userForm1[0]?.gstin,
                    }
                  : {}
              }
              onSubmit={async (values) => {
                try {
                  await userForm1.mutateAsync(values, {
                    onSuccess: (res) => {
                      if(res?.data?.user?.gstin){
                        setGstInLocal(res?.data?.user?.gstin);
                        setPhoneAndAddress(res?.data?.user?.phone , res?.data?.user?.address);
                      }
                      shoeNotification("success", "updated Successfully");
                    },
                  });
                } catch (error) {
                  shoeNotification("error", "error");
                }
              }}
              enableReinitialize
            >
              {({ values, handleChange, errors }) => (
                <Form>
                  <Grid gutter={5}>
                    <Grid.Col span={12} mt={5}>
                      <TextN1> Save Your Details </TextN1>
                    </Grid.Col>
                    <Grid.Col span={12} lg={6} mt={5}>
                      <TextInputViewNormal
                        id="shopName"
                        name="shopName"
                        size="sm"
                        placeholder="name"
                        label="Shop Name"
                        onChange={handleChange}
                        value={values?.shopName}
                      />
                    </Grid.Col>
                    <Grid.Col span={12} lg={6} mt={5}>
                      <TextInputViewNormal
                        id="address"
                        name="address"
                        size="sm"
                        placeholder="address"
                        label="Shop Address"
                        onChange={handleChange}
                        value={values?.address}
                      />
                    </Grid.Col>
                    <Grid.Col span={12} lg={6} mt={5}>
                      <TextInputViewNormal
                        id="phone"
                        name="phone"
                        size="sm"
                        placeholder="phone"
                        label="Phone Number"
                        type={"number"}
                        onChange={handleChange}
                        value={values?.phone}
                      />
                    </Grid.Col>
                    <Grid.Col span={12} lg={6} mt={5}>
                      <TextInputViewNormal
                        id="alt_phone"
                        name="alt_phone"
                        size="sm"
                        placeholder="phone"
                        label="Alternet Phone Number"
                        type={"number"}
                        onChange={handleChange}
                        value={values?.alt_phone}
                      />
                    </Grid.Col>
                    <Grid.Col span={12} lg={6} mt={5}>
                      <TextInputViewNormal
                        id="pincode"
                        name="pincode"
                        size="sm"
                        placeholder="pin"
                        label="City Pin Code"
                        type={"number"}
                        onChange={handleChange}
                        value={values?.pincode}
                      />
                    </Grid.Col>
                    <Grid.Col span={12} lg={6} mt={5}>
                      <TextInputViewNormal
                        id="city"
                        name="city"
                        size="sm"
                        placeholder="city"
                        label="City Name"
                        type={"string"}
                        onChange={handleChange}
                        value={values?.city}
                      />
                    </Grid.Col>
                    <Grid.Col span={12} lg={6} mt={5}>
                      <TextInputViewNormal
                        id="gstin"
                        name="gstin"
                        size="sm"
                        placeholder="GST"
                        label="GSTIN Number"
                        type={"string"}
                        onChange={handleChange}
                        value={values?.gstin}
                      />
                    </Grid.Col>
                    <Grid.Col span={12} lg={12} mt={5}>
                      <Textarea
                        id="about"
                        name="about"
                        label="About"
                        placeholder="Add here...."
                        onChange={handleChange}
                        value={values?.about}
                      />
                    </Grid.Col>
                    <Grid.Col span={12} lg={3} mt={5}>
                      <PrimaryButton type="submit" style={{ width: "100%" }}>
                        Save
                      </PrimaryButton>
                    </Grid.Col>
                  </Grid>
                </Form>
              )}
            </Formik>
            {/* ------------------------------------------------------------ */}
            <Formik
              initialValues={
                data?.data?.userForm1[0]?.length !== 0
                  ? {
                      shop_google_address:
                        data?.data?.userForm1[0]?.shop_google_address,
                      start_time: data?.data?.userForm1[0]?.start_time,
                      end_time: data?.data?.userForm1[0]?.end_time,
                      day_offs: data?.data?.userForm1[0]?.day_offs,
                      extra_time_info:
                        data?.data?.userForm1[0]?.extra_time_info,
                      waths_app_number: data?.data?.userForm1[0]?.waths_app_number,
                    }
                  : {}
              }
              onSubmit={async (values) => {
                try {
                  await userForm2.mutateAsync(values, {
                    onSuccess: (res) => {
                      shoeNotification("success", "updated Successfully");
                    },
                  });
                } catch (error) {
                  shoeNotification("error", "error");
                }
              }}
              enableReinitialize
            >
              {({ values, setFieldValue, handleChange, errors }) => (
                <Form>
                  <Grid gutter={5} mt={20} className={classes.second_form}>
                    <Grid.Col span={12} mt={5}>
                      <TextN1> Save Your Details </TextN1>
                    </Grid.Col>

                    <Grid.Col span={12} mt={5}>
                      <Textarea
                        name="shop_google_address"
                        size="sm"
                        onChange={handleChange}
                        placeholder="Add here...."
                        label="Google Map Address Link"
                        value={values?.shop_google_address}
                      />
                    </Grid.Col>
                    <Grid.Col span={6} lg={6} mt={5}>
                      <TimeInput
                        name="start_time"
                        size="sm"
                        onChange={handleChange}
                        placeholder="start time"
                        label="Start Time"
                        value={values?.start_time}
                        className={classes.time}
                      />
                    </Grid.Col>
                    <Grid.Col span={6} lg={6} mt={5}>
                      <TimeInput
                        name="end_time"
                        size="sm"
                        onChange={handleChange}
                        placeholder="end time"
                        label="End Time"
                        value={values?.end_time}
                        className={classes.time}
                      />
                    </Grid.Col>
                    <Grid.Col span={12} lg={6} mt={5}>
                      <MultiSelect
                        label="Any Days Off in weak"
                        placeholder="select days"
                        onChange={(val, a) => {
                          setFieldValue("day_offs", [...val]);
                        }}
                        name="day_offs"
                        data={[
                          { label: "Monday", value: "Monday" },
                          { label: "Tuesday", value: "Tuesday" },
                          { label: "Wednesday", value: "Wednesday" },
                          { label: "Thursday", value: "Thursday" },
                          { label: "Friday", value: "Friday" },
                          { label: "Saturday", value: "Saturday" },
                          { label: "Sunday", value: "Sunday" },
                        ]}
                        value={values?.day_offs ?? []}
                        className={classes.day_offs}
                      />
                    </Grid.Col>
                    <Grid.Col span={6} lg={6} mt={5}>
                      <TextInputViewNormal
                        name="extra_time_info"
                        size="sm"
                        placeholder="extra info"
                        onChange={handleChange}
                        label="Any Extra Time info"
                        value={values?.extra_time_info}
                      />
                    </Grid.Col>
                    <Grid.Col span={12} lg={12} mt={5}>
                      <TextInputViewNormal
                        name="waths_app_number"
                        type='number'
                        onChange={handleChange}
                        size="sm"
                        placeholder="wathsapp"
                        label="Wathsapp Number"
                        value={values?.waths_app_number}
                      />
                    </Grid.Col>
                    <Grid.Col span={12} lg={3} mt={5}>
                      <PrimaryButton type="submit" style={{ width: "100%" }}>
                        Save
                      </PrimaryButton>
                    </Grid.Col>
                  </Grid>
                </Form>
              )}
            </Formik>
          </>
        )}
        <LoadingOverlay visible={isFetching} />
      </Box>
    </Box>
  );
};

export default UserProfileStructure;
