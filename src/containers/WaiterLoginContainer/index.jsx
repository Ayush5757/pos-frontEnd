import React from "react";
import { Paper, Anchor, Box } from "@mantine/core";
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
import { waiter_login_API } from "../../services/api/waiter";

const WaiterLoginContainer = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  const WaiterloginMutation = useMutation({
    mutationFn: (newVal) => waiter_login_API(newVal),
  });

  return (
    <Box className={classes.wrapper}>
      <Paper className={classes.formWrap} radius={0} p={30}>
        <TitleText order={2} ta="center" mt="md" mb={50}>
          Welcome to Waiter Login
        </TitleText>
        <Formik
          initialValues={{ user_name: "", password: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await WaiterloginMutation.mutateAsync(values, {
                onSuccess: (res) => {
                  shoeNotification("success", "Waiter Login Success");
                  if (localStorage?.getItem("accesstoken")) {
                    localStorage.removeItem("accesstoken");
                    localStorage.removeItem("shop_user_id");
                  }
                  localStorage.setItem(
                    "waiter_access_token",
                    res?.data?.target
                  );
                  navigate('/waiter-table-store')
                }
              });
            } catch (error) {
              shoeNotification("error", "Credentials Not Correct");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, handleChange, errors, touched }) => (
            <Form>
              <TextInputView
                name="user_name"
                id="user_name"
                label="Waiter UserName"
                placeholder="User Name"
                onChange={handleChange}
              />

              <PasswordInputView
                name="password"
                id="password"
                label="Password"
                placeholder="Password"
                mt="md"
                onChange={handleChange}
              />

              <PrimaryButton type="submit" fullWidth mt="xl" size="md">
                Login
              </PrimaryButton>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default WaiterLoginContainer;
