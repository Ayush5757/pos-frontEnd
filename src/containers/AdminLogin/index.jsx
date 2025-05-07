import React from "react";
import { Paper, Anchor, Box, LoadingOverlay } from "@mantine/core";
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
import { admin_login } from "../../services/api/admin";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const loginMutation = useMutation({
    mutationFn: (newVal) => admin_login(newVal),
  });
  return (
    <Box className={classes.wrapper}>
      <Paper className={classes.formWrap} radius={0} p={30}>
        <TitleText order={2} ta="center" mt="md" mb={50}>
          Welcome to Admin Panel
        </TitleText>
        <Formik
          initialValues={{ pass: "" }}
          onSubmit={async (values) => {
            try {
              await loginMutation.mutateAsync(values, {
                onSuccess: (res) => {
                  shoeNotification("success", 'login Success');
                  localStorage.setItem('my_admin_token',res?.data?.oktoken)
                  navigate('/my-admin-panel')
                },
              });
            } catch (error) {
              shoeNotification("error", error?.message);
            }
          }}
        >
          {({ handleChange }) => (
            <Form>
              <PasswordInputView
                name="pass"
                id="pass"
                label="Password"
                placeholder="password"
                mt="md"
                onChange={handleChange}
              />
              <PrimaryButton type="submit" fullWidth mt="xl" size="md">
                {loginMutation.isLoading ? "Loading..." : "Login"}
              </PrimaryButton>
            </Form>
          )}
        </Formik>
        <LoadingOverlay visible={loginMutation.isLoading} />
      </Paper>
    </Box>
  );
};

export default AdminLogin;
