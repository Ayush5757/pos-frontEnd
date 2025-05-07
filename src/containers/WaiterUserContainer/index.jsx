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

import { IconTrash } from "@tabler/icons-react";
import { Delete_User_Waiter_API, getWaiterUser, waiter_User_Create_API } from "../../services/api/waiter";

const WaiterUserContainer = () => {
  const [UserWaiterPopUp, setUserWaiterPopUp] = useState(null);
  const { classes } = useStyles();

  const { data, refetch } = useQuery({
    queryKey: ["getWaiterUser", localStorage.getItem("shop_user_id")],
    queryFn: () => getWaiterUser(),
  });

  const saveWaiterCreateUser = useMutation({
    mutationFn: (newVal) => waiter_User_Create_API(newVal),
  });
  const deleteWaiterUser = useMutation({
    mutationFn: (newVal) => Delete_User_Waiter_API(newVal),
  });

  return (
    <Grid gutter={10} style={{ padding: "5px" }}>
      <Grid.Col span={12} className={classes.userNameGrid}>
        <Box className={classes.userBox}>
          <TextN1 className={classes.userName}>Waiter User</TextN1>
        </Box>
      </Grid.Col>

      <Grid.Col span={12} xs={4} md={2} mt={15}>
        {data?.data?.target?.map((val) => {
          return (
            <Paper shadow="xl">
              <Grid
                span={12}
                gutter={0}
                className={classes.paper}
                onClick={() => {
                  setUserWaiterPopUp(val);
                }}
              >
                <Grid.Col span={10}>
                  <TextN1 style={{ width: "100%" }}> {val?.user_name} </TextN1>
                </Grid.Col>
                <Grid.Col span={2}>
                  <ActionIcon
                    variant="transparent"
                    size="1.8rem"
                    className={classes.delete}
                    onClick={async () => {
                      try {
                        await deleteWaiterUser.mutateAsync(
                          {
                            user_id: val?._id,
                          },
                          {
                            onSuccess: () => {
                              shoeNotification("success", "User Deleted");
                              setUserWaiterPopUp(null);
                              refetch();
                            },
                          }
                        );
                      } catch (error) {
                        shoeNotification("error", 'Can Not Delete This Data Due to Server Problem');
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
              setUserWaiterPopUp(true);
            }}
          >
            Add Kot User
          </PrimaryButton>
        </Grid.Col>
      )}

      <Modal
        opened={UserWaiterPopUp}
        onClose={() => {
          setUserWaiterPopUp(null);
        }}
        title="Waiter User"
        size={"lg"}
        transitionProps={{ transition: "rotate-left", duration: 800 }}
      >
        <Formik
          initialValues={{
            user_name: UserWaiterPopUp ? UserWaiterPopUp?.user_name : "",
            password: UserWaiterPopUp ? UserWaiterPopUp?.password : "",
          }}
          onSubmit={async (values) => {
            let temp = {
              shopID: localStorage.getItem("shop_user_id"),
              ...values,
            };
            try {
              await saveWaiterCreateUser.mutateAsync(temp, {
                onSuccess: () => {
                  shoeNotification("success", "Waiter Created");
                  setUserWaiterPopUp(null);
                  refetch();
                },
              });
            } catch (error) {
              shoeNotification("error", 'Please Enter Correct Information');
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
                    label={"Waiter User Name"}
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
                  <PrimaryButton type="submit"> Save </PrimaryButton>
                </Grid.Col>
              </Grid>
            </Form>
          )}
        </Formik>
      </Modal>
    </Grid>
  );
};

export default WaiterUserContainer;
