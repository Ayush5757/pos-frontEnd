import {
  ActionIcon,
  Box,
  Button,
  Grid,
  LoadingOverlay,
  Modal,
  Pagination,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { AddPlusButton, PrimaryButton } from "../../components/Buttons";
import { useStyles } from "./style";
import { TextN1 } from "../../components/Text";
import AddProduct from "./AddProduct.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { delete_room, getShopRooms, save_title } from "../../services/api/shopProductEdit";
import CardMessage from "../../components/Card/CardMessage";
import { IconTrashX } from "@tabler/icons-react";
import { shoeNotification } from "../../components/Notify";
import { debounce } from "lodash";
import { TextInputViewNormal } from "../../components/Inputs/index.jsx";
import { IconSearch } from "@tabler/icons-react";
import { Customecolors } from "../../theme.js";
import { Form, Formik } from "formik";
const UserRoomSetting = () => {
  const [addBtn, setAddBtn] = useState(false);
  const [selectedItem, setselectedItem] = useState(null);
  const [selectedItemToUpdate, setselectedItemToUpdate] = useState(null);
  const { classes } = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState(null);
  const [isUploadLoading, setisUploadLoading] = useState(false);
  const {
    data,
    isFetching,
    refetch: refetchItems,
  } = useQuery({
    queryKey: [
      "getShopRooms",
      localStorage.getItem("shop_user_id"),
      currentPage,
      searchItem,
    ],
    queryFn: () =>
      getShopRooms(
        localStorage.getItem("shop_user_id"),
        currentPage,
        searchItem
      ),
    enabled: false,
  });
  useEffect(() => {
    refetchItems();
  }, [currentPage, searchItem]);

  const deleteRoom = useMutation({
    mutationFn: (newVal) => delete_room(newVal),
  });

  const saveTitle = useMutation({
    mutationFn: (newVal) => save_title(newVal),
  });

  const debouncedHandler = debounce((value) => {
    setSearchItem(value);
  }, 700);

  const handeldelete = async (data) => {
    if (data) {
      try {
        await deleteRoom.mutateAsync(
          {
            selectedItem,
          },
          {
            onSuccess: (res) => {
              shoeNotification("success", res?.data?.msg);
              refetchItems();
            },
          }
        );
      } catch (error) {
        shoeNotification("error", error?.message);
      }
    }
    setselectedItem(null);
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
        <Grid.Col span={12} xs={10} sm={6} md={3}>
          <TextInputViewNormal
            placeholder={"Search here"}
            icon={
              <ActionIcon>
                <IconSearch color={Customecolors.gray} />
              </ActionIcon>
            }
            onChange={(e) => {
              setCurrentPage(()=>parseInt(1));
              debouncedHandler(e?.target?.value);
            }}
          />
        </Grid.Col>
        <Grid.Col span={12} xs={10} sm={6} md={3}>
        <Formik
            initialValues={{heading:data?.data?.title??''}}
            onSubmit={async (values) => {
              try {
                await saveTitle.mutateAsync(values, {
                  onSuccess: (res) => {
                    shoeNotification("success", "Heading Saved");
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
                <Grid w={"100%"}>
                  <Grid.Col span={12}>
                    <Box className={classes.headingBox}>
                      <TextInputViewNormal
                        w="80%"
                        id='heading'
                        name='heading'
                        placeholder={"Enter Heading"}
                        onChange = {handleChange}
                        value={values?.heading}
                      />
                      <PrimaryButton type='submit'>Save</PrimaryButton>
                    </Box>
                  </Grid.Col>
                </Grid>
              </Form>
            )}
          </Formik>
         
        </Grid.Col>
        <Grid.Col span={12}>
          {isFetching ? (
            <LoadingOverlay visible={isFetching} overlayBlur={2} />
          ) : (
            <>
              {data?.data?.target && (
                <Grid gutter={0}>
                  {data?.data?.target?.map((product) => (
                    <Grid.Col span={6} lg={3} xl={2}>
                      <CardMessage
                        shadow={"xl"}
                        imgH="20vh"
                        onClick={() => setselectedItemToUpdate(product)}
                        customeLowerBox={
                          <Grid gutter={0} p={5} className={classes.info_Grid}>
                            <Grid.Col span={10} pl={5} pr={5}>
                              <span className={classes.pName2}>
                                {product?.roomName}
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
                                  {product?.roomPrice} ₹
                                </span>
                              </Box>
                            </Grid.Col>
                          </Grid>
                        }
                        imageUrl={product?.imageUrl}
                      />
                      <Grid gutter={0}>
                        <Grid.Col span={10}>
                          <TextN1 p={"0 10px"} className={classes.about}>
                            {product?.about}
                          </TextN1>
                        </Grid.Col>
                        <Grid.Col span={2}>
                          <ActionIcon
                            variant="filled"
                            color="red"
                            aria-label="Settings"
                            radius="xl"
                            onClick={() => {
                              setselectedItem(product);
                            }}
                          >
                            <IconTrashX stroke={1.5} />
                          </ActionIcon>
                        </Grid.Col>
                      </Grid>
                    </Grid.Col>
                  ))}
                </Grid>
              )}
            </>
          )}
        </Grid.Col>
        <Grid.Col span={12}>
          {data && (
            <Grid gutter={12} mt={10}>
              <Grid.Col
                span={2}
                style={{ display: "flex", justifyContent: "flex-start" }}
              >
                {data?.data?.currentPage > 1 &&
                  data?.data?.currentPage <= data?.data?.totalPages && (
                    <Button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        if (data?.data?.currentPage) {
                          setCurrentPage(parseInt(data?.data?.currentPage) - 1);
                        }
                      }}
                    >
                      Prev
                    </Button>
                  )}
              </Grid.Col>

              <Grid.Col span={8} className={classes.paginationGrid}>
                <Pagination
                  onChange={(val) => {
                    window.scrollTo({ bottom: 0, behavior: "smooth" });
                    setCurrentPage(()=>parseInt(val));
                  }}
                  value={data?.data?.currentPage}
                  total={data?.data?.totalPages}
                  size="sm"
                  radius="md"
                  withControls={false}
                />
              </Grid.Col>

              <Grid.Col
                span={2}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                {data?.data?.currentPage < data?.data?.totalPages && (
                  <Button
                    onClick={() => {
                      window.scrollTo({ top: 0 });
                      if (data?.data?.currentPage) {
                        setCurrentPage(parseInt(data?.data?.currentPage) + 1);
                      }
                    }}
                  >
                    Next
                  </Button>
                )}
              </Grid.Col>
            </Grid>
          )}
        </Grid.Col>
      </Grid>
      <Modal
        opened={addBtn || selectedItemToUpdate}
        onClose={() => {
          setAddBtn(false);
          setselectedItemToUpdate(null);
        }}
        className={classes.ModelTop}
        title="Add Product"
        transitionProps={{ transition: "rotate-left", duration: 10 }}
      >
        <AddProduct
          setselectedItemToUpdate={setselectedItemToUpdate}
          selectedItemToUpdate={selectedItemToUpdate}
          refetchItems={refetchItems}
          setAddBtn={setAddBtn}
          setisUploadLoading={setisUploadLoading}
        />
      </Modal>

      <Modal
        opened={selectedItem}
        onClose={() => {
          setselectedItem(null);
        }}
        className={classes.ModelTop}
        title="Delete Confirmation"
        transitionProps={{ transition: "rotate-left", duration: 100 }}
        centered
      >
        <TextN1 color={"red"}>
          {" "}
          Are You Sure You Want to Delete This Item
        </TextN1>
        <Box className={classes.btn_Box} mt={10}>
          <PrimaryButton
            onClick={() => {
              setselectedItem(null);
            }}
          >
            Cancel
          </PrimaryButton>
          <PrimaryButton
            onClick={() => {
              handeldelete(selectedItem);
            }}
          >
            Confirm
          </PrimaryButton>
        </Box>
      </Modal>
      <LoadingOverlay h={'100vh'} visible={deleteRoom?.isFetching || isUploadLoading}/>
    </Box>
  );
};

export default UserRoomSetting;
