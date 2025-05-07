import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  LoadingOverlay,
  Paper,
  ThemeIcon,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import { TextInputView, TextInputViewNormal } from "../../components/Inputs";
import { IconBuildingStore, IconPhone, IconSearch } from "@tabler/icons-react";
import { Customecolors } from "../../theme";
import { Image } from "@mantine/core";
import { TextN1 } from "../../components/Text";
import { PrimaryButton } from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { IconMapPinHeart } from "@tabler/icons-react";
import { IconBuildingPavilion } from "@tabler/icons-react";
import { IconPhoneCall } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { get_shop_list } from "../../services/api/shopListing";
import { debounce } from "lodash";
import { IconMapPinShare } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import KartLogo from "../../assets/KartLogo.jpg";

const ShopListing = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [shopList, setShopList] = useState();
  const [searchInput, setSearchInput] = useState(null);
  const [pinCodeInput, setPinCodeInput] = useState(null);
  const [cityNameInput, setCityNameInput] = useState(null);

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["getShopListingShort", currentPage],
    queryFn: () =>
      get_shop_list({
        currentPage,
        searchName: searchInput,
        pinCodeInput: pinCodeInput,
        cityNameInput: cityNameInput,
      }),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [currentPage]);

  useEffect(() => {
    if (data?.data?.target) {
      setShopList([...data?.data?.target]);
    }
  }, [data]);

  useEffect(() => {
    if (
      searchInput !== null ||
      pinCodeInput !== null ||
      cityNameInput !== null
    ) {
      refetch();
    }
  }, [searchInput, pinCodeInput, cityNameInput]);

  const debouncedHandlerSearch = debounce((value) => {
    setCurrentPage(() => 1);
    setSearchInput(value);
  }, 700);

  const debouncedHandlerPinCode = debounce((value) => {
    setCurrentPage(() => 1);
    setPinCodeInput(value);
  }, 700);

  const debouncedHandlerCityName = debounce((value) => {
    setCurrentPage(() => 1);
    setCityNameInput(value);
  }, 700);

  return (
    <Box>
      <Grid gutter={5} className={classes.search}>
        <Grid.Col span={12} className={classes.headingGrid} mb={10}>
          <Grid w={"100%"}>
            <Grid.Col span={1}>
              <LazyLoadImage
                alt="logo"
                src={
                  KartLogo
                }
                width={"40px"}
                style={{ objectFit: "cover" ,borderRadius:'100%' }}
                fit="contain"
                effect="blur"
              />
            </Grid.Col>

            <Grid.Col span={10} className={classes.notifyTopIcon}>
              <TextN1 className={classes.discoverHeading}>Discover Your Favorite Place With Us</TextN1>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={12} lg={4} mb={5}>
          <TextInputViewNormal
            id={"search"}
            name={"search"}
            label="Search Shop Name"
            placeholder={"Search here"}
            onChange={(e) => debouncedHandlerSearch(e?.target?.value)}
            icon={
              <ActionIcon>
                <IconSearch color={Customecolors.gray} />
              </ActionIcon>
            }
          />
        </Grid.Col>
        <Grid.Col span={6} lg={4}>
          <TextInputViewNormal
            id={"city_code"}
            type="number"
            name={"city_code"}
            label="City Code"
            placeholder={"City Pin Code"}
            onChange={(e) => debouncedHandlerPinCode(e?.target?.value)}
            icon={
              <ActionIcon>
                <IconMapPinHeart color={Customecolors.light_green} />
              </ActionIcon>
            }
          />
        </Grid.Col>

        <Grid.Col span={6} lg={4}>
          <TextInputViewNormal
            id={"city_name"}
            type="text"
            label="City Name"
            name={"city_name"}
            placeholder={"City Name"}
            onChange={(e) => debouncedHandlerCityName(e?.target?.value)}
            icon={
              <ActionIcon>
                <IconBuildingPavilion color={Customecolors.light_green} />
              </ActionIcon>
            }
          />
        </Grid.Col>
      </Grid>
      {!isFetching && (
        <>
          <Grid mt={10}>
            {/*  Shop Boxes */}
            <>
              {shopList?.map((val, index) => (
                <>
                  <Grid.Col span={12} xs={6} sm={6} md={6} lg={4}>
                    {val?.banner_image[0]?.photoURL &&
                      val?.shopName &&
                      val?.address &&
                      val?.phone &&
                      val?.about && (
                        <Paper shadow="xl" radius={10}>
                          <Grid gutter={2} className={classes.ShopBox} p={10}>
                            <Grid.Col span={5} className={classes.image}>
                              <Carousel controlSize={14} loop>
                                {val?.banner_image?.map((val) => (
                                  <Carousel.Slide>
                                    <LazyLoadImage
                                      className={classes.image_carousel}
                                      mx="auto"
                                      width={'100%'}
                                      height={"100%"}
                                      radius="md"
                                      src={val?.photoURL}
                                      alt="Random image"
                                      style={{ objectFit: "cover" }}
                                      effect="blur"
                                      loading="lazy"
                                    />
                                  </Carousel.Slide>
                                ))}
                              </Carousel>
                            </Grid.Col>
                            <Grid.Col
                              span={7}
                              pl={10}
                              className={classes.shopDetails}
                            >
                              <Grid gutter={0}>
                                <Grid.Col
                                  span={12}
                                  className={classes.title_logo}
                                >
                                  <ThemeIcon
                                    size="xs"
                                    p={"1px 1px 1px 0px"}
                                    variant="gradient"
                                    gradient={{
                                      from: "teal",
                                      to: "lime",
                                      deg: 105,
                                    }}
                                  >
                                    <IconBuildingStore />
                                  </ThemeIcon>
                                  <TextN1
                                    pl={5}
                                    truncate
                                    className={classes.DarkFont}
                                  >
                                    {val?.shopName ?? "--"}
                                  </TextN1>
                                </Grid.Col>

                                <Grid.Col
                                  span={12}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <ThemeIcon
                                    size="xs"
                                    p={"1px 1px 1px 0px"}
                                    variant="gradient"
                                    gradient={{
                                      from: "teal",
                                      to: "lime",
                                      deg: 105,
                                    }}
                                  >
                                    <IconPhoneCall />
                                  </ThemeIcon>
                                  <TextN1
                                    truncate
                                    className={classes.address}
                                    pl={5}
                                  >
                                    {val?.phone ?? "--"}
                                  </TextN1>
                                </Grid.Col>

                                <Grid.Col
                                  span={12}
                                  mt={3}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <ThemeIcon
                                    size="xs"
                                    p={"1px 1px 1px 0px"}
                                    variant="gradient"
                                    gradient={{
                                      from: "teal",
                                      to: "lime",
                                      deg: 105,
                                    }}
                                  >
                                    <IconMapPinShare />
                                  </ThemeIcon>
                                  <TextN1
                                    pl={5}
                                    truncate
                                    className={classes.address}
                                  >
                                    {val?.address ?? "--"}
                                  </TextN1>
                                </Grid.Col>

                                <Grid.Col span={12}>
                                  <TextN1
                                    truncate
                                    className={` ${classes.about}`}
                                  >
                                    {val?.about ?? "--"}
                                  </TextN1>
                                </Grid.Col>
                                <Grid.Col
                                  span={12}
                                  className={classes.openClose}
                                >
                                  <TextN1
                                    truncate
                                    className={
                                      1
                                        ? classes.statusOpen
                                        : classes.statusClose
                                    }
                                  >
                                    Shop
                                    <Badge
                                      component="a"
                                      href="https://mantine.dev"
                                      size="sm"
                                      variant="filled"
                                      color={val?.status ? "green" : "red"}
                                      style={{ margin: "0 5px" }}
                                    >
                                      {val?.status ? (
                                        <span>Open</span>
                                      ) : (
                                        <span>Close</span>
                                      )}
                                    </Badge>
                                    Now
                                  </TextN1>
                                </Grid.Col>
                              </Grid>
                            </Grid.Col>
                            <Grid.Col span={12} mt={10}>
                              <Grid gutter={10}>
                                <Grid.Col span={6}>
                                  <PrimaryButton
                                    className={classes.Btn}
                                    onClick={() =>
                                      (window.location.href = `tel:${val?.phone}`)
                                    }
                                  >
                                    <ThemeIcon
                                      size="xs"
                                      variant="gradient"
                                      mr={5}
                                    >
                                      <IconPhone />
                                    </ThemeIcon>
                                    Call Now
                                  </PrimaryButton>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                  <PrimaryButton
                                    className={classes.Btn}
                                    onClick={() => {
                                      navigate(`/shop-profile/${val?._id}`);
                                    }}
                                  >
                                    <ThemeIcon
                                      size="xs"
                                      variant="gradient"
                                      mr={5}
                                    >
                                      <IconBuildingStore />
                                    </ThemeIcon>
                                    Visit
                                  </PrimaryButton>
                                </Grid.Col>
                              </Grid>
                            </Grid.Col>
                          </Grid>
                        </Paper>
                      )}
                  </Grid.Col>
                </>
              ))}
            </>
          </Grid>
          {shopList && (
            <Grid gutter={12} mt={10}>
              <Grid.Col
                span={6}
                style={{ display: "flex", justifyContent: "flex-start" }}
              >
                {data?.data?.currentPage > 1 &&
                  data?.data?.currentPage <= data?.data?.totalPages && (
                    <Button
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        setCurrentPage(data?.data?.currentPage - 1);
                      }}
                    >
                      Prev
                    </Button>
                  )}
              </Grid.Col>
              <Grid.Col
                span={6}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                {data?.data?.currentPage < data?.data?.totalPages && (
                  <Button
                    onClick={() => {
                      window.scrollTo({ top: 0 });
                      setCurrentPage(data?.data?.currentPage + 1);
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
      <LoadingOverlay visible={isFetching} />
    </Box>
  );
};

export default ShopListing;
