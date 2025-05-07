import React from "react";
import { Paper, Anchor, Box, LoadingOverlay } from "@mantine/core";
import { useStyles } from "./style";
import {  TextInputView } from "../../components/Inputs";
import { PrimaryButton } from "../../components/Buttons";
import { TextN1, TitleText } from "../../components/Text";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import ErrorMessageView from "../../components/ErrorMessage";
import {
  useMutation,
} from '@tanstack/react-query'
import { signup } from "../../services/api/signup";
import { useNavigate } from "react-router-dom";
import { shoeNotification } from "../../components/Notify";
import PasswordInputView from "../../components/Inputs/PasswordInputView";

const SignUp = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const signUpMutation = useMutation({
    mutationFn: (newVal) => signup(newVal)
  })
  return (
    <Box className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <TitleText
          order={2}
          className={classes.title}
          ta="center"
          mt="md"
          mb={50}
        >
          Welcome to SignUp
        </TitleText>
        <Formik
          initialValues={{shopName:'', shopEmail: '', shopPassword: ''}}
          onSubmit={async (values) => {
           try {
             await signUpMutation.mutateAsync(values,{
               onSuccess: (res)=>{
                 shoeNotification('success',res?.data?.msg);
                 navigate('/login');
               }
             })
            } catch (error) {
              shoeNotification('error',error?.message);
            }
          }}            
          validationSchema={Yup.object({
            shopName: Yup.string().required('Required'),
            shopEmail: Yup.string().email('invalid email address').required('Required'),
            shopPassword: Yup.string().required('Required'),
          })}
        >
          {({ handleChange }) => (
            <Form>
               <TextInputView
                name ="shopName"
                id = 'shopName'
                label="Shop Name"
                placeholder="enter name"
                onChange={handleChange}
              />
                <ErrorMessageView name="shopName" />
              <TextInputView
                name ="shopEmail"
                id = 'shopEmail'
                label="Shop Email Address"
                placeholder="hello@gmail.com"
                onChange={handleChange}
                mt="md"
              />
                <ErrorMessageView name="shopEmail" />
              <PasswordInputView
                name ="shopPassword"
                id = 'shopPassword'
                label="Shop Password"
                placeholder="enter password"
                mt="md"
                onChange={handleChange}
              />
               <ErrorMessageView name="shopPassword" />
              <PrimaryButton type="submit" fullWidth mt="xl" size="md">
                SignUp
              </PrimaryButton>

              <TextN1 ta="center" mt="md">
                Already have an account?
                <Anchor href="/login" style={{marginLeft:'5px'}}>Login</Anchor>
              </TextN1>
            </Form>
          )}
        </Formik>
        <LoadingOverlay visible={signUpMutation?.isLoading}/>
      </Paper>
    </Box>
  );
};

export default SignUp;
