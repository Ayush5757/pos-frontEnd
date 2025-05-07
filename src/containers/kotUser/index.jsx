import { useState } from "react";
import { useStyles } from "./style";
import { useNavigate } from "react-router-dom";
import {
  ActionIcon,
  Box,
  Grid,
  Modal,
  Paper,
  PasswordInput,
  ThemeIcon,
} from "@mantine/core";
import { TextN1 } from "../../components/Text";
import { IconUserStar } from "@tabler/icons-react";
import { PrimaryButton } from "../../components/Buttons";
import { IconUserHeart } from "@tabler/icons-react";
import { Form, Formik } from "formik";
import { TextInputView } from "../../components/Inputs";
import PasswordInputView from "../../components/Inputs/PasswordInputView";
import { useMutation, useQuery } from "@tanstack/react-query";
import { shoeNotification } from "../../components/Notify";
import { Delete_User_Create_API, Kot_User_Create_API, getKotUsers } from "../../services/api/kot";
import { IconTrash } from "@tabler/icons-react";

const KotUser = () => {
  const [UserKotPopUp, setUserKotPopUp] = useState(null);
  const { classes } = useStyles();
  const navigate = useNavigate();

  const { data, refetch } = useQuery({
    queryKey: ["getMenuItems", localStorage.getItem("shop_user_id")],
    queryFn: () => getKotUsers(localStorage.getItem("shop_user_id")),
  });

  const saveKotCreateUser = useMutation({
    mutationFn: (newVal) => Kot_User_Create_API(newVal),
  });
  const deleteKotCreateUser = useMutation({
    mutationFn: (newVal) => Delete_User_Create_API(newVal),
  });

  return (
    <Grid gutter={10} style={{ padding: "5px" }}>
      <Grid.Col span={12} className={classes.userNameGrid}>
        <Box className={classes.userBox}>
          <TextN1 className={classes.userName}>KOT USER</TextN1>
        </Box>
      </Grid.Col>

      <Grid.Col span={12} xs={4} md={2} mt={15}>
        {data?.data?.target?.map((val) => {
          return (
            <Paper shadow="xl">
            <Grid span={12} gutter={0} className={classes.paper} onClick={()=>{
              setUserKotPopUp(val);
            }}>
              <Grid.Col span={10}>
                <TextN1 style={{ width: "100%" }}> {val?.user_name} </TextN1>
              </Grid.Col>
              <Grid.Col span={2}>
                <ActionIcon
                  variant="transparent"
                  size="1.8rem"
                  className={classes.delete}
                  onClick={ async () => {
                    try {
                      await deleteKotCreateUser.mutateAsync({user_id: val?._id, shopID: localStorage.getItem('shop_user_id')}, {
                        onSuccess: () => {
                          shoeNotification("success", "User Deleted");
                          setUserKotPopUp(null);
                          refetch();
                        },
                      });
                    } catch (error) {
                      shoeNotification("error", "Somthing went wrong...");
                    }
                  }}
                >
                  <IconTrash size="2.2rem" />
                </ActionIcon>
              </Grid.Col>
            </Grid>
          </Paper>
          );
        })}
      </Grid.Col>
      {data?.data?.target?.length === 0 && (
        <Grid.Col span={12} mt={20}>
          <PrimaryButton
            onClick={() => {
              setUserKotPopUp(true);
            }}
          >
            Add Kot User
          </PrimaryButton>
        </Grid.Col>
      )}

      <Modal
        opened={UserKotPopUp}
        onClose={() => {
          setUserKotPopUp(null);
        }}
        title="Kot User"
        size={"lg"}
        transitionProps={{ transition: "rotate-left", duration: 800 }}
      >
        <Formik
          initialValues={{
            user_name: UserKotPopUp ? UserKotPopUp?.user_name : "",
            password: UserKotPopUp ? UserKotPopUp?.password : "",
          }}
          onSubmit={async (values) => {
            let temp = {
              shopID: localStorage.getItem("shop_user_id"),
              ...values,
            };
            try {
              await saveKotCreateUser.mutateAsync(temp, {
                onSuccess: () => {
                  shoeNotification("success", "Kot User Created");
                  setUserKotPopUp(null);
                  refetch();
                },
              });
            } catch (error) {
              shoeNotification("error", "Somthing went wrong...");
            }
          }}
          enableReinitialize
        >
          {({ values, setFieldValue, handleChange, errors }) => (
            <Form>
              <Grid gutter={5}>
                <Grid.Col span={6}>
                  <TextInputView
                    id={"user_name"}
                    name={"user_name"}
                    label={"Kot User Name"}
                    onChange={handleChange}
                    placeholder={"Enter Name"}
                    value={values.user_name}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <PasswordInputView
                    name="password"
                    id="password"
                    label="Password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                    value={values.password}
                  />
                </Grid.Col>
                <Grid.Col span={6} mt={10}>
                  <PrimaryButton type="submit"> Save asdas </PrimaryButton>
                </Grid.Col>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>
    </Grid>
  );
};

export default KotUser;
