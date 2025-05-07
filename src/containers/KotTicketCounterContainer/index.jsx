import { ActionIcon, Badge, Box, Divider, Grid, Paper } from "@mantine/core";
import React from "react";
import { useStyles } from "./style";
import { TextN1 } from "../../components/Text";
import { useQuery } from "@tanstack/react-query";
import {
  getKotData,
} from "../../services/api/kot";
import { IconDiscountCheckFilled } from "@tabler/icons-react";
import { PrimaryButton } from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { shoeNotification } from "../../components/Notify";

const KotTicketCounterContainer = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();

  const { data } = useQuery({
    queryKey: ["getKotData", localStorage.getItem("kot_access_token")],
    queryFn: () => getKotData(localStorage.getItem("kot_access_token")),
  });

  return (
    <Box className={classes.OuterBox}>
      <Box className={classes.innerBox}>
        <Box className={classes.logOutBox}>
        <PrimaryButton onClick={()=>{
            shoeNotification('success','KOT Started')
          }}> Start </PrimaryButton>
          <PrimaryButton onClick={()=>{
              localStorage.removeItem('shopID')
              localStorage.removeItem('kot_access_token')
              navigate('/kotLogin')
          }}> Log Out </PrimaryButton>
        </Box>
        <Grid gutter={15} mt={5}>
          {data?.data?.target?.KotOrderdData?.length >= 0 && (
            <Grid.Col span={12}>
              <Paper
                shadow="xl"
                radius="md"
                p="sm"
                w={"100%"}
                className={classes.paperTable}
              >
                <TextN1>Table Kitchen Order Ticket</TextN1>
              </Paper>
            </Grid.Col>
          )}

          {data?.data?.target?.KotOrderdData?.length !== 0 ? (
            data?.data?.target?.KotOrderdData?.map((val) => {
              return (
                <Grid.Col span={12} md={4} className={classes.ticketGrid}>
                  <Grid gutter={0}>
                    <Grid.Col className={classes.heading_table}>
                      <Paper
                        shadow="xl"
                        radius="md"
                        p="sm"
                        w={"100%"}
                        className={classes.paper}
                        classNames={classes.paper_box}
                      >
                        <Grid gutter={0}>
                          <Grid.Col span={5}>
                            <Badge
                              size="lg"
                              variant="gradient"
                              gradient={{ from: "blue", to: "blue", deg: 360 }}
                              radius="md"
                            >
                              Table No - {val?.table?.table_name}
                            </Badge>
                          </Grid.Col>
                        </Grid>

                        <Grid gutter={0} mt={0} p={"sm"}>
                          <Grid.Col span={8}>
                            <TextN1> Item Name</TextN1>
                          </Grid.Col>
                          <Grid.Col span={2}>
                            <TextN1> QTY </TextN1>
                          </Grid.Col>
                          <Grid.Col span={2}>
                            <TextN1> Delivered </TextN1>
                          </Grid.Col>
                          {val?.inventories?.map((item) => {
                            return (
                              <>
                                <Grid.Col span={8}>
                                  <Divider my="sm" variant="dashed" />
                                  <TextN1> {item?.item_name} </TextN1>
                                </Grid.Col>
                                <Grid.Col span={2}>
                                  <Divider my="sm" variant="dashed" />
                                  <TextN1> {item?.qty} </TextN1>
                                </Grid.Col>
                                <Grid.Col span={2}>
                                  <Divider my="sm" variant="dashed" />
                                  {item?.isDelivered ? (
                                    <ActionIcon
                                      variant="transparent"
                                      color="blue"
                                    >
                                      <IconDiscountCheckFilled />
                                    </ActionIcon>
                                  ) : (
                                    <TextN1 className={classes.pending}>
                                      Pending
                                    </TextN1>
                                  )}
                                </Grid.Col>
                              </>
                            );
                          })}

                       
                          {val?.note && (
                            <Grid.Col span={12} mt={5}>
                              <Box className={classes.note_box} p={5} pl={10}>
                                <TextN1 className={classes.note}>
                                  {" "}
                                  {val?.note}{" "}
                                </TextN1>
                              </Box>
                            </Grid.Col>
                          )}
                        </Grid>
                      </Paper>
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              );
            })
          ) : (
            <TextN1 ml={20} className={classes.noDataFound}>
              No Data Found
            </TextN1>
          )}

          {data?.data?.target?.fastKotOrderdData?.length >= 0 && (
            <Grid.Col span={12}>
              <Paper
                shadow="xl"
                radius="md"
                p="sm"
                w={"100%"}
                className={classes.paperTable2}
              >
                <TextN1>Fast Kitchen Order Ticket</TextN1>
              </Paper>
            </Grid.Col>
          )}
          {data?.data?.target?.fastKotOrderdData?.length !== 0 ? (
            data?.data?.target?.fastKotOrderdData?.map((val) => {
              return (
                <Grid.Col span={12} md={4} className={classes.ticketGrid}>
                  <Grid gutter={0}>
                    <Grid.Col className={classes.heading_table}>
                      <Paper
                        shadow="xl"
                        radius="md"
                        p="sm"
                        w={"100%"}
                        className={classes.paper}
                        classNames={classes.paper_box}
                      >
                        <Grid gutter={0}>
                          <Grid.Col span={5}>
                            <Badge
                              size="lg"
                              variant="gradient"
                              gradient={{ from: "blue", to: "blue", deg: 360 }}
                              radius="md"
                            >
                              Fast Order
                            </Badge>
                          </Grid.Col>
                        
                        </Grid>

                        <Grid gutter={0} mt={0} p={"sm"}>
                          <Grid.Col span={8}>
                            <TextN1> Item Name</TextN1>
                          </Grid.Col>
                          <Grid.Col span={2}>
                            <TextN1> QTY </TextN1>
                          </Grid.Col>
                          <Grid.Col span={2}>
                            <TextN1> Delivered </TextN1>
                          </Grid.Col>
                          {val?.inventories?.map((item) => {
                            return (
                              <>
                                <Grid.Col span={8}>
                                  <Divider my="sm" variant="dashed" />
                                  <TextN1> {item?.item_name} </TextN1>
                                </Grid.Col>
                                <Grid.Col span={2}>
                                  <Divider my="sm" variant="dashed" />
                                  <TextN1> {item?.qty} </TextN1>
                                </Grid.Col>
                                <Grid.Col span={2}>
                                  <Divider my="sm" variant="dashed" />
                                  {item?.isDelivered ? (
                                    <ActionIcon
                                      variant="transparent"
                                      color="blue"
                                    >
                                      <IconDiscountCheckFilled />
                                    </ActionIcon>
                                  ) : (
                                    <TextN1 className={classes.pending}>
                                      Pending
                                    </TextN1>
                                  )}
                                </Grid.Col>
                              </>
                            );
                          })}

                         
                          {val?.note && (
                            <Grid.Col span={12} mt={5}>
                              <Box className={classes.note_box} p={5} pl={10}>
                                <TextN1 className={classes.note}>
                                  {" "}
                                  {val?.note}{" "}
                                </TextN1>
                              </Box>
                            </Grid.Col>
                          )}
                        </Grid>
                      </Paper>
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              );
            })
          ) : (
            <TextN1 ml={20} className={classes.noDataFound}>
              No Data Found
            </TextN1>
          )}

          {data?.data?.target?.roomKotOrderdData?.length >= 0 && (
            <Grid.Col span={12}>
              <Paper
                shadow="xl"
                radius="md"
                p="sm"
                w={"100%"}
                className={classes.paperRoom}
              >
                <TextN1>Room Kitchen Order Ticket</TextN1>
              </Paper>
            </Grid.Col>
          )}

          {data?.data?.target?.roomKotOrderdData?.length !== 0 ? (
            data?.data?.target?.roomKotOrderdData?.map((val) => {
              return (
                <Grid.Col span={12} md={4} className={classes.ticketGrid}>
                  <Grid gutter={0}>
                    <Grid.Col className={classes.heading_table}>
                      <Paper
                        shadow="xl"
                        radius="md"
                        p="sm"
                        w={"100%"}
                        className={classes.paper}
                        bg={val?.order_status !== 1 && "#99ff99"}
                        classNames={classes.paper_box}
                      >
                        <Grid gutter={0}>
                          <Grid.Col span={5}>
                            <Badge
                              size="lg"
                              variant="gradient"
                              gradient={{ from: "blue", to: "blue", deg: 360 }}
                              radius="md"
                            >
                              Room No - {val?.room?.room_name}
                            </Badge>
                          </Grid.Col>
                         
                        </Grid>

                        <Grid gutter={0} mt={0} p={"sm"}>
                          <Grid.Col span={8}>
                            <TextN1> Item Name</TextN1>
                          </Grid.Col>
                          <Grid.Col span={2}>
                            <TextN1> QTY </TextN1>
                          </Grid.Col>
                          <Grid.Col span={2}>
                            <TextN1> Delivered </TextN1>
                          </Grid.Col>
                          {val?.inventories?.map((item) => {
                            return (
                              <>
                                <Grid.Col span={8}>
                                  <Divider my="sm" variant="dashed" />
                                  <TextN1> {item?.item_name} </TextN1>
                                </Grid.Col>
                                <Grid.Col span={2}>
                                  <Divider my="sm" variant="dashed" />
                                  <TextN1> {item?.qty} </TextN1>
                                </Grid.Col>

                                <Grid.Col span={2}>
                                  <Divider my="sm" variant="dashed" />
                                  {item?.isDelivered ? (
                                    <ActionIcon
                                      variant="transparent"
                                      color="blue"
                                    >
                                      <IconDiscountCheckFilled />
                                    </ActionIcon>
                                  ) : (
                                    <TextN1 className={classes.pending}>
                                      Pending
                                    </TextN1>
                                  )}
                                </Grid.Col>
                              </>
                            );
                          })}

                         
                          {val?.note && (
                            <Grid.Col span={12} mt={5}>
                              <Box className={classes.note_box} p={5} pl={10}>
                                <TextN1 className={classes.note}>
                                  {" "}
                                  {val?.note}{" "}
                                </TextN1>
                              </Box>
                            </Grid.Col>
                          )}
                        </Grid>
                      </Paper>
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              );
            })
          ) : (
            <TextN1 ml={20} className={classes.noDataFound}>
              No Data Found
            </TextN1>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default KotTicketCounterContainer;
