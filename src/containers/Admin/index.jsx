import { Box, Divider, Grid } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { TextN1 } from "../../components/Text";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  changeStatus_admin,
  get_all_user_admin,
  isOTPBook_Status_admin,
  user_complete_Status_admin,
} from "../../services/api/admin";
import { TextInputViewNormal } from "../../components/Inputs";
import { PrimaryButton } from "../../components/Buttons";
import { shoeNotification } from "../../components/Notify";
import { Form, Formik } from "formik";

const Admin = () => {
  const [page, setPage] = useState(1);
  const { data, refetch } = useQuery({
    queryKey: ["get_all_user_admin"],
    queryFn: () =>
      get_all_user_admin({
        password: localStorage.getItem("my_admin_token"),
        page: page,
      }),
    enabled: false,
  });
  useEffect(() => {
    refetch();
  }, []);
  
  const OTPBookSTatusAdmin = useMutation({
    mutationFn: (newVal) => isOTPBook_Status_admin(newVal),
  });
  const userCompleteAdmin = useMutation({
    mutationFn: (newVal) => user_complete_Status_admin(newVal),
  });
  return (
    <Box>
      <Grid w={"100%"}>
        <Grid.Col span={12}>
          <TextN1>All Users</TextN1>
        </Grid.Col>
        <Grid.Col span={3}>
          <TextInputViewNormal
            type={"number"}
            onChange={(e) => {
              setPage(e?.target?.value);
            }}
            placeHolder="Page"
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <PrimaryButton onClick={() => refetch()}>Check</PrimaryButton>
        </Grid.Col>
        <Grid.Col span={12} style={{border:'1px solid #e0e0eb'}} p={10}>
          <Grid>
            {data?.data?.target?.map((val) => (
              <Grid.Col span={3} style={{border:'1px solid #e0e0eb'}}>
                <TextN1>{val?.shopName}</TextN1>
              </Grid.Col>
            ))}
          </Grid>
        </Grid.Col>
        <Grid.Col span={12}>
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              values["password"] = localStorage.getItem("my_admin_token");
              try {
                await OTPBookSTatusAdmin.mutateAsync(values, {
                  onSuccess: (res) => {
                    shoeNotification("success", "Status Changed");
                  },
                });
              } catch (error) {
                shoeNotification("error", "Somthing went wrong...");
              }
            }}
            enableReinitialize
          >
            {({ values, handleChange }) => (
              <Form>
                <Grid w={"100%"}>
                  <Grid.Col span={12}>
                    <TextN1>OTP Status Changed</TextN1>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <TextInputViewNormal
                      name="shopID"
                      onChange={handleChange}
                      placeHolder="Shop ID"
                      value={values?.shopID}
                    />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <TextInputViewNormal
                      name="otp_status"
                      type={"number"}
                      onChange={handleChange}
                      placeHolder="otp_status"
                      value={values?.otp_status}
                    />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <PrimaryButton type="submit">Save</PrimaryButton>
                  </Grid.Col>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid.Col>

        <Grid.Col span={12}>
          <Formik
            initialValues={{}}
            onSubmit={async (values) => {
              values["password"] = localStorage.getItem("my_admin_token");
              try {
                await userCompleteAdmin.mutateAsync(values, {
                  onSuccess: (res) => {
                    shoeNotification("success", "User Complete Status Changed");
                  },
                });
              } catch (error) {
                shoeNotification("error", "Somthing went wrong...");
              }
            }}
            enableReinitialize
          >
            {({ values, handleChange }) => (
              <Form>
                <Grid w={"100%"}>
                  <Grid.Col span={12}>
                    <TextN1>User Complete to View on List</TextN1>
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <TextInputViewNormal
                      name="shopID"
                      onChange={handleChange}
                      placeHolder="Shop ID"
                      value={values?.shopID}
                    />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <TextInputViewNormal
                      name="complete_status"
                      type={"number"}
                      onChange={handleChange}
                      placeHolder="otp_status"
                      value={values?.otp_status}
                    />
                  </Grid.Col>
                  <Grid.Col span={3}>
                    <PrimaryButton type="submit">Save</PrimaryButton>
                  </Grid.Col>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Admin;
