import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  CloseButton,
  Grid,
  Image,
  LoadingOverlay,
  Modal,
  NumberInput,
  Pagination,
  SegmentedControl,
  Select,
} from "@mantine/core";
import React, { useEffect, useMemo, useState } from "react";
import { TextInputViewNormal } from "../../../components/Inputs";
import { IconDiscount2, IconSearch } from "@tabler/icons-react";
import { Customecolors } from "../../../theme";
import { useStyles } from "./style";
import { TextN1 } from "../../../components/Text";
import CardMessage from "../../../components/Card/CardMessage";
import { PrimaryButton } from "../../../components/Buttons";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { get_shop_menu_data } from "../../../services/api/menuCard";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AddCustomerOrder } from "../../../redux/slices/CustomerOrder";
import { debounce } from "lodash";
import { AddCustomerOrderRoom } from "../../../redux/slices/CustomerOrderRoom";
import { IconSoup } from "@tabler/icons-react";
import { shoeNotification } from "../../../components/Notify";
import { IconPhoneCall } from "@tabler/icons-react";
import { useMediaQuery } from "react-responsive";
import { LazyLoadImage } from "react-lazy-load-image-component";
import KartLogo from "../../../assets/KartLogo.jpg";

const MenuCard = () => {
  const { shop_id, access, table_id, table_type_id, table_name, order_type } =
    useParams();
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 700px)",
  });
  const [isShopPopup, setIsShopPopup] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategorie, setselectedCategorie] = useState(null);
  const [searchItem, setSearchItem] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showClickedFoodImage, setshowClickedFoodImage] = useState(null);
  const [special_offerClicked, setSpecial_offerClicked] = useState(false);
  const CustomerOrder = useSelector(
    (state) => state?.CustomerOrderReduser?.CustomerOrder
  );
  const CustomerOrderRoom = useSelector(
    (state) => state?.CustomerOrderRoomReduser?.CustomerOrderRoom
  );

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["getMenuCardData", shop_id],
    queryFn: () =>
      get_shop_menu_data({
        shop_id: shop_id,
        select_cat: selectedCategorie,
        search_item: searchItem,
        page: currentPage,
        special_offer: special_offerClicked,
      }),
  });
  console.log("data", data?.data);
  useEffect(() => {
    refetch();
  }, [selectedCategorie]);

  useEffect(() => {
    refetch();
  }, [special_offerClicked]);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  useEffect(() => {
    refetch();
  }, [searchItem]);

  useEffect(() => {
    if (order_type === "table") {
      if (Object.keys(CustomerOrder).length === 0) {
        dispatch(
          AddCustomerOrder({
            shopID: shop_id,
            table: {
              tableID: table_id,
              table_name: table_name,
              table_type_id: table_type_id,
            },
          })
        );
      }
    }
    if (order_type === "room") {
      if (Object.keys(CustomerOrderRoom).length === 0) {
        dispatch(
          AddCustomerOrderRoom({
            shopID: shop_id,
            room: {
              roomID: table_id,
              room_name: table_name,
              room_type_id: table_type_id,
            },
          })
        );
      }
    }
  }, []);

  const debouncedHandler = debounce((value) => {
    setCurrentPage(() => 1);
    setSearchItem(value);
  }, 1000);

  useMemo(() => {
    if (!categories?.length) {
      const categories_data = data?.data?.categories?.categories?.map(
        (category) => ({
          value: category._id,
          label: category.categorie_name,
        })
      );
      setCategories(categories_data);
    }
  }, [data]);
  return (
    <Box className={classes.outer_box}>
      <Box className={classes.tab_panel}>
        <Grid gutter={5} className={classes.search}>
          <Grid.Col span={6}>
            <LazyLoadImage
              src={
                KartLogo
              }
              width={"40px"}
              effect="blur"
              style={{
                objectFit: "cover",
                borderRadius:'100%'
              }}
            />
          </Grid.Col>
          <Grid.Col span={6} className={classes.notifyTopIcon} mt={8}>
            <ActionIcon
              onClick={() => {
                navigate(`/shop-profile/${shop_id}`);
              }}
              mr={20}
            >
              <Avatar radius={50} alt="Order Icon" color="#3399ff">
                <IconPhoneCall color="#3399ff" />
              </Avatar>
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                if (
                  shop_id &&
                  access &&
                  table_id &&
                  table_type_id &&
                  table_name &&
                  order_type
                ) {
                  if (order_type === "room") {
                    navigate("/customer-room-notification-order-notify");
                  }
                  if (order_type === "table") {
                    navigate("/customer-notification-order-notify");
                  }
                } else {
                  shoeNotification("error", "Please Use Scanner");
                }
              }}
              mr={"5px"}
            >
              <Avatar radius={50} alt="Order Icon" color="red">
                <IconSoup color="red" />
              </Avatar>
            </ActionIcon>
          </Grid.Col>
          <Grid gutter={5} w={"100%"}>
            <Grid.Col span={12} lg={4} mt={10}>
              <TextInputViewNormal
                placeholder={"Search here"}
                icon={
                  <ActionIcon>
                    <IconSearch color={Customecolors.gray} />
                  </ActionIcon>
                }
                onChange={(e) => {
                  debouncedHandler(e?.target?.value);
                }}
              />
            </Grid.Col>
            <Grid.Col span={12} lg={4} mt={4}>
              <Formik
                initialValues={{ categorie_type: "" }}
                onSubmit={(values) => {
                  if (values?.categorie_type) {
                    setCurrentPage(() => 1);
                    setselectedCategorie(values?.categorie_type);
                  } else {
                    setselectedCategorie(null);
                  }
                }}
                enableReinitialize
              >
                {({ values, setFieldValue }) => (
                  <Form>
                    <Grid gutter={10}>
                      <Grid.Col
                        span={9}
                        mt={6}
                        className={classes.gridCategorie}
                      >
                        <Select
                          id={"categorie_type"}
                          name={"categorie_type"}
                          placeholder="Food Categories"
                          clearable
                          onChange={(id) => {
                            setFieldValue("categorie_type", id);
                          }}
                          value={values?.categorie_type}
                          data={categories ?? []}
                        />
                      </Grid.Col>
                      <Grid.Col span={3} mt={5}>
                        <PrimaryButton className={classes.btn} type="submit">
                          Search
                        </PrimaryButton>
                      </Grid.Col>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid.Col>
          </Grid>
        </Grid>
        {!isFetching && (
          <>
            <Grid gutter={5} p={0} mt={5}>
              <Grid.Col
                span={selectedCategorie || special_offerClicked ? 11 : 12}
                className={classes.scrollGrid}
              >
                <Box className={classes.offdiscountBox}>
                  <ActionIcon
                    variant="filled"
                    color="red"
                    radius="xl"
                    onClick={() => {
                      setCurrentPage(() => 1);
                      setselectedCategorie(() => null);
                      setSpecial_offerClicked(true);
                    }}
                  >
                    <IconDiscount2 color="#ffffff" />
                  </ActionIcon>
                  <TextN1 className={classes.offLabel}>OFF</TextN1>
                </Box>
                {categories?.map((val) => (
                  <>
                    <Box className={classes.boxInsidescrollBox}>
                      <PrimaryButton
                        size="sm"
                        radius="md"
                        variant="gradient"
                        gradient={{ from: "blue", to: "blue", deg: 90 }}
                        ml={5}
                        onClick={() => {
                          setCurrentPage(() => 1);
                          setselectedCategorie(val?.value);
                        }}
                      >
                        {val?.label}
                      </PrimaryButton>
                    </Box>
                  </>
                ))}
              </Grid.Col>
              {(selectedCategorie || special_offerClicked) && (
                <Grid.Col span={1} className={classes.closeBtnGrid}>
                  <CloseButton
                    size="sm"
                    color="red"
                    onClick={() => {
                      if (special_offerClicked) {
                        setSpecial_offerClicked(false);
                      }
                      setCurrentPage(() => 1);
                      if (selectedCategorie) {
                        setselectedCategorie(null);
                      }
                    }}
                  />
                </Grid.Col>
              )}
              {data?.data?.foodData?.length > 0 && data?.data?.foodData ? (
                <>
                  <Grid.Col span={12} mt={2}>
                    <TextN1 className={classes.foodMenuTitle}>
                      {" "}
                      Food Menu Ready to Eat Delicious Food 😋
                    </TextN1>
                  </Grid.Col>
                  {data?.data?.foodData?.map((items) => (
                    <Grid.Col span={6} lg={3} mt={3}>
                      <CardMessage
                        shadow={"xl"}
                        padding="0"
                        imgH={isDesktopOrLaptop ? "30vh" : "20vh"}
                        onClick={() => {
                          setshowClickedFoodImage(items);
                        }}
                        className={classes.card}
                        customeLowerBox={
                          <Grid
                            gutter={0}
                            pb={10}
                            pl={5}
                            pr={5}
                            className={classes.infoGrid}
                          >
                            <Grid.Col span={12} mt={5} pl={3}>
                              <TextN1 className={classes.pName2}>
                                {items?.item_name}
                              </TextN1>
                            </Grid.Col>
                            {(items?.offer_half_price > 0 ||
                              items?.offer_price > 0) && (
                              <ActionIcon
                                variant="filled"
                                color="red"
                                radius="xl"
                                className={classes.infoOffer}
                              >
                                <IconDiscount2 color="#ffffff" />
                              </ActionIcon>
                            )}

                            {items?.half_price && (
                              <Grid.Col
                                span={12}
                                mt={5}
                                className={classes.prisingGrid}
                              >
                                <TextN1
                                  className={`${classes.pPrice2} ${classes.prisingGrid}`}
                                >
                                  {items?.offer_half_price > 0 && (
                                    <TextN1 pr={5} className={classes.cutText}>
                                      {items?.offer_half_price} ₹
                                    </TextN1>
                                  )}
                                  {`${items?.half_price}`} ₹ Half
                                </TextN1>
                              </Grid.Col>
                            )}

                            <Grid.Col
                              span={12}
                              mt={5}
                              className={classes.prisingGrid}
                            >
                              <TextN1
                                className={`${classes.pPrice} ${classes.prisingGrid}`}
                              >
                                {items?.offer_price > 0 && (
                                  <TextN1 pr={5} className={classes.cutText}>
                                    {items?.offer_price} ₹
                                  </TextN1>
                                )}
                                {items?.price} ₹ {items?.half_price && " Full"}
                              </TextN1>
                            </Grid.Col>

                            <Grid.Col span={12} mt={5}>
                              <PrimaryButton
                                className={classes.btn}
                                onClick={() => {
                                  setSelectedProduct(items);
                                  setIsShopPopup(!isShopPopup);
                                }}
                                disabled={
                                  parseInt(access) === 22 && table_id
                                    ? false
                                    : true
                                }
                              >
                                On Bucket
                              </PrimaryButton>
                            </Grid.Col>
                          </Grid>
                        }
                        imageUrl={items?.photoURL}
                      />
                    </Grid.Col>
                  ))}
                </>
              ) : (
                <Box className={classes.NoDataBox}>
                  <TextN1 className={classes.Nodatamsg}>No Data Found</TextN1>
                </Box>
              )}
            </Grid>
            {data && (
              <Grid
                gutter={12}
                mt={40}
                mb={
                  CustomerOrder?.inventories?.length > 0 ||
                  CustomerOrderRoom?.inventories?.length > 0
                    ? 40
                    : 0
                }
              >
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
                            setCurrentPage(
                              parseInt(data?.data?.currentPage) - 1
                            );
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
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setCurrentPage(val);
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
                        window.scrollTo({ top: 0, behavior: "smooth" });
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
          </>
        )}
        {(CustomerOrder?.inventories?.length > 0 ||
          CustomerOrderRoom?.inventories?.length > 0) && (
          <Box className={classes.stickyButtonContainer}>
            <PrimaryButton
              className={classes.stickyButton}
              onClick={() => {
                if (order_type === "table") {
                  navigate("/customer-notification-order-notify");
                }
                if (order_type === "room") {
                  navigate("/customer-room-notification-order-notify");
                }
              }}
            >
              Your Order
            </PrimaryButton>
          </Box>
        )}
        <Modal
          opened={isShopPopup}
          onClose={() => {
            setSelectedProduct(null);
            setIsShopPopup(!isShopPopup);
          }}
          title="Your Bucket"
          size="md"
          centered
        >
          <Grid gutter={0}>
            <Grid.Col span={12} mb={10}>
              <TextN1 className={classes.headingPopup}>Name</TextN1>
              <TextN1 style={{ lineHeight: "16px", paddingLeft: "4px" }}>
                {selectedProduct?.item_name}
              </TextN1>
            </Grid.Col>
            <Grid.Col span={12} mb={10}>
              <TextN1 className={classes.headingPopup}>Description</TextN1>
              {selectedProduct?.desc !== "" && (
                <TextN1 style={{ lineHeight: "16px", paddingLeft: "4px" }}>
                  {selectedProduct?.desc}
                </TextN1>
              )}
            </Grid.Col>
            <Grid gutter={0}>
              <Grid.Col span={12}>
                <Formik
                  initialValues={{ qty: 1, plate_type: "1" }}
                  onSubmit={async (values) => {
                    let temp = {};
                    if (order_type === "table") {
                      temp = {
                        shopID: shop_id,
                        table: {
                          tableID: table_id,
                          table_name: table_name,
                          table_type_id: table_type_id,
                        },
                        inventories: [
                          {
                            item_name: selectedProduct?.item_name,
                            item_id: selectedProduct?._id,
                            qty: values?.qty,
                            price: selectedProduct?.price,
                            half_price: selectedProduct?.half_price,
                            plate_type: values?.plate_type,
                          },
                        ],
                        order_status: 3,
                      };
                    }
                    if (order_type === "room") {
                      temp = {
                        shopID: shop_id,
                        room: {
                          roomID: table_id, // these table works as room id its coming from url thats why i will change is im future.
                          room_name: table_name,
                          room_type_id: table_type_id,
                        },
                        inventories: [
                          {
                            item_name: selectedProduct?.item_name,
                            item_id: selectedProduct?._id,
                            qty: values?.qty,
                            price: selectedProduct?.price,
                            half_price: selectedProduct?.half_price,
                            plate_type: values?.plate_type,
                          },
                        ],
                        order_status: 3,
                      };
                    }
                    setIsShopPopup(!isShopPopup);
                    if (order_type === "table") {
                      dispatch(AddCustomerOrder(temp));
                    }
                    if (order_type === "room") {
                      dispatch(AddCustomerOrderRoom(temp));
                    }
                  }}
                  enableReinitialize
                >
                  {({ handleChange, values, setFieldValue }) => (
                    <Form>
                      <Grid gutter={0}>
                        <Grid.Col span={12} mb={10}>
                          <NumberInput
                            id="qty"
                            name="qty"
                            placeholder="Dish Qty"
                            label="Qty"
                            size="md"
                            onChange={(val) => {
                              setFieldValue("qty", val);
                            }}
                            value={values?.qty}
                          />
                        </Grid.Col>
                        {selectedProduct?.half_price && (
                          <Grid.Col span={12} mb={10}>
                            <SegmentedControl
                              id="plate_type"
                              name="plate_type"
                              color="blue"
                              onChange={(val) => {
                                setFieldValue("plate_type", val);
                              }}
                              data={[
                                { label: "Full Plate", value: "1" },
                                { label: "Half Plate", value: "2" },
                              ]}
                              value={values?.plate_type}
                            />
                          </Grid.Col>
                        )}
                        <Grid.Col span={12} mb={10} pl={2}>
                          <span className={classes.total_label}>
                            Item Total -
                          </span>
                          <span className={classes.total}>
                            {" "}
                            {values?.plate_type === "1"
                              ? values?.qty * selectedProduct?.price
                              : values?.qty * selectedProduct?.half_price}{" "}
                            ₹
                          </span>
                        </Grid.Col>
                        <Grid.Col span={12} mb={10}>
                          <PrimaryButton className={classes.btn} type="submit">
                            On Bucket
                          </PrimaryButton>
                        </Grid.Col>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid.Col>
            </Grid>
          </Grid>
        </Modal>

        <Modal
          opened={showClickedFoodImage}
          onClose={() => {
            setshowClickedFoodImage(!showClickedFoodImage);
          }}
          title={`${showClickedFoodImage?.item_name}`}
          size="md"
          centered
        >
          <Image
            className={classes.popupImage}
            src={showClickedFoodImage?.photoURL}
          />
          <TextN1 mt={10} className={classes.desc}>
            {showClickedFoodImage?.desc}
          </TextN1>
          <Box className={classes.boxPrising}>
            {showClickedFoodImage?.price && (
              <TextN1
                mt={10}
                p={5}
                pl={7}
                pr={7}
                c={"#ffffff"}
                className={classes.showClickedFoodImageprice}
              >
                {showClickedFoodImage?.price} ₹{" "}
                {showClickedFoodImage?.half_price && "Full"}
              </TextN1>
            )}
            {showClickedFoodImage?.half_price && (
              <TextN1
                mt={10}
                ml={10}
                p={5}
                pl={7}
                pr={7}
                c={"#ffffff"}
                className={classes.showClickedFoodImagehalfprice}
              >
                {showClickedFoodImage?.half_price} ₹ Half
              </TextN1>
            )}
          </Box>
        </Modal>
        <LoadingOverlay visible={isFetching} />
      </Box>
    </Box>
  );
};

export default MenuCard;
