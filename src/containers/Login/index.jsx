import React from "react";
import { Paper, Anchor, Box, LoadingOverlay, Button, Grid } from "@mantine/core";
import { useStyles } from "./style";
import { TextInputView } from "../../components/Inputs";
import { PrimaryButton } from "../../components/Buttons";
import { TextN1, TitleText } from "../../components/Text";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ErrorMessageView from "../../components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/api/login";
import { useNavigate } from "react-router-dom";
import { shoeNotification } from "../../components/Notify";
import { setAccessToke } from "../../utils/constFunction";
import PasswordInputView from "../../components/Inputs/PasswordInputView";
import { handelGoogleLogin } from "../../utils/config";
import GoogleButton from "react-google-button";
import Spline from "@splinetool/react-spline";

const Login = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const loginMutation = useMutation({
    mutationFn: (newVal) => login(newVal),
  });
  const setGstLocal = (data) => {
    localStorage.setItem("GSTIN", data);
  };

  return (
    <Box className={classes.wrapper}>
      <Grid gutter={10} style={{ padding: "5px"}}>
        <Grid.Col span={12} md={6}>
          <Paper className={classes.formWrap} radius={0} p={30}>
            <TitleText order={2} ta="center" mt="md" mb={50}>
              Welcome to Login
            </TitleText>
            <Formik
              initialValues={{ shopEmail: "", shopPassword: "" }}
              onSubmit={async (values) => {
                console.log("values", values);
                try {
                  await loginMutation.mutateAsync(values, {
                    onSuccess: (res) => {
                      if (localStorage.getItem("kot_access_token")) {
                        localStorage.removeItem("kot_access_token");
                      }
                      if (res?.data?.user?._id) {
                        setAccessToke(res?.data?.token);
                        localStorage.setItem(
                          "shop_user_id",
                          res?.data?.user?._id
                        );
                        localStorage.setItem(
                          "address",
                          res?.data?.user?.address
                        );
                        localStorage.setItem("phone", res?.data?.user?.phone);
                        localStorage.setItem(
                          "shopName",
                          res?.data?.user?.shopName
                        );
                        setGstLocal(res?.data?.user?.gstin);
                        navigate("/dashboard");
                        shoeNotification("success", "Login Success");
                      }
                    },
                  });
                } catch (error) {
                  shoeNotification("error", error?.message);
                }
              }}
              validationSchema={Yup.object({
                shopEmail: Yup.string()
                  .email("invalid email address")
                  .required("Required"),
                shopPassword: Yup.string().required("Required"),
              })}
            >
              {({ handleChange }) => (
                <Form>
                  <TextInputView
                    name="shopEmail"
                    id="shopEmail"
                    label="Email Address"
                    placeholder="hello@gmail.com"
                    onChange={handleChange}
                  />
                  <ErrorMessageView name="shopEmail" />
                  <PasswordInputView
                    name="shopPassword"
                    id="shopPassword"
                    label="Password"
                    placeholder="password"
                    mt="md"
                    onChange={handleChange}
                  />
                  <ErrorMessageView name="shopPassword" />
                  <PrimaryButton type="submit" fullWidth mt="xl" size="md">
                    {loginMutation.isLoading ? "Loading..." : "Login"}
                  </PrimaryButton>

                  <TextN1 ta="center" mt="md">
                    Don&apos;t have an account?{" "}
                    <Anchor onClick={()=>navigate("/signup")}>Register</Anchor>
                  </TextN1>
                </Form>
              )}
            </Formik>
            <Box style={{ display: "flex", justifyContent: "center" }} mt={20}>
              <GoogleButton
                onClick={() => {
                  handelGoogleLogin(navigate);
                }}
              />
            </Box>
            <LoadingOverlay visible={loginMutation.isLoading} />
          </Paper>
        </Grid.Col>
      <Grid.Col span={12} md={6} style={{position:'relative',width:'100%'}}>
        <Spline style={{position: 'absolute', right:'0' , top: 0}} scene="https://prod.spline.design/zr4doD-H1BihT5Y9/scene.splinecode" />
      </Grid.Col>
      </Grid>
    </Box>
  );
};
// hidden xl:block absolute xl:right-[-28%] right-0 top-[-20%] lg:top-0
export default Login;
