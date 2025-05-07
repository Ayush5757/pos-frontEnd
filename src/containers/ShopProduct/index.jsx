import {
  ActionIcon,
  Box,
  Grid,
  LoadingOverlay,
  Modal,
  ThemeIcon,
} from "@mantine/core";
import React, { useEffect, useState } from "react";

import { AddPlusButton, PrimaryButton } from "../../components/Buttons";
import { useStyles } from "./style";
import { TextN1 } from "../../components/Text";
import AddProduct from "./AddProduct";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  delete_product,
  getPaginatedCategories,
  getPaginatedFoodData,
} from "../../services/api/shopProductEdit";
import CardMessage from "../../components/Card/CardMessage";
import {
  IconDiscount2,
  IconToolsKitchen2,
} from "@tabler/icons-react";
import { IconTrashX } from "@tabler/icons-react";
import { shoeNotification } from "../../components/Notify";
import { IconCircleChevronDown } from "@tabler/icons-react";

const ShopProduct = () => {
  const { classes } = useStyles();
  const [addBtn, setAddBtn] = useState(false);
  const [selectedItemDelete, setselectedItemDelete] = useState(null);
  const [selectedItem, setselectedItem] = useState("");
  const [opened, setOpened] = useState();
  const [cat_clicked, setcat_clicked] = useState(null);
  const {
    data,
    isLoading,
    refetch: refetchItems,
  } = useQuery({
    queryKey: ["getProducts"],
    queryFn: () => getPaginatedCategories(localStorage.getItem("shop_user_id")),
    enabled: false,
  });

  const {
    data: data2,
    isLoading: isLoading2,
    refetch: refetchItems2,
  } = useQuery({
    queryKey: ["getProductsItems", cat_clicked],
    queryFn: () =>
      getPaginatedFoodData(localStorage.getItem("shop_user_id"), cat_clicked),
    enabled: false,
  });

  useEffect(() => {
    if (cat_clicked) {
      refetchItems2();
    }
  }, [cat_clicked]);

  useEffect(() => {
    if (data) {
      if (data?.data?.target) {
        setOpened([...data?.data?.target]);
        setcat_clicked(null);
      }
    }
  }, [data]);

  useEffect(() => {
    refetchItems();
  }, []);

  const deleteProduct = useMutation({
    mutationFn: (newVal) => delete_product(newVal),
  });

  const handeldelete = async (data) => {
    if (data) {
      try {
        await deleteProduct.mutateAsync(
          {
            item_id: data?._id,
            categorie_id: data?.categorie_id,
            image: data?.photo,
          },
          {
            onSuccess: (res) => {
              shoeNotification("success", res?.data?.msg);
              setcat_clicked(null);
              refetchItems();
            },
          }
        );
      } catch (error) {
        shoeNotification("error", error?.message);
      }
    }
    setselectedItemDelete(null);
  };

  return (
    <Box>
      <Grid>
        <Grid.Col span={6} mt={10} className={classes.headingGrid}>
          <TextN1 className={classes.heading}>Products</TextN1>
        </Grid.Col>
        <Grid.Col span={6} mt={10} className={classes.AddBtnGrid}>
          <AddPlusButton
            onClick={() => {
              setAddBtn(true);
            }}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          {isLoading ? (
            <LoadingOverlay visible={true} overlayBlur={2} />
          ) : (
            <>
              {data?.data?.target && (
                <Grid gutter={0}>
                  {opened?.map((product) => (
                    <>
                      <Grid.Col
                        span={12}
                        mt={10}
                        mb={10}
                        className={classes.categorieHeading}
                        onClick={() => {
                          setcat_clicked(product?._id);
                        }}
                      >
                        <Box className={classes.headingBox}>
                          <Box className={classes.headingBoxInside}>
                            <ThemeIcon size={"md"} color="red" radius={"lg"}>
                              <IconToolsKitchen2 size={"1.1rem"} />
                            </ThemeIcon>
                            <TextN1 className={classes.pName} ml={10}>
                              <span style={{ color: "orange" }}>
                                {" "}
                                Categorie -{" "}
                              </span>{" "}
                              {product?.categorie_name}
                            </TextN1>
                          </Box>
                          <ActionIcon c={"white"} bg={"red"} radius={10}>
                            <IconCircleChevronDown />
                          </ActionIcon>
                        </Box>
                      </Grid.Col>
                      <>
                        {product?._id === data2?.data?.categorie_id && (
                          <>
                            {data2?.data?.target?.map((food) => (
                              <Grid.Col
                                span={6}
                                xs={6}
                                sm={4}
                                md={4}
                                lg={2}
                                xl={2}
                                className={classes.food_card}
                              >
                                <CardMessage
                                  shadow={"xl"}
                                  imgH="25vh"
                                  onClick={() => {
                                    setAddBtn(true);
                                    setselectedItem({
                                      ...food,
                                      categorie_id: product?._id,
                                    });
                                  }}
                                  customeLowerBox={
                                    <Grid
                                      gutter={0}
                                      p={5}
                                      className={classes.info_Grid}
                                    >
                                      <Grid.Col span={10} pl={5} pr={5}>
                                        <span className={classes.pName2}>
                                          {food?.item_name}
                                        </span>
                                      </Grid.Col>

                                      <Grid.Col
                                        span={12}
                                        pl={5}
                                        mt={2}
                                        className={classes.inline_grid}
                                      >
                                        <Box>
                                          <span className={classes.pPrice}>
                                            {food?.price} ₹ F
                                          </span>
                                          {food?.half_price && (
                                            <span
                                              className={classes.pPrice2}
                                              style={{ marginLeft: "5px" }}
                                            >
                                              {food?.half_price} ₹ H
                                            </span>
                                          )}
                                          {console.log("food", food)}
                                        </Box>
                                      </Grid.Col>
                                      <Grid.Col span={12} mt={3} ml={5}>
                                      {(food?.offer_half_price > 0 ||
                                    food?.offer_price > 0) && (
                                    <ActionIcon
                                      variant="filled"
                                      color="red"
                                      radius="xl"
                                      className={classes.infoOffer}
                                      mr={10}
                                    >
                                      <IconDiscount2 color="#ffffff" />
                                    </ActionIcon>
                                  )}
                                      </Grid.Col>
                                    </Grid>
                                  }
                                  imageUrl={food?.photoURL}
                                />
                                <Box
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  {(food?.offer_half_price > 0 ||
                                    food?.offer_price > 0) && (
                                    <ActionIcon
                                      variant="filled"
                                      color="red"
                                      radius="xl"
                                      className={classes.infoOffer}
                                      mr={10}
                                    >
                                      <IconDiscount2 color="#ffffff" />
                                    </ActionIcon>
                                  )}
                                  <ActionIcon
                                    variant="filled"
                                    color="red"
                                    aria-label="Settings"
                                    radius="xl"
                                    onClick={() => {
                                      setselectedItemDelete({
                                        ...food,
                                        categorie_id: product?._id,
                                      });
                                    }}
                                  >
                                    <IconTrashX stroke={1.5} />
                                  </ActionIcon>
                                </Box>
                              </Grid.Col>
                            ))}
                          </>
                        )}
                      </>
                    </>
                  ))}
                </Grid>
              )}
            </>
          )}
        </Grid.Col>
      </Grid>
      <Modal
        opened={addBtn}
        onClose={() => {
          setAddBtn(() => false);
          setselectedItem(null);
        }}
        className={classes.ModelTop}
        title="Add Product"
        transitionProps={{ transition: "rotate-left", duration: 0 }}
      >
        <AddProduct
          selectedItem={selectedItem}
          refetchItems={refetchItems}
          setAddBtn={setAddBtn}
        />
      </Modal>

      <Modal
        opened={selectedItemDelete}
        onClose={() => {
          setselectedItemDelete(null);
        }}
        className={classes.ModelTop}
        title="Delete Confirmation"
        transitionProps={{ transition: "rotate-left", duration: 400 }}
        centered
      >
        <TextN1 color={"red"}>
          {" "}
          Are You Sure You Want to Delete This Item
        </TextN1>
        <Box className={classes.btn_Box} mt={10}>
          <PrimaryButton
            onClick={() => {
              setselectedItemDelete(null);
            }}
          >
            Cancel
          </PrimaryButton>
          <PrimaryButton
            onClick={() => {
              handeldelete(selectedItemDelete);
            }}
          >
            Confirm
          </PrimaryButton>
        </Box>
      </Modal>
      <LoadingOverlay visible={isLoading2 && cat_clicked} />
    </Box>
  );
};

export default ShopProduct;
