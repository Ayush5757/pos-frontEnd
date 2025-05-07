import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Grid,
  Image,
  Loader,
  LoadingOverlay,
  Modal,
  Paper,
  Rating,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import CardCarousel from "../../components/Card/CardCarousel";
import { Carousel } from "@mantine/carousel";
import { CardCustome } from "../../components/Card";
import { TextN1 } from "../../components/Text";
import { useStyles } from "./style";
import {
  IconBrandWhatsapp,
  IconClipboardHeart,
  IconMapPinPin,
  IconPhoneCall,
} from "@tabler/icons-react";
import { PrimaryButton } from "../../components/Buttons";
import { IconMap2 } from "@tabler/icons-react";
import { IconClockHour4 } from "@tabler/icons-react";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import CommentSection from "./CommentSection";
import { TextInputView } from "../../components/Inputs";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  add_comment,
  get_comment,
  get_food_data,
  get_shop_list_main,
} from "../../services/api/shopListing";
import { IconBuildingStore } from "@tabler/icons-react";
import { IconMapPinHeart } from "@tabler/icons-react";
import { IconDoor } from "@tabler/icons-react";
import { IconPhoneCalling } from "@tabler/icons-react";
import moment from "moment";
import { Form, Formik } from "formik";
import { shoeNotification } from "../../components/Notify";
import Cookies from "js-cookie";
import { getShopRoomsLimited } from "../../services/api/shopProductEdit";
import { IconToolsKitchen2 } from "@tabler/icons-react";
import { useMediaQuery } from "react-responsive";
import { TypeAnimation } from "react-type-animation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import KartLogo from "../../assets/KartLogo.jpg";

const ShopMainPage = () => {
  const { classes } = useStyles();
  const { shop_id } = useParams();
  const navigate = useNavigate();
  const [menuImage, setMenuImage] = useState(null);
  const [commentPage, setcommentPage] = useState(1);
  const isMobile = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  
  const isSuperBigScreen = useMediaQuery({
    query: "(min-width: 1800px)",
  });

  const { data, error, isError, isFetching } = useQuery({
    queryKey: ["getShopListingMain", shop_id],
    queryFn: () => get_shop_list_main({ shop_id: shop_id }),
  });

  const { data: food_data, isFetching: isFetchingfood_data } = useQuery({
    queryKey: ["get_food_data", shop_id],
    queryFn: () => get_food_data({ shop_id: shop_id }),
    enabled: data?.data?.target?.length ? true : false,
  });

  const { data: roomImage, isFetching: isFetchingRoom } = useQuery({
    queryKey: ["getShopRoomsLimited", shop_id],
    queryFn: () => getShopRoomsLimited(shop_id),
    enabled: data?.data?.target?.length ? true : false,
  });

  const {
    data: data_Comment,
    refetch: refetchComment,
    isFetching: isFetchingComment,
  } = useQuery({
    queryKey: ["get_comment", shop_id],
    queryFn: () => get_comment({ shop_id: shop_id, page: commentPage }),
    enabled: false,
  });

  useEffect(() => {
    if (food_data?.data?.target) {
      refetchComment();
    }
  }, [food_data?.data?.target, commentPage]);

  const addComment = useMutation({
    mutationFn: (newVal) => add_comment(newVal),
  });

  if (!isFetching) {
    if (!data?.data?.target?.length) {
      return <TextN1> No Data Found </TextN1>;
    }
  }
  console.log("error", error);
  if (error || isError) {
    return <TextN1> No Data Found </TextN1>;
  }
  return (
    <>
      <Box mt={10} className={classes.big_box}>
        <Grid gutter={0} className={classes.big_grid}>
          <Grid.Col span={6}>
            <LazyLoadImage
              src={
                KartLogo
              }
              width={"40px"}
              alt="Logo"
              style={{ objectFit: "cover" ,borderRadius:'100%'}}
              fit="contain"
              effect="blur"
            />
          </Grid.Col>
          <Grid.Col span={6} className={classes.notifyTopIcon}>
            {data?.data?.target[0]?.phone && (
              <ActionIcon
                onClick={() => {
                  if (data?.data?.target[0]?.phone) {
                    window.location.href = `tel:${data?.data?.target[0]?.phone}`;
                  }
                }}
                mr={20}
                mt={8}
              >
                <Avatar radius={50} src={null} alt="Order Icon" color="#3399ff">
                  <IconPhoneCall color="#3399ff" />
                </Avatar>
              </ActionIcon>
            )}

            <ActionIcon
              onClick={() => {
                navigate(`/shop-menu-card/${shop_id}`);
              }}
              mr={5}
              mt={8}
            >
              <Avatar radius={50} src={null} alt="Order Icon" color="green">
                <IconToolsKitchen2 color="green" />
              </Avatar>
            </ActionIcon>
          </Grid.Col>

          <Grid.Col span={12}>
            <Box className={classes.images_banner}>
              <CardCarousel slidSize={"full"}>
                {data?.data?.target[0]?.banner_image?.map((val) => {
                  return (
                    <Carousel.Slide>
                      <Box  style={{ height: isMobile ? "40vh" : "80vh" }}>
                      <LazyLoadImage
                        src={val?.photoURL}
                        shadow={"xl"}
                        radius={0}
                        style={{ objectFit: "cover" }}
                        effect="blur"
                        width={'100%'}
                        height={'100%'}
                      />

                      </Box>
                    </Carousel.Slide>
                  );
                })}
              </CardCarousel>
            </Box>
          </Grid.Col>
          {(!isMobile && data?.data?.target[0]?.shopName) &&
          <Grid.Col span={12} className={classes.typingGrid}>
            <Box className={classes.typingBox}>
            <TypeAnimation
              sequence={[
                `Wellcome To ${data?.data?.target[0]?.shopName} 😍`,
                5000,
                `${data?.data?.target[0]?.shopName} Provides You Best Teast 😋 And Quality Food 😉`,
                5000,
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: "3em", display: "inline-block",color:'white',fontFamily:'museo-sans, sans-serif' }}
              repeat={Infinity}
              />
            </Box>
          </Grid.Col>
            }

          <Grid.Col
            span={12}
            mt={isMobile ? "25vh" : "55vh"}
            className={classes.infoSecondGrid}
          >
            <Grid w={isMobile ? "100%" : "50%"}>
              <Grid.Col span={12} className={classes.info_grid}>
                <Paper
                  shadow="xl"
                  p={20}
                  mt={20}
                  radius={"20px 0 20px 0"}
                  className={classes.info_paper}
                >
                  <Grid gutter={0}>
                    {data?.data?.target[0]?.shopName && (
                      <>
                        <Grid.Col
                          span={1}
                          className={classes.logo_card}
                          mt={3}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <ActionIcon
                            variant="transparent"
                            size="sm"
                            color="yellow"
                            aria-label="Settings"
                          >
                            <IconBuildingStore />
                          </ActionIcon>
                        </Grid.Col>
                        <Grid.Col span={11}>
                          <TextN1 className={classes.ShopName} mt={5}>
                            {data?.data?.target[0]?.shopName}
                          </TextN1>
                        </Grid.Col>
                      </>
                    )}

                    <Grid.Col
                      span={1}
                      className={classes.logo_card_address}
                      mt={6}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <ActionIcon
                        variant="transparent"
                        size="sm"
                        color="yellow"
                      >
                        <IconDoor />
                      </ActionIcon>
                    </Grid.Col>

                    <Grid.Col span={11} mt={7}>
                      <TextN1 truncate className={classes.open_close}>
                        Shop
                        <Badge
                          component="a"
                          href="https://mantine.dev"
                          size="sm"
                          variant="filled"
                          color={
                            data?.data?.target[0]?.status ? "green" : "red"
                          }
                          style={{ margin: "0 5px" }}
                        >
                          {data?.data?.target[0]?.status ? (
                            <span>Open</span>
                          ) : (
                            <span>Close</span>
                          )}
                        </Badge>
                        Right Now
                      </TextN1>
                    </Grid.Col>
                    {data?.data?.target[0]?.address && (
                      <>
                        <Grid.Col
                          span={1}
                          className={classes.logo_card_address}
                          style={{ display: "flex", alignItems: "center" }}
                          mt={5}
                        >
                          <ActionIcon
                            variant="transparent"
                            size="sm"
                            color="yellow"
                          >
                            <IconMapPinHeart />
                          </ActionIcon>
                        </Grid.Col>
                        <Grid.Col span={11} mt={8}>
                          <TextN1 className={classes.address}>
                            {data?.data?.target[0]?.address}
                          </TextN1>
                        </Grid.Col>
                      </>
                    )}
                    {data?.data?.target[0]?.phone && (
                      <>
                        <Grid.Col
                          span={1}
                          className={classes.logo_card_address}
                          mt={12}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <ActionIcon
                            variant="transparent"
                            size="sm"
                            color="yellow"
                          >
                            <IconPhoneCalling />
                          </ActionIcon>
                        </Grid.Col>
                        <Grid.Col span={11} mt={14}>
                          <TextN1 className={classes.phone}>
                            {data?.data?.target[0]?.phone} ,{" "}
                            {data?.data?.target[0]?.alt_phone}
                          </TextN1>
                        </Grid.Col>
                      </>
                    )}

                    {data?.data?.target[0]?.about && (
                      <>
                        <Grid.Col
                          span={1}
                          className={classes.logo_card_address}
                          mt={4}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <ActionIcon
                            variant="transparent"
                            size="sm"
                            color="yellow"
                          >
                            <IconClipboardHeart />
                          </ActionIcon>
                        </Grid.Col>
                        <Grid.Col span={11} mt={7}>
                          <TextN1 className={classes.about}>
                            {data?.data?.target[0]?.about}
                          </TextN1>
                        </Grid.Col>
                      </>
                    )}
                  </Grid>
                </Paper>
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* ------------------------------------------------------------------ */}

          <Grid.Col span={4} lg={4} mt={30} className={classes.Grid_icon_paper}>
            <Paper className={classes.icon_paper} shadow="xl">
              <ActionIcon
                variant="outline"
                size={"2.5rem"}
                color="#1274c0"
                radius={50}
                onClick={() => {
                  if (data?.data?.target[0]?.phone) {
                    window.location.href = `tel:${data?.data?.target[0]?.phone}`;
                  } else {
                    shoeNotification("success", "Number Not Available");
                  }
                }}
              >
                <IconPhoneCall size="1.5rem" />
              </ActionIcon>
              <TextN1 className={classes.LogoName}>Phone</TextN1>
            </Paper>
          </Grid.Col>
          <Grid.Col span={4} lg={4} mt={30} className={classes.Grid_icon_paper}>
            <Paper className={classes.icon_paper} shadow="xl">
              <ActionIcon
                variant="outline"
                size={"2.5rem"}
                color="#1274c0"
                radius={50}
                onClick={() => {
                  if (data?.data?.target[0]?.shop_google_address) {
                    window.location.href =
                      data?.data?.target[0]?.shop_google_address;
                  } else {
                    shoeNotification("success", "Goole Address Not Provided");
                  }
                }}
              >
                <IconMapPinPin size="1.5rem" />
              </ActionIcon>
              <TextN1 className={classes.LogoName}>Map</TextN1>
            </Paper>
          </Grid.Col>
          <Grid.Col span={4} lg={4} mt={30} className={classes.Grid_icon_paper}>
            <Paper className={classes.icon_paper} shadow="xl">
              <ActionIcon
                variant="outline"
                size={"2.5rem"}
                color="green"
                radius={50}
                onClick={() => {
                  window.open(
                    `whatsapp://send?phone=${
                      data?.data?.target[0]?.waths_app_number
                    }&text=${"Hi, 🦋"}`
                  );
                }}
                //   onClick={() => {
                //   window.open(
                //     `https://api.whatsapp.com/send/?phone=${
                //       data?.data?.target[0]?.waths_app_number
                //     }&text=${"Hi, 🦋"}`,
                //     "_blank"
                //   );
                // }}
              >
                <IconBrandWhatsapp size="1.5rem" />
              </ActionIcon>
              <TextN1 className={classes.LogoName} style={{ color: "#33cc00" }}>
                WathsApp
              </TextN1>
            </Paper>
          </Grid.Col>

          <Grid.Col span={12} mt={20}>
            <Grid gutter={5} mb={10}>
              {isFetchingfood_data ? (
                <Box className={classes.loader_box}>
                  <Loader visible={true} />
                </Box>
              ) : (
                <>
                  {food_data?.data?.target?.foodsData &&
                    food_data?.data?.target?.foodsData?.map((val) => (
                      <>
                        {val?.firstFoodData?.photo && (
                          <Grid.Col
                            span={3}
                            lg={3}
                            p={5}
                            className={classes.menu_grid}>
                            <Box maw={isSuperBigScreen?"50%":'100%'}>
                            <LazyLoadImage
                              style={{
                                boxShadow: "0 10px 8px rgba(0, 0, 0, 0.3)",
                                borderRadius: "100%",
                                objectFit: "cover"
                              }}
                              width={"100%"}
                              height={'100%'}
                              src={val?.firstFoodData?.photoURL}
                              alt="food image"
                              fit="contain"
                              effect="blur"
                              />
                              </Box>
                          </Grid.Col>
                        )}
                      </>
                    ))}
                </>
              )}
            </Grid>

            <Grid gutter={0} mt={40} className={classes.menuBtnGrind}>
              <Grid.Col span={12} md={6} lg={4}>
                <PrimaryButton
                  variant="outline"
                  className={classes.menu_btn}
                  onClick={() => navigate(`/shop-menu-card/${shop_id}`)}
                >
                  Menu Card
                </PrimaryButton>
              </Grid.Col>
            </Grid>
          </Grid.Col>

          {/* -------------- */}

          <Grid.Col span={12} mt={20}>
            <Grid gutter={10} mb={10} p={10}>
              {isFetchingRoom ? (
                <Box className={classes.loader_box}>
                  <Loader visible={true} />
                </Box>
              ) : (
                <>
                  {roomImage?.data?.target &&
                    roomImage?.data?.target?.slice(0, isMobile?2:4)?.map((val,index) => (
                      <>
                        {val?.roomFirstPicURL && (
                          <Grid.Col
                            span={6}
                            xs={6}
                            md={6}
                            lg={3}
                            p={5}
                            className={classes.menu_grid}
                          >
                            <Paper className={classes.roomImages}>
                              <LazyLoadImage
                                width={'100%'}
                                height={'100%'}
                                radius="10px"
                                src={val?.roomFirstPicURL}
                                alt="Random image"
                                style={{
                                  objectFit: "cover"
                                }}
                              />
                            </Paper>
                          </Grid.Col>
                        )}
                      </>
                    ))}
                </>
              )}
            </Grid>
            {roomImage?.data?.target?.length > 0 && (
              <Grid gutter={0} mt={40} className={classes.menuBtnGrind}>
                <Grid.Col span={12} md={6} lg={4}>
                  <PrimaryButton
                    variant="outline"
                    className={classes.menu_btn}
                    onClick={() => navigate(`/shop-room-card/${shop_id}`)}
                  >
                    {roomImage?.data?.title??'Rooms GO Through'}
                  </PrimaryButton>
                </Grid.Col>
              </Grid>
            )}
          </Grid.Col>

          {/* -------------- */}

          <Grid.Col
            span={12}
            mt={20}
            p={"0 15px 15px 15px"}
            className={classes.border}
          >
            <Grid gutter={0}>
              <Grid.Col span={12} className={classes.serviceCol}>
                <TextN1 className={classes.serviceTextHeading}>
                  Foods Categories
                </TextN1>
              </Grid.Col>
              {food_data?.data?.target?.allCategories?.map((val) => (
                <Grid.Col span={6} lg={3} className={classes.serviceCol}>
                  <ActionIcon variant="transparent" color="green" radius={50}>
                    <IconCircleCheckFilled size="1rem" />
                  </ActionIcon>
                  <TextN1>{val?.categorie_name}</TextN1>
                </Grid.Col>
              ))}
            </Grid>
          </Grid.Col>

          <Grid gutter={5} w={"100%"} p={"0px 15px"}>
            {isFetching ? (
              <Box className={classes.loader_box}>
                <Loader visible={true} />
              </Box>
            ) : (
              <>
                {data?.data?.target[0]?.menu_instance_image?.length !== 0 && (
                  <Grid.Col span={12} className={classes.serviceCol} mt={10}>
                    <TextN1 className={classes.serviceTextHeading}>Menu</TextN1>
                  </Grid.Col>
                )}

                {data?.data?.target[0]?.menu_instance_image?.length !== 0 &&
                  data?.data?.target[0]?.menu_instance_image?.map((val) => (
                    <Grid.Col
                      span={3}
                      lg={2}
                      p={5}
                      className={classes.real_menu_grid}
                    >
                      <Box maw={"100%"}  h={isMobile ? "120px" : "350px"}>
                      <LazyLoadImage
                        style={{
                          boxShadow: "0 10px 8px rgba(0, 0, 0, 0.3)",
                          borderRadius: "10px",
                          cursor: "pointer",
                          objectFit: "cover"
                        }}
                        onClick={() => {
                          setMenuImage(val?.photoURL);
                        }}
                        width={"100%"}
                        height={'100%'}
                        radius="10px"
                        src={val?.photoURL}
                        alt="Random image"
                        effect="blur"
                      />

                      </Box>
                    </Grid.Col>
                  ))}
              </>
            )}
          </Grid>

          <Grid.Col
            span={12}
            lg={4}
            mt={25}
            p={"5px 10px 5px 10px"}
            style={{
              border: `1px solid #e0e0eb`,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Grid>
              <Grid.Col span={1} className={classes.addressLogo}>
                <ActionIcon
                  variant="transparent"
                  color="#1274c0"
                  radius={50}
                  onClick={() => {
                    window.location.href =
                      data?.data?.target[0]?.shop_google_address;
                  }}
                >
                  <IconMap2 size="2rem" />
                </ActionIcon>
              </Grid.Col>

              <Grid.Col span={9} className={classes.address_grid_text}>
                <TextN1 className={classes.bigAddress}>
                  {data?.data?.target[0]?.address}
                </TextN1>
              </Grid.Col>

              <Grid.Col span={2} className={classes.addressMap}>
                <Box maw={"100%"}>
                <LazyLoadImage
                  width={'100%'}
                  src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_2560%2Cc_limit/GoogleMapTA.jpg"
                  alt="Random image"
                  onClick={() => {
                    window.location.href =
                      data?.data?.target[0]?.shop_google_address;
                  }}
                  effect="blur"
                  style={{
                    objectFit: "cover"
                  }}
                />

                </Box>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          {/* Open CLose Time */}
          <Grid.Col
            span={12}
            lg={4}
            mt={25}
            p={"15px 10px 15px 10px"}
            className={classes.phone_info}
            style={{
              border: `1px solid #e0e0eb`,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
            }}
          >
            <Grid gutter={10}>
              <Grid.Col span={1}>
                <ActionIcon variant="transparent" color="#1274c0" radius={50}>
                  <IconPhoneCall size="2rem" />
                </ActionIcon>
              </Grid.Col>
              <Grid.Col span={11}>
                <Grid gutter={0}>
                  <Grid.Col span={5} pt={2} style={{ display: "flex" }}>
                    <span>{data?.data?.target[0]?.alt_phone} </span>,
                    <span style={{ paddingLeft: "5px" }}>
                      {data?.data?.target[0]?.phone}{" "}
                    </span>
                  </Grid.Col>
                </Grid>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          {/* Online Transiction */}
          <Grid.Col
            span={12}
            lg={4}
            mt={25}
            p={"15px 10px 15px 10px"}
            style={{
              border: `1px solid #e0e0eb`,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
            }}
          >
            <Grid gutter={0}>
              <Grid.Col span={1} lg={12} className={classes.addressLogo}>
                <ActionIcon variant="transparent" color="#1274c0" radius={50}>
                  <IconClockHour4 size="2rem" />
                </ActionIcon>
              </Grid.Col>
              <Grid.Col span={11} className={classes.addresGrid}>
                <TextN1 className={classes.openTimingText}>Weak Timing</TextN1>
                <TextN1 className={classes.textDark}>
                  Open - Close:
                  <span className={classes.Timing}>
                    {data?.data?.target[0]?.start_time &&
                    data?.data?.target[0]?.end_time ? (
                      <>
                        {moment(
                          data?.data?.target[0]?.start_time,
                          "HH:mm"
                        ).format("hh:mm A")}
                        {" / "}
                        {moment(
                          data?.data?.target[0]?.end_time,
                          "HH:mm"
                        ).format("hh:mm A")}
                      </>
                    ) : (
                      "Not Provided"
                    )}
                  </span>
                </TextN1>
                <TextN1 className={classes.textDark}>
                  Day's off :
                  <span className={classes.Timing}>
                    {data?.data?.target[0]?.day_offs?.length ? (
                      <>
                        {data?.data?.target[0]?.day_offs?.map((val) => {
                          return <>{val}, </>;
                        })}
                      </>
                    ) : (
                      "Not Provided"
                    )}
                  </span>
                  {data?.data?.target[0]?.extra_time_info && (
                    <TextN1 className={classes.textDark}>
                      Info :
                      <span className={classes.Timing}>
                        {data?.data?.target[0]?.extra_time_info}
                      </span>
                    </TextN1>
                  )}
                </TextN1>
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col span={12} mt={20} p={"25px"}>
            <Grid gutter={0} pl={5} pr={5}>
              <Grid.Col span={12} className={classes.serviceCol}>
                <TextN1 className={classes.serviceTextHeading}>
                  Comment Section
                </TextN1>
              </Grid.Col>
              <Grid gutter={0} w={"100%"}>
                <Grid.Col span={12}>
                  <Formik
                    initialValues={{}}
                    onSubmit={async (val) => {
                      try {
                        const customer_order_info = Cookies.get(
                          "customer_order_info"
                        );
                        const parsedData = JSON.parse(customer_order_info);
                        val = {
                          ...val,
                          ...parsedData,
                          shop_id: shop_id,
                        };
                        if (
                          parsedData?.name?.length !== 0 &&
                          val?.comment?.length !== 0
                        ) {
                          await addComment.mutateAsync(val, {
                            onSuccess: (res) => {
                              shoeNotification(
                                "success",
                                "Comment Added Successfully"
                              );
                              refetchComment();
                            },
                          });
                        } else {
                          shoeNotification("error", "Please Enter Comment");
                        }
                      } catch (error) {
                        shoeNotification(
                          "error",
                          "You Can Comment Between Your Order up tp 24 hours"
                        );
                      }
                    }}
                  >
                    {({ values, setFieldValue, handleChange, errors }) => (
                      <Form>
                        <Grid gutter={0}>
                          <Grid.Col span={9} lg={4}>
                            <Rating
                              value={values?.rating}
                              id="rating"
                              name="rating"
                              className={classes.rating}
                              onChange={(val) => {
                                setFieldValue("rating", val);
                              }}
                            />
                            <TextInputView
                              id={"comment"}
                              type="string"
                              name={"comment"}
                              placeholder={"Comment.."}
                              label={"Post Comments"}
                              description="Customer Can Comment after Order for 5 hours"
                              onChange={handleChange}
                              className={classes.comment}
                            />
                          </Grid.Col>
                          <Grid.Col
                            span={3}
                            lg={4}
                            pl={10}
                            style={{ display: "flex", alignItems: "flex-end" }}
                          >
                            <PrimaryButton type="submit">Submit</PrimaryButton>
                          </Grid.Col>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </Grid.Col>
              </Grid>
            </Grid>
          </Grid.Col>
          <Grid.Col span={12} p={"0 25px 0 25px"}>
            {isFetchingComment ? (
              <Loader visible={true} />
            ) : (
              <>
                <CommentSection data_Comment={data_Comment?.data?.target} />
                <Grid gutter={12} mt={10}>
                  <Grid.Col
                    span={2}
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    {data_Comment?.data?.pageInfo?.currentPage > 1 &&
                      data_Comment?.data?.pageInfo?.currentPage <=
                        data_Comment?.data?.pageInfo?.totalPages && (
                        <Button
                          onClick={() => {
                            window.scrollTo({ bottom: 0, behavior: "smooth" });
                            setcommentPage(
                              data_Comment?.data?.pageInfo?.currentPage - 1
                            );
                          }}
                        >
                          Prev
                        </Button>
                      )}
                  </Grid.Col>

                  <Grid.Col span={8} className={classes.paginationGrid}>
                    <TextN1> View Comments </TextN1>
                  </Grid.Col>

                  <Grid.Col
                    span={2}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    {data_Comment?.data?.pageInfo?.currentPage <
                      data_Comment?.data?.pageInfo?.totalPages && (
                      <Button
                        onClick={() => {
                          window.scrollTo({ bottom: 0, behavior: "smooth" });
                          setcommentPage(
                            data_Comment?.data?.pageInfo?.currentPage + 1
                          );
                        }}
                      >
                        Next
                      </Button>
                    )}
                  </Grid.Col>
                </Grid>
              </>
            )}
          </Grid.Col>
        </Grid>
      </Box>
      <LoadingOverlay visible={isFetching} overlayBlur={10} />

      <Modal
        opened={menuImage}
        onClose={() => setMenuImage(null)}
        size={"md"}
        centered
      >
        <Image
          style={{
            boxShadow: "0 10px 8px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          maw={"100%"}
          radius="10px"
          src={menuImage}
          alt="Random image"
        />
      </Modal>
    </>
  );
};

export default ShopMainPage;
