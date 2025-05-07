import React from "react";
import { Paper, Box } from "@mantine/core";
import { useStyles } from "./style";
import {  TextInputView } from "../../components/Inputs";
import { PrimaryButton } from "../../components/Buttons";
import { TitleText } from "../../components/Text";
import { Formik, Form } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { shoeNotification } from "../../components/Notify";
import PasswordInputView from "../../components/Inputs/PasswordInputView";
import { Kot_User_Login_API } from "../../services/api/kot";

const KotLogin = () => {
    const navigate = useNavigate();
    const { classes } = useStyles();

    const KOTloginMutation = useMutation({
      mutationFn: (newVal) => Kot_User_Login_API(newVal),
    });

  return (
    <Box className={classes.wrapper}>
      <Paper className={classes.formWrap} radius={0} p={30}>
        <TitleText
          order={2}
          ta="center"
          mt="md"
          mb={50}
        >
          Welcome to Kot UserLogin
        </TitleText>
        <Formik
          initialValues={{ user_name: "", password: "" }}
          onSubmit={async(values, { setSubmitting }) => {
            try{
              await KOTloginMutation.mutateAsync(values, {
                onSuccess: (res) => {
                  shoeNotification('success','KOT Login Success');
                  if(localStorage?.getItem('accesstoken')){
                    localStorage.removeItem('accesstoken')
                    localStorage.removeItem('shop_user_id')
                  }
                  localStorage.setItem('kot_access_token',res?.data?.target);
                  localStorage.setItem('shopID',res?.data?.shopID);
                  navigate('/kot-ticket-counter')
                }
              });
            }catch(error){
              shoeNotification('error','Somthing went wrong...');
            }finally{
              setSubmitting(false);
            }
           
          }}
        >
          {({ isSubmitting, handleChange, errors, touched }) => (
            <Form>
              <TextInputView
                name="user_name"
                id="user_name"
                label="KOT UserName"
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

              <PrimaryButton  type="submit" fullWidth mt="xl" size="md">
                Login
              </PrimaryButton>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  )
}

export default KotLogin