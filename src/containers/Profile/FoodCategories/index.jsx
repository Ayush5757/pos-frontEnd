import {
  ActionIcon,
  Box,
  Button,
  Grid,
  LoadingOverlay,
  Modal,
  Paper,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import { TextN1 } from "../../../components/Text";
import { Form, Formik } from "formik";
import { TextInputView } from "../../../components/Inputs";
import { PrimaryButton } from "../../../components/Buttons";
import { setCategories, getCategories,deleteCategories, updateCategories } from "../../../services/api/categories";
import { useMutation, useQuery } from "@tanstack/react-query";
import { shoeNotification } from "../../../components/Notify";
import { IconLayoutSidebarLeftExpand } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";

const FoodCategories = () => {
  const { classes } = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteCategorieID, setDeleteCategorieID] = useState();
  const [deleteConfirmationPopUp, setDeleteConfirmationPopUp] = useState(false);
  const [selectUpdateCategorie, setselectUpdateCategorie] = useState(null);

  const { error, data, refetch,isFetching } = useQuery({
    queryKey: ["getCategories", localStorage.getItem("shop_user_id")],
    queryFn: () =>
      getCategories({ shopID: localStorage.getItem("shop_user_id")}),
  });
  useEffect(()=>{
    setIsLoading(false)
  },[data])
  const createCategories = useMutation({
    mutationFn: (newVal) => setCategories(newVal),
  });
  const deleteCategoriesCall = useMutation({
    mutationFn: (newVal) => deleteCategories(newVal),
  });
  const updateCategoriesCall = useMutation({
    mutationFn: (newVal) => updateCategories(newVal),
  });
  return (
    <>
      {!isFetching && (
        <Grid className={classes.Wrap}>
          <Grid.Col span={12} className={classes.create}>
            <Formik
              initialValues={{
                categorie_name: "",
              }}
              onSubmit={async (values) => {
                try {
                  console.log("values", values);
                  setIsLoading(true);
                  await createCategories.mutateAsync(
                    {
                      shopID: localStorage.getItem("shop_user_id"),
                      categorie_name: values.categorie_name,
                    },
                    {
                      onSuccess: (res) => {
                        refetch();
                        shoeNotification("success", "Categorie Created");
                      },
                      onError: () => {
                        setIsLoading(false);
                        shoeNotification("error", "Failed to Create Categorie");
                      },
                    }
                  );
                } catch (error) {
                  shoeNotification("error", "Please Refresh Internet Problem");
                }
              }}
              enableReinitialize
            >
              {({ values, handleChange }) => (
                <Form>
                  <Grid>
                    <Grid.Col xs={12} sm={12} md={6} lg={2}>
                      <TextInputView
                        id={"categorie_name"}
                        name={"categorie_name"}
                        label={"Categorie Name"}
                        onChange={handleChange}
                        placeholder={"Enter Categorie"}
                        value={values.categorie_name}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <PrimaryButton type="submit" className={classes.btn}>
                        Create
                      </PrimaryButton>
                    </Grid.Col>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid.Col>
          {data?.data?.target?.map((res) => (
            <Grid.Col xs={12} sm={6} md={6} lg={2} >
              <Paper shadow="xl">
                <Grid span={12} gutter={0} className={classes.paper}>
                  <Grid.Col span={10} onClick={()=>setselectUpdateCategorie({cat_id:res?._id,cat_name:res?.categorie_name})}>
                    <TextN1 style={{ width: "100%" }}> {res?.categorie_name} </TextN1>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <ActionIcon
                      variant="transparent"
                      size="1.8rem"
                      className={classes.delete}
                      onClick={() => {
                        setDeleteCategorieID(res?._id)
                        setDeleteConfirmationPopUp(true)
                      }}
                    >
                      <IconTrash size="2.2rem" />
                    </ActionIcon>
                  </Grid.Col>
                </Grid>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>
      )}
      <Modal
        opened={deleteConfirmationPopUp}
        onClose={() => setDeleteConfirmationPopUp(false)}
        title="Delete Categorie"
        centered
      >
        <Grid gutter={10}>
          <Grid.Col span={12} mb={'20px'}>
            <TextN1>Are Your Sure You Want to Delete This Categorie</TextN1>
          </Grid.Col>
          <Grid.Col span={6}>
            <PrimaryButton onClick={()=>setDeleteConfirmationPopUp(false)}>
              Cancel
            </PrimaryButton>
          </Grid.Col>
          <Grid.Col span={6} className={classes.cancel}>
            <PrimaryButton onClick={async()=>{
              try {
                setDeleteConfirmationPopUp(false);
                setIsLoading(true);
                await deleteCategoriesCall.mutateAsync(
                  {
                    shopID: localStorage.getItem("shop_user_id"),
                    cat_ID: deleteCategorieID
                  },
                  {
                    onSuccess: (res) => {
                      refetch();
                      setDeleteConfirmationPopUp(false);
                      shoeNotification("success", "Categorie Deleted Successfull");
                    },
                  }
                );
              } catch (error) {
                setDeleteConfirmationPopUp(false);
                shoeNotification("error", 'Please Empty Your Categorie Items Before Deleting Categorie');
                refetch();
              }
            }}>
              Confirm
            </PrimaryButton>
          </Grid.Col>
        </Grid>
      </Modal>

      <Modal
        opened={selectUpdateCategorie}
        onClose={() => setselectUpdateCategorie(null)}
        title="Update Categorie"
        centered
      >
        <Grid gutter={10}>
          <Grid.Col span={12} mb={'20px'}>
          <Formik
              initialValues={{
                categorie_name: selectUpdateCategorie?.cat_name??"",
              }}
              onSubmit={async (values) => {
                try {
                  if(selectUpdateCategorie){
                  setIsLoading(true);
                  await updateCategoriesCall.mutateAsync(
                    {
                      shopID: localStorage.getItem("shop_user_id"),
                      cat_ID: selectUpdateCategorie?.cat_id,
                      categorie_name: values?.categorie_name
                    },
                    {
                      onSuccess: (res) => {
                        refetch();
                        setselectUpdateCategorie(null);
                        shoeNotification("success", "Categorie Updated Successfull");
                      },
                    }
                  );
                  }
                } catch (error) {
                  setselectUpdateCategorie(null);
                  shoeNotification("error", 'There is a Problem With Updating');
                  refetch();
                }
              }}
              enableReinitialize
            >
              {({ values, handleChange }) => (
                <Form>
                  <Grid>
                    <Grid.Col span={12}>
                      <TextInputView
                        id={"categorie_name"}
                        name={"categorie_name"}
                        label={"Categorie Name"}
                        onChange={handleChange}
                        placeholder={"Enter Categorie"}
                        value={values.categorie_name}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <PrimaryButton type="submit" className={classes.btn}>
                        Update
                      </PrimaryButton>
                    </Grid.Col>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid.Col>
          
         
        </Grid>
      </Modal>
      <LoadingOverlay visible={isLoading || isFetching} overlayBlur={2} />
    </>
  );
};

export default FoodCategories;
