import {
  ActionIcon,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Image,
  LoadingOverlay,
  Modal,
  Pagination,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { getShopRooms } from "../../services/api/shopProductEdit";
import CardMessage from "../../components/Card/CardMessage";
import { TextN1 } from "../../components/Text";
import { IconGrill } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import { TextInputViewNormal } from "../../components/Inputs";
import { IconSearch } from "@tabler/icons-react";
import { Customecolors } from "../../theme";
import { debounce } from "lodash";
import { IconAddressBook } from "@tabler/icons-react";
import { useMediaQuery } from "react-responsive";

const RoomMenu = () => {
  const { shop_id } = useParams();
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [clickedRoom, setClickedRoom] = useState(null);
  const [searchItem, setSearchItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const isDesktop = useMediaQuery({
    query: "(min-width: 700px)",
  });

  const {
    data: roomImage,
    refetch,
    isFetching: isFetchingRoom,
  } = useQuery({
    queryKey: ["getShopRooms", shop_id, searchItem],
    queryFn: () => getShopRooms(shop_id, currentPage, searchItem),
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [currentPage, searchItem]);

  const debouncedHandler = debounce((value) => {
    setSearchItem(value);
  }, 700);

  return (
    <Box className={classes.outer_box} mt={10}>
      <Box className={classes.tab_panel}>
        <Grid gutter={5}>
          <Grid.Col span={6}>
            <ActionIcon
              variant="filled"
              color="lime"
              size="lg"
              radius="md"
              onClick={() => {
                if (shop_id) {
                  navigate(`/shop-menu-card/${shop_id}`);
                } else {
                  navigate("/shop-listing");
                }
              }}
            >
              <IconGrill />
            </ActionIcon>
          </Grid.Col>
          <Grid.Col span={6} className={classes.headgrid}>
            <ActionIcon
              variant="filled"
              color="lime"
              size="lg"
              radius="md"
              onClick={() => {
                if (shop_id) {
                  navigate(`/shop-profile/${shop_id}`);
                } else {
                  navigate("/shop-listing");
                }
              }}
            >
              <IconAddressBook />
            </ActionIcon>
          </Grid.Col>
          <Grid.Col span={12}>
            <TextN1 className={classes.roomMenuTitle}>
              {" "}
              Experience unparalleled comfort and style in our Place's
              🥰{" "}
            </TextN1>
          </Grid.Col>
          <Grid.Col span={12} lg={4} mt={5}>
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
         
          {roomImage?.data?.target && roomImage?.data?.target?.length ? (
            <Grid w={"100%"} mt={10}>
              {roomImage?.data?.target?.map((items) => (
                <Grid.Col
                  span={6}
                  xs={6}
                  md={6}
                  lg={3}
                  mt={3}
                  onClick={() => setClickedRoom(items)}
                >
                  <CardMessage
                    shadow={"xl"}
                    padding="0"
                    imgH={isDesktop ? "30vh" : "20vh"}
                    style={{
                      boxShadow: "2px 2px 8px #b3b3cc",
                      borderRadius: "10px",
                    }}
                    customeLowerBox={
                      <>
                        {(items?.roomName?.length>0 ||
                          items?.roomPrice?.length>0) && (
                          <Grid gutter={0} pb={10} pl={5} pr={5}>
                            {items?.roomName && (
                              <Grid.Col span={12} mt={5} pl={3}>
                                <TextN1 className={classes.priceName}>
                                  {items?.roomName}
                                </TextN1>
                              </Grid.Col>
                            )}

                            {items?.roomPrice && (
                              <Grid.Col span={12} mt={5}>
                                <TextN1 className={classes.pPrice2}>
                                  {items?.roomPrice} ₹
                                </TextN1>
                              </Grid.Col>
                            )}
                          </Grid>
                        )}
                      </>
                    }
                    imageUrl={items?.imageUrl}
                  />
                </Grid.Col>
              ))}
            </Grid>
          ) : (
            <Grid w={"100%"} mt={30}>
              <Grid.Col span={12}>
                <TextN1 className={classes.Nodatamsg}>No Data Found</TextN1>
              </Grid.Col>
            </Grid>
          )}
        </Grid>
        {roomImage && (
          <Grid gutter={12} mt={10}>
            <Grid.Col
              span={2}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              {roomImage?.data?.currentPage > 1 &&
                roomImage?.data?.currentPage <= roomImage?.data?.totalPages && (
                  <Button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      if (roomImage?.data?.currentPage) {
                        setCurrentPage(
                          parseInt(roomImage?.data?.currentPage) - 1
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
                  window.scrollTo({ bottom: 0, behavior: "smooth" });
                  setCurrentPage(val);
                }}
                value={roomImage?.data?.currentPage}
                total={roomImage?.data?.totalPages}
                size="sm"
                radius="md"
                withControls={false}
              />
            </Grid.Col>

            <Grid.Col
              span={2}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              {roomImage?.data?.currentPage < roomImage?.data?.totalPages && (
                <Button
                  onClick={() => {
                    window.scrollTo({ top: 0 });
                    if (roomImage?.data?.currentPage) {
                      setCurrentPage(
                        parseInt(roomImage?.data?.currentPage) + 1
                      );
                    }
                  }}
                >
                  Next
                </Button>
              )}
            </Grid.Col>
          </Grid>
        )}
        <Modal
          opened={clickedRoom}
          onClose={() => setClickedRoom(null)}
          size={"md"}
          centered
          title="Heyyyy Check This One 😍"
          className={classes.modalbox}
        >
          {clickedRoom && (
            <Card radius="md" withBorder>
              <Card.Section>
                <Carousel
                  withIndicators
                  slideSize={clickedRoom?.additionalImageUrl?'95%':"100%"}
                  align="start"
                  slideGap={"sm"}
                  controlSize={14}
                >
                  {clickedRoom?.imageUrl && (
                    <Carousel.Slide>
                      <Image src={clickedRoom?.imageUrl} />
                    </Carousel.Slide>
                  )}
                  {clickedRoom?.additionalImageUrl && (
                    <Carousel.Slide>
                      <Image src={clickedRoom?.additionalImageUrl} />
                    </Carousel.Slide>
                  )}
                </Carousel>
              </Card.Section>
            </Card>
          )}
          <Grid mt={10}>
            {clickedRoom?.roomName && (
              <Grid.Col span={12}>
                <TextN1 className={classes.priceName}>
                  Room: {clickedRoom?.roomName}
                </TextN1>
              </Grid.Col>
            )}
            {clickedRoom?.about && (
              <Grid.Col span={12}>
                <TextN1 className={classes.desc}>{clickedRoom?.about}</TextN1>
                <Divider color="#e0e0eb" />
              </Grid.Col>
            )}
            {clickedRoom?.roomPrice && (
              <Grid.Col span={12}>
                <TextN1>
                  Price:{" "}
                  <span className={classes.room_dialog_price}>
                    {" "}
                    {clickedRoom?.roomPrice} ₹{" "}
                  </span>
                </TextN1>
              </Grid.Col>
            )}
          </Grid>
        </Modal>
        <LoadingOverlay visible={isFetchingRoom} />
      </Box>
    </Box>
  );
};

export default RoomMenu;
