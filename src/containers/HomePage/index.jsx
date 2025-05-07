import {
  Accordion,
  ActionIcon,
  Avatar,
  Box,
  Divider,
  Grid,
  Group,
  Modal,
  Paper,
  Text,
} from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { useStyles } from "./style";
import { TextN1 } from "../../components/Text";
import { PrimaryButton } from "../../components/Buttons";
import { IconMail } from "@tabler/icons-react";
import { IconDiscountCheckFilled } from "@tabler/icons-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { IconPhoneCall } from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import { TextInputViewNormal } from "../../components/Inputs";
import { IconClock } from "@tabler/icons-react";
import { Form, Formik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { get_home_image, send_contactUs_form } from "../../services/api/home";
import { shoeNotification } from "../../components/Notify";
import Autoplay from "embla-carousel-autoplay";
import { TypeAnimation } from "react-type-animation";
import KartLogo from "../../assets/KartLogo.jpg";
import { useMediaQuery } from "react-responsive";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const Banner = useRef(null);
  const pos_features = useRef(null);
  const contactus = useRef(null);
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const [LoginBtn, setLoginBtn] = useState(false);
  const [phoneNumber, setphoneNumber] = useState('9589857573');
  const isMobile = useMediaQuery({
    query: "(max-width: 1000px)",
  });
  const charactersList = [
    {
      id: "bender",
      image: "https://img.icons8.com/clouds/256/000000/futurama-bender.png",
      label: "POS System",
      content:
        "Revolutionize your business with our cutting-edge POS system for owners! Streamline transactions, track inventory, and boost sales effortlessly. Take control of your business operations with user-friendly features and real-time insights. Experience efficiency like never before with our tailored POS solution. Upgrade today for a seamless and successful business journey!",
    },

    {
      id: "carol",
      image: "https://img.icons8.com/clouds/256/000000/futurama-mom.png",
      label: "Free Website & Menu",
      content:
        "Unlock the potential of your business with our Free Website & Menu solution! Establish a dynamic online presence effortlessly, showcasing your brand's unique offerings. Craft a professional website and captivating menu with ease – all without breaking the bank. Elevate your digital presence for increased visibility and customer engagement. Get started for free and let your business shine online!",
    },

    {
      id: "homer",
      image: "https://img.icons8.com/clouds/256/000000/homer-simpson.png",
      label: "Staff Management System",
      content:
        "Empower your workforce with our advanced Staff Management System! Simplify scheduling, track attendance, and enhance communication seamlessly. Optimize productivity and foster a collaborative environment with user-friendly features. Elevate your staff management experience for a more efficient and cohesive team. Revolutionize your workplace dynamics – upgrade to our Staff Management System now!",
    },
  ];
  function AccordionLabel({ label, image, description }) {
    return (
      <Group wrap="nowrap">
        <Avatar src={image} radius="xl" size="lg" />
        <div>
          <Text>{label}</Text>
          <Text size="sm" c="dimmed" fw={400}>
            {description}
          </Text>
        </div>
      </Group>
    );
  }
  const items = charactersList.map((item) => (
    <Grid.Col span={12} md={4}>
      <Accordion.Item value={item.id} key={item.label}>
        <Accordion.Control>
          <AccordionLabel {...item} />
        </Accordion.Control>
        <Accordion.Panel>
          <Text size="sm">{item.content}</Text>
        </Accordion.Panel>
      </Accordion.Item>
    </Grid.Col>
  ));

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["getHomeImages"],
    queryFn: () => get_home_image(),
    enabled: false,
  });
  useEffect(() => {
    refetch();
  }, []);
  const sendConsumerInfoForm = useMutation({
    mutationFn: (newVal) => send_contactUs_form(newVal),
  });
  return (
    <>
      <Box w={"100%"} className={classes.box} ref={Banner}>
        <Grid gutter={0} className={classes.grid}>
          <Grid.Col span={1} className={classes.logo_grid}>
            <LazyLoadImage
              alt="logo"
              style={{ objectFit: "cover" }}
              src={KartLogo}
              width={"30px"}
              fit="contain"
              effect="blur"
            />
            {!isMobile && (
              <TextN1 className={classes.domainName}>HotelCafeKart.com</TextN1>
            )}
          </Grid.Col>
          <Grid.Col span={11} className={classes.menuBar_rightGrid}>
            <Grid w={"100%"} className={classes.menuBar_rightGrid_insideGrid}>
              <Grid.Col
                span={3}
                md={1}
                className={classes.gridNav}
                onClick={() => {
                  Banner.current.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <TextN1 className={classes.text}>Home</TextN1>
              </Grid.Col>
              <Grid.Col
                span={3}
                md={1}
                className={classes.gridNav}
                onClick={() => {
                  pos_features.current.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <TextN1 className={classes.text}>POS</TextN1>
              </Grid.Col>

              <Grid.Col
                span={3}
                md={1}
                className={classes.gridNav}
                onClick={() => {
                  contactus.current.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <TextN1 className={classes.text}>Contact</TextN1>
              </Grid.Col>

              <Grid.Col
                span={3}
                md={1}
                className={classes.gridNav}
                onClick={() => {
                  setLoginBtn(true);
                }}
              >
                <TextN1 className={classes.text}>Login</TextN1>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
        <Box w={"100%"} className={classes.bannerImage_box}>
          <Box className={classes.BannerBox}>
            <Box w={"100%"} h={"80vh"}>
              <LazyLoadImage
                src={data?.data?.target[8]?.photoURL}
                height={"100%"}
                width={"100%"}
                style={{ objectFit: "cover" }}
                alt="BannerImage"
                effect="blur"
              />
            </Box>
            <Box className={classes.bannerTextBox}>
              <Box className={classes.dataBox}>
                <TypeAnimation
                  sequence={[
                    "Wellcome To HotelCafeKart.com 😍",
                    5000,
                    `Take Your Hotels & Cafe Online`,
                    5000,
                  ]}
                  wrapper="span"
                  className={classes.heading}
                  speed={50}
                  style={{
                    fontSize: isMobile ? "1rem" : "3em",
                    display: "inline-block",
                    color: "white",
                    fontFamily: "museo-sans, sans-serif",
                  }}
                  repeat={Infinity}
                />
                <TextN1 className={classes.description} mt={15}>
                  Savor success with our Management Software – from order to
                  inventory, we've got it covered. Transform your Café Hotels
                  and Shops into a tech-savvy hotspot for seamless operations
                  and delighted customers!
                </TextN1>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box w={"100%"} mt={"90vh"}>
          <Accordion chevronPosition="right" variant="contained">
            <Grid w={"100%"}>{items}</Grid>
          </Accordion>
          <Divider c={"#f0f0f5"} />
        </Box>
        <Box w={"100%"} mt={"5vh"}>
          <Grid w={"100%"} gutter={0} p={10}>
            <Grid.Col span={12} md={6} p={10}>
              <Box w={"100%"} p={15} className={classes.cardInfo}>
                <Grid w={"100%"} gutter={0}>
                  <Grid.Col
                    span={12}
                    md={12}
                    lg={6}
                    className={classes.image_card}
                  >
                    <Box h={"30vh"}>
                      <LazyLoadImage
                        alt="MenuImage"
                        src={data?.data?.target[7]?.photoURL}
                        radius={"10px"}
                        height="100%"
                        width={"100%"}
                        boxShadow="2px 2px 8px #b3b3cc"
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={12} md={12} lg={6} mt={5}>
                    <Text className={classes.linedescheading}>
                      Menu Management System
                    </Text>
                    <Divider color="#e1e1ea" m={"10px 0"} />
                    <Text className={classes.linedesc} mt={8}>
                      Transform your menu management effortlessly with our
                      cutting-edge Menu Management System! Streamline updates,
                      showcase enticing offerings, and enhance customer
                      experiences seamlessly. Take control of your culinary
                      narrative with user-friendly features and real-time
                      editing. Elevate your restaurant's appeal and efficiency –
                      upgrade to our Menu Management System for a tasteful
                      revolution in dining experience!
                    </Text>
                  </Grid.Col>
                </Grid>
              </Box>
            </Grid.Col>

            <Grid.Col span={12} md={6} p={10}>
              <Box w={"100%"} p={15} className={classes.cardInfo}>
                <Grid w={"100%"} gutter={0}>
                  <Grid.Col
                    span={12}
                    md={12}
                    lg={6}
                    className={classes.image_card}
                  >
                    <Box h={"30vh"}>
                      <LazyLoadImage
                        alt="billImage"
                        src={data?.data?.target[9]?.photoURL}
                        radius={"10px"}
                        height="100%"
                        width={"100%"}
                        boxShadow="2px 2px 8px #b3b3cc"
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  </Grid.Col>
                  <Grid.Col span={12} md={12} lg={6} mt={5}>
                    <Text className={classes.linedescheading}>
                      WathsApp & Paper Billing
                    </Text>
                    <Divider color="#e1e1ea" m={"10px 0"} />
                    <Text className={classes.linedesc} mt={8}>
                      Say goodbye to paper bills! 📜✉️ Introducing our WhatsApp
                      Billing feature – effortlessly send digital invoices
                      directly to your customers. Simplify transactions, save
                      time, and enhance customer convenience. Upgrade your
                      billing process with a click. Try it today and watch your
                      business soar! 💼💳 #DigitalBilling #CustomerConvenience
                    </Text>
                  </Grid.Col>
                </Grid>
              </Box>
            </Grid.Col>
            <Grid.Col span={12} mt={"5vh"}>
              <Divider color="#e1e1ea" />
            </Grid.Col>
            <Grid w={"100%"} mt={"5vh"} gutter={0}>
              <Grid.Col span={12} md={6} className={classes.BigCard}>
                <Paper w={"90%"} className={classes.imageShadow}>
                  <LazyLoadImage
                    alt="inventorieImage"
                    src={data?.data?.target[2]?.photoURL}
                    width={"100%"}
                    fit="contain"
                    radius={"10px 10px 10px 10px"}
                    style={{
                      border: "1px solid #e0e0eb",
                      borderRadius: "10px",
                      padding: "10px",
                      boxShadow: "2px 2px 8px #b3b3cc",
                      objectFit: "cover",
                    }}
                  />
                </Paper>
              </Grid.Col>

              <Grid.Col span={12} md={6} className={classes.longdesc}>
                <TextN1>
                  Embark on a transformative journey of business efficiency with
                  our all-encompassing POS System, designed to elevate every
                  facet of your operations. Seamlessly managing inventory is at
                  your fingertips, offering real-time insights that streamline
                  restocking processes and minimize waste. Empower your team
                  with intuitive staff management tools, facilitating efficient
                  scheduling, performance tracking, and seamless communication.
                  Dive into a wealth of insights with our detailed order history
                  feature, shaping your business strategy based on customer
                  preferences and sales trends.
                </TextN1>
                <Divider color="#e0e0eb" m={"10px 0"} />
                <TextN1>
                  Rest easy with robust security features that safeguard your
                  business and customer data. Enjoy the flexibility of
                  cloud-based accessibility, managing your business anytime,
                  anywhere. Foster customer loyalty with integrated programs and
                  personalized promotions, and make informed decisions with
                  comprehensive reporting on sales, inventory, and staff
                  performance. Our system seamlessly integrates with other tools
                  and services, creating a holistic business ecosystem.
                </TextN1>
                <Divider color="#e0e0eb" m={"10px 0"} />
                <TextN1>
                  Experience the future of business management with our POS
                  System – where innovation meets functionality. With
                  customizable reminders, prompt customer support, scalability
                  for growth, and vendor management capabilities, we ensure that
                  you are equipped to stay ahead of the competition. Regular
                  updates and new features keep your business at the forefront
                  of innovation. Upgrade to our POS System today and witness a
                  new era of efficiency and success unfold before you.
                </TextN1>
              </Grid.Col>

              <Grid.Col span={12} mt={"5vh"}>
                <Divider color="#e1e1ea" />
              </Grid.Col>

              <Grid.Col
                span={12}
                md={6}
                className={classes.longdesc}
                mt={"5vh"}
              >
                <TextN1>
                  Revolutionize your dining experience with our advanced Table
                  Ordering System, seamlessly connecting customers, waitstaff,
                  and owners for unparalleled efficiency and service. Customers
                  can effortlessly place orders directly from their tables,
                  enhancing convenience and reducing wait times. Our system
                  empowers waiters to efficiently take orders with a
                  user-friendly interface, ensuring accuracy and swift service.
                </TextN1>
                <Divider color="#e0e0eb" m={"10px 0"} />
                <TextN1>
                  The real magic happens behind the scenes as every order placed
                  is instantly reflected on the Owner's Software. Owners gain
                  real-time insights into the dining process, allowing for
                  proactive management of inventory, staff assignments, and
                  overall restaurant operations. This interconnected system
                  ensures that owners are always in the loop, fostering a
                  dynamic and responsive business environment.
                </TextN1>
                <Divider color="#e0e0eb" m={"10px 0"} />
                <TextN1>
                  Say goodbye to manual order processing and hello to a
                  streamlined and interconnected dining experience. Elevate your
                  restaurant's efficiency and customer satisfaction by embracing
                  our Table Ordering System – where every order is seamlessly
                  orchestrated, from the table to the owner's desk. Upgrade
                  today and experience the future of dining service.
                </TextN1>
              </Grid.Col>

              <Grid.Col span={12} md={6} className={classes.BigCard} mt={"5vh"}>
                <Box w={"90%"} className={classes.imageShadow}>
                  <LazyLoadImage
                    alt="TablePanelImage"
                    src={data?.data?.target[6]?.photoURL}
                    width={"100%"}
                    radius={"10px 10px 10px 10px"}
                    fit="contain"
                    style={{
                      border: "1px solid #e0e0eb",
                      borderRadius: "10px",
                      padding: "10px",
                      boxShadow: "2px 2px 8px #b3b3cc",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Grid.Col>

              <Grid.Col span={12} mt={"5vh"}>
                <Divider color="#e1e1ea" />
              </Grid.Col>

              <Grid.Col span={12} className={classes.planeinfo} mt={"5vh"}>
                <Box className={classes.planeinfo_Box}>
                  <TextN1 className={classes.planeHeading}>
                    Unlocking Success Together: Your POS Partnership Begins Here
                    <Divider color="#e1e1ea" m={"10px 0"} />
                  </TextN1>
                  <TextN1 className={classes.planedesc}>
                    Choosing our POS system isn't just a transaction, it's a
                    partnership that brings joy to your business. Experience the
                    satisfaction of seamless operations, enhanced efficiency,
                    and dedicated support. As our valued customer, you're not
                    just purchasing a product – you're gaining a trusted ally
                    committed to your success. Welcome to a journey where your
                    satisfaction is our top priority, and success becomes a
                    shared celebration.{" "}
                  </TextN1>
                </Box>
              </Grid.Col>

              <Grid.Col span={12} mt={"5vh"}>
                <Divider color="#e1e1ea" />
              </Grid.Col>

              <Grid.Col span={12} className={classes.planeinfo} mt={"5vh"}>
                <PrimaryButton className={classes.btn}>
                  {" "}
                  Let's Go Make Your Busines Grow{" "}
                </PrimaryButton>
              </Grid.Col>

              <Grid.Col
                span={12}
                className={classes.justMiddleImageGrid}
                mt={"10vh"}
              >
                <Box h={isMobile ? "100%" : "60vh"}>
                  <LazyLoadImage
                    alt="orderList"
                    src={data?.data?.target[5]?.photoURL}
                    height={"100%"}
                    width={"100%"}
                    radius={"10px 10px 10px 10px"}
                    fit="contain"
                    style={{
                      border: "1px solid #e0e0eb",
                      borderRadius: "10px",
                      padding: "10px",
                      boxShadow: "2px 2px 8px #b3b3cc",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Grid.Col>

              <Grid.Col span={12} mt={"10vh"}>
                <Divider color="#e1e1ea" />
              </Grid.Col>

              <Grid.Col span={12} mt={"3vh"} pl={isMobile ? 10 : 80}>
                <TextN1>
                  {" "}
                  Certainly! Here are some key features and Many More....{" "}
                </TextN1>
              </Grid.Col>
              <Grid.Col
                span={12}
                className={classes.TickInfoGrid}
                ref={pos_features}
                mt={"20px"}
              >
                <Grid w={"90%"} className={classes.boxTickinfo}>
                  <Grid.Col span={12} md={3}>
                    <Box className={classes.TickInfoBox}>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        radius={50}
                      >
                        <IconDiscountCheckFilled size="1.4rem" />
                      </ActionIcon>
                      <TextN1 ml={10}> POS System </TextN1>
                    </Box>
                  </Grid.Col>

                  <Grid.Col span={12} md={3}>
                    <Box className={classes.TickInfoBox}>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        radius={50}
                      >
                        <IconDiscountCheckFilled size="1.4rem" />
                      </ActionIcon>
                      <TextN1 ml={10}> Table Ordering PlatForm </TextN1>
                    </Box>
                  </Grid.Col>

                  <Grid.Col span={12} md={3}>
                    <Box className={classes.TickInfoBox}>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        radius={50}
                      >
                        <IconDiscountCheckFilled size="1.4rem" />
                      </ActionIcon>
                      <TextN1 ml={10}> Waiter Managable Inventories </TextN1>
                    </Box>
                  </Grid.Col>

                  <Grid.Col span={12} md={3}>
                    <Box className={classes.TickInfoBox}>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        radius={50}
                      >
                        <IconDiscountCheckFilled size="1.4rem" />
                      </ActionIcon>
                      <TextN1 ml={10}> Website For Your Busines </TextN1>
                    </Box>
                  </Grid.Col>

                  <Grid.Col span={12} md={3}>
                    <Box className={classes.TickInfoBox}>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        radius={50}
                      >
                        <IconDiscountCheckFilled size="1.4rem" />
                      </ActionIcon>
                      <TextN1 ml={10}> Wathsapp E-Bill </TextN1>
                    </Box>
                  </Grid.Col>

                  <Grid.Col span={12} md={3}>
                    <Box className={classes.TickInfoBox}>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        radius={50}
                      >
                        <IconDiscountCheckFilled size="1.4rem" />
                      </ActionIcon>
                      <TextN1 ml={10}> Staff Management System </TextN1>
                    </Box>
                  </Grid.Col>

                  <Grid.Col span={12} md={3}>
                    <Box className={classes.TickInfoBox}>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        radius={50}
                      >
                        <IconDiscountCheckFilled size="1.4rem" />
                      </ActionIcon>
                      <TextN1 ml={10}> Software Access Form Any Where </TextN1>
                    </Box>
                  </Grid.Col>

                  <Grid.Col span={12} md={3}>
                    <Box className={classes.TickInfoBox}>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        radius={50}
                      >
                        <IconDiscountCheckFilled size="1.4rem" />
                      </ActionIcon>
                      <TextN1 ml={10}>
                        {" "}
                        Effortlessly Reach Your Customers with Clear Messages{" "}
                      </TextN1>
                    </Box>
                  </Grid.Col>

                  <Grid.Col span={12} md={3}>
                    <Box className={classes.TickInfoBox}>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        radius={50}
                      >
                        <IconDiscountCheckFilled size="1.4rem" />
                      </ActionIcon>
                      <TextN1 ml={10}> Order History </TextN1>
                    </Box>
                  </Grid.Col>

                  <Grid.Col span={12} md={3}>
                    <Box className={classes.TickInfoBox}>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        radius={50}
                      >
                        <IconDiscountCheckFilled size="1.4rem" />
                      </ActionIcon>
                      <TextN1 ml={10}>
                        {" "}
                        User Friendly User Experience & UI System{" "}
                      </TextN1>
                    </Box>
                  </Grid.Col>

                  <Grid.Col span={12} md={3}>
                    <Box className={classes.TickInfoBox}>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        radius={50}
                      >
                        <IconDiscountCheckFilled size="1.4rem" />
                      </ActionIcon>
                      <TextN1 ml={10}> Room's Menu & Room POS </TextN1>
                    </Box>
                  </Grid.Col>

                  <Grid.Col span={12} md={3}>
                    <Box className={classes.TickInfoBox}>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        radius={50}
                      >
                        <IconDiscountCheckFilled size="1.4rem" />
                      </ActionIcon>
                      <TextN1 ml={10}>
                        {" "}
                        Streamline Ordering: Scan Barcodes from Rooms and Tables
                        for Effortless Service{" "}
                      </TextN1>
                    </Box>
                  </Grid.Col>

                  <Grid.Col span={12} md={3}>
                    <Box className={classes.TickInfoBox}>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        radius={50}
                      >
                        <IconDiscountCheckFilled size="1.4rem" />
                      </ActionIcon>
                      <TextN1 ml={10}>
                        {" "}
                        GST CalCulated Bills & E-Bills for WathsApp{" "}
                      </TextN1>
                    </Box>
                  </Grid.Col>

                  <Grid.Col span={12} md={3}>
                    <Box className={classes.TickInfoBox}>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        radius={50}
                      >
                        <IconDiscountCheckFilled size="1.4rem" />
                      </ActionIcon>
                      <TextN1 ml={10}> Unlimited Item's with Images </TextN1>
                    </Box>
                  </Grid.Col>

                  <Grid.Col span={12} md={3}>
                    <Box className={classes.TickInfoBox}>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        radius={50}
                      >
                        <IconDiscountCheckFilled size="1.4rem" />
                      </ActionIcon>
                      <TextN1 ml={10}> Categories Divided Items </TextN1>
                    </Box>
                  </Grid.Col>

                  <Grid.Col span={12} md={3}>
                    <Box className={classes.TickInfoBox}>
                      <ActionIcon
                        variant="transparent"
                        color="green"
                        radius={50}
                      >
                        <IconDiscountCheckFilled size="1.4rem" />
                      </ActionIcon>
                      <TextN1 ml={10}> Effortless Searching </TextN1>
                    </Box>
                  </Grid.Col>
                </Grid>
              </Grid.Col>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Divider color="#e1e1ea" mt={"10vh"} />
      <Box mt={"10vh"} w={"99%"} className={classes.footerBox}>
        <Grid w={"90%"}>
          <Grid.Col span={12}>
            <TextN1>Most Easy To Use 😍 </TextN1>
          </Grid.Col>
          <Grid.Col span={12}>
            <Carousel
              slideSize={isMobile ? "100%" : "80%"}
              slideGap={"md"}
              loop
              align="start"
              slidesToScroll={1}
              draggable={false}
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
            >
              <Carousel.Slide>
                <Box h={"100%"}>
                  <LazyLoadImage
                    alt="kotTickets"
                    src={data?.data?.target[0]?.photoURL}
                    height={"100%"}
                    width={"100%"}
                    radius={"10px 10px 10px 10px"}
                    fit="contain"
                    style={{
                      border: "1px solid #e0e0eb",
                      borderRadius: "10px",
                      padding: "10px",
                      boxShadow: "2px 2px 8px #b3b3cc",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Carousel.Slide>
              <Carousel.Slide>
                <Box h={"100%"}>
                  <LazyLoadImage
                    alt="kotTickets2"
                    src={data?.data?.target[1]?.photoURL}
                    height={"100%"}
                    width={"100%"}
                    radius={"10px 10px 10px 10px"}
                    style={{
                      border: "1px solid #e0e0eb",
                      borderRadius: "10px",
                      padding: "10px",
                      boxShadow: "2px 2px 8px #b3b3cc",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Carousel.Slide>
              <Carousel.Slide>
                <Box h={"100%"}>
                  <LazyLoadImage
                    alt="kotTickets3"
                    src={data?.data?.target[4]?.photoURL}
                    height={"100%"}
                    width={"100%"}
                    radius={"10px 10px 10px 10px"}
                    style={{
                      border: "1px solid #e0e0eb",
                      borderRadius: "10px",
                      padding: "10px",
                      boxShadow: "2px 2px 8px #b3b3cc",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Carousel.Slide>
            </Carousel>
          </Grid.Col>
        </Grid>
      </Box>

      <Grid
        w={"100%"}
        p={"20px 30px"}
        mt={"10vh"}
        className={classes.contactus_outerGrid}
        ref={contactus}
      >
        <Grid.Col span={12} md={8} className={classes.contactus_outerGridCol}>
          <Grid w={"100%"}>
            <Grid.Col
              span={12}
              md={4}
              className={classes.contactUs_firstSection}
            >
              <Grid w={"100%"}>
                <Grid.Col span={12} className={classes.contact_display}>
                  <TextN1 ml={2} className={classes.contactUDHeadingLeft}>
                    Cotact US
                  </TextN1>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Grid w={"100%"}>
                    <Grid.Col span={12} className={classes.contact_display}>
                      <ActionIcon
                        variant="transparent"
                        color="white"
                        radius={50}
                        mr={10}
                      >
                        <IconMail size="1.4rem" color="white" />
                      </ActionIcon>
                      <Box>
                        <TextN1 className={classes.contact_label}>Email</TextN1>
                        <TextN1>aysuhmishra5757@gmail.com</TextN1>
                      </Box>
                    </Grid.Col>

                    <Grid.Col span={12} className={classes.contact_display}>
                      <ActionIcon
                        variant="transparent"
                        color="white"
                        radius={50}
                        mr={10}
                        onClick={()=>{
                          window.location.href = `tel:+${phoneNumber}`;
                        }}
                      >
                        <IconPhoneCall size="1.4rem" color="white" />
                      </ActionIcon>
                      <Box>
                        <TextN1 className={classes.contact_label}>Phone</TextN1>
                        <TextN1>9589857573</TextN1>
                      </Box>
                    </Grid.Col>

                    <Grid.Col span={12} className={classes.contact_display}>
                      <ActionIcon
                        variant="transparent"
                        color="white"
                        radius={50}
                        mr={10}
                      >
                        <IconClock size="1.4rem" color="white" />
                      </ActionIcon>
                      <Box>
                        <TextN1 className={classes.contact_label}>
                          Service Available
                        </TextN1>
                        <TextN1>24 / 7 Available</TextN1>
                      </Box>
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              </Grid>
            </Grid.Col>
            <Grid.Col span={12} md={8}>
              <Formik
                initialValues={{
                  person_name: "",
                  phone: "",
                  city: "",
                  state: "",
                  message: "",
                }}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    if (
                      !values?.person_name ||
                      !values?.phone ||
                      !values?.city ||
                      !values?.state ||
                      !values?.message
                    ) {
                      shoeNotification("error", "Enter Full Information");
                      return;
                    }
                    await sendConsumerInfoForm.mutateAsync(values, {
                      onSuccess: (res) => {
                        shoeNotification("success", "Message Sent");
                        resetForm();
                      },
                    });
                  } catch (error) {
                    shoeNotification("error", "Somthing went wrong...");
                  }
                }}
                enableReinitialize
              >
                {({ values, handleChange, errors }) => (
                  <Form>
                    <Grid w={"100%"}>
                      <Grid.Col span={12} md={6}>
                        <TextInputViewNormal
                          id="person_name"
                          name="person_name"
                          label="Your Name"
                          placeholder="Enter Name"
                          onChange={handleChange}
                          value={values.person_name}
                        />
                      </Grid.Col>
                      <Grid.Col span={12} md={6}>
                        <TextInputViewNormal
                          id="phone"
                          type="number"
                          name="phone"
                          label="Phone"
                          placeholder="Enter Phone Number"
                          onChange={handleChange}
                          value={values.phone}
                        />
                      </Grid.Col>
                      <Grid.Col span={12} md={6}>
                        <TextInputViewNormal
                          id="city"
                          name="city"
                          label="City"
                          placeholder="Enter City"
                          onChange={handleChange}
                          value={values.city}
                        />
                      </Grid.Col>
                      <Grid.Col span={12} md={6}>
                        <TextInputViewNormal
                          id="state"
                          name="state"
                          label="State"
                          placeholder="Enter State"
                          onChange={handleChange}
                          value={values.state}
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <TextInputViewNormal
                          id="message"
                          name="message"
                          label="Message"
                          placeholder="Enter Your Message"
                          onChange={handleChange}
                          value={values.message}
                        />
                      </Grid.Col>
                      <Grid.Col span={12} className={classes.sendGrid}>
                        <PrimaryButton type="submit">Send</PrimaryButton>
                        <Box className={classes.sendGrid}>
                          <ActionIcon
                            variant="filled"
                            color="pink"
                            aria-label="Settings"
                            onClick={()=>{
                              window.open(
                                `whatsapp://send?phone=${
                                  phoneNumber
                                }&text=Hi`,
                              );
                            }}
                          >
                            <IconBrandWhatsapp
                              style={{ width: "70%", height: "70%" }}
                              stroke={1.5}
                            />
                          </ActionIcon>
                          <ActionIcon
                            variant="filled"
                            color="pink"
                            aria-label="Settings"
                            ml={"20px"}
                            onClick={()=>{
                              window.location.href = `tel:+${phoneNumber}`;
                            }}
                          >
                            <IconPhoneCall
                              style={{ width: "70%", height: "70%" }}
                              stroke={1.5}
                            />
                          </ActionIcon>
                        </Box>
                      </Grid.Col>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>

      <Divider color="#e1e1ea" mt={"5vh"} />
      <Box mt={"5vh"} w={"99%"} className={classes.footerBox}>
        <Grid w={"80%"}>
          <Grid.Col span={12} md={3} className={classes.logoGrid}>
            <Box w={"50%"}>
              <LazyLoadImage
                alt="logo"
                width={"100%"}
                src={KartLogo}
                style={{ objectFit: "cover",borderRadius:'100%' }}
              />
            </Box>
          </Grid.Col>
          <Grid.Col span={12} md={3}>
            <TextN1 className={classes.footerHeading}> POS </TextN1>
            <TextN1 className={classes.footerPoints}> Billing </TextN1>
            <TextN1 className={classes.footerPoints}> Menu </TextN1>
            <TextN1 className={classes.footerPoints}> Inventory </TextN1>
            <TextN1 className={classes.footerPoints}>
              {" "}
              Table Ordering With Mobile{" "}
            </TextN1>
            <TextN1 className={classes.footerPoints}>
              {" "}
              ETC Call Us For More Information let's Build Our Friendship 🥰
            </TextN1>
          </Grid.Col>

          <Grid.Col span={12} md={3}>
            <TextN1 className={classes.footerHeading}> Requirement </TextN1>
            <TextN1 className={classes.footerPoints}>
              {" "}
              Latpot PC , Mobile{" "}
            </TextN1>
            <TextN1 className={classes.footerPoints}>
              {" "}
              Internet Connection{" "}
            </TextN1>
            <TextN1 className={classes.footerPoints}>
              {" "}
              Phone Number Registration{" "}
            </TextN1>
          </Grid.Col>

          <Grid.Col span={12} md={3}>
            <TextN1 className={classes.footerHeading}> Support </TextN1>
            <TextN1 className={classes.footerPoints}>
              {" "}
              24/7 Office Support{" "}
            </TextN1>
            <TextN1 className={classes.footerPoints}> WathsApp Support </TextN1>
            <TextN1 className={classes.footerPoints}> Call Support </TextN1>
            <TextN1 className={classes.footerPoints}>
              {" "}
              Online Video Call Support{" "}
            </TextN1>
          </Grid.Col>
        </Grid>
      </Box>
      <Divider color="#e1e1ea" mt={"5vh"} />
      <Box
        w={"100%"}
        p={"20px 40px 20px 40px"}
        className={classes.afterfooterBox}
      >
        <Grid w={"90%"}>
          <Grid.Col span={12} md={4}>
            <TextN1 className={classes.afterfooterPoints}>
              More Then Just POS Software
            </TextN1>
          </Grid.Col>
          <Grid.Col
            span={12}
            md={4}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <TextN1 className={classes.afterfooterPoints}>
              We're here for you 24/7.Customer Care -{" "}
              <span
                style={{
                  color: "orangered",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                }}
              >
                9589857573
              </span>{" "}
              , Feel free to call anytime, and our dedicated team will be
              available to assist you. Your satisfaction is our priority.
            </TextN1>
          </Grid.Col>
          <Grid.Col span={12} md={4} className={classes.logoBox}>
            <ActionIcon variant="filled" color="pink" aria-label="Settings" onClick={()=>{
               window.open(
                `whatsapp://send?phone=${
                  phoneNumber
                }&text=Hi`,
              );
            }}>
              <IconBrandWhatsapp
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              color="pink"
              aria-label="Settings"
              ml={"20px"}
              onClick={()=>{
                window.location.href = `tel:+${phoneNumber}`;
              }}
              
            >
              <IconPhoneCall
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </Grid.Col>
        </Grid>
      </Box>

      <Modal
        opened={LoginBtn}
        onClose={() => setLoginBtn(false)}
        title="Authentication"
        size={"sm"}
        className={classes.modelSection}
        centered
        transitionProps={{ transition: "rotate-left", duration: 100 }}
      >
        <TextN1 className={classes.titletext} mb={5}> Login OR Create Shop </TextN1>
        <Box className={classes.showMenuPopBox}>
          <PrimaryButton
            color="green"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login Shop
          </PrimaryButton>
          <PrimaryButton
            onClick={() => {
              navigate("/signup");
            }}
          >
            Create Shop
          </PrimaryButton>
        </Box>
        <Divider color="#d0d0e1" mt={5} mb={5} />
        <TextN1 className={classes.titletext} mb={5}> Waiter Login </TextN1>
        <PrimaryButton
          color="orange"
          onClick={() => {
            navigate("/loginwaiter");
          }}
        >
          Login Waiter
        </PrimaryButton>
        <Divider color="#d0d0e1" mt={5} mb={5} />
        <TextN1 className={classes.titletext} mb={5}> KOT Login </TextN1>
        <PrimaryButton
          color="teal"
          onClick={() => {
            navigate("/kotlogin");
          }}
        >
          Login KOT
        </PrimaryButton>
      </Modal>
    </>
  );
};

export default HomePage;
