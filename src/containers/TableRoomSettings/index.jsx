import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteTableAPI, getTableAPI } from "../../services/api/tables";
import { ActionIcon, Box, Divider, Grid, LoadingOverlay, Modal } from "@mantine/core";
import { TextN1 } from "../../components/Text";
import { useStyles } from "./tablestyle";
import { IconAdjustments } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { PrimaryButton } from "../../components/Buttons";
import { shoeNotification } from "../../components/Notify";

const TableRoomSettings = () => {
  const { classes } = useStyles();
  const [selectedTable, setSelectedTable] = useState(null);
  const { data, refetch, isFetching} = useQuery({
    queryKey: ["getTableAPI", localStorage.getItem("shop_user_id")],
    queryFn: () =>
      getTableAPI({
        shopID: localStorage.getItem("shop_user_id"),
      }),
  });

  const deleteTable = useMutation({
    mutationFn: (newVal) => deleteTableAPI(newVal),
  });
  return (
    <Box>
      <Grid>
        <Grid.Col span={12}>
          {data?.data?.target?.map((sectionData) => {
            return (
              <Grid>
                <Grid.Col span={12}>
                  <TextN1 className={classes.sectionHead} ml={10} mt={10}>
                    {sectionData?.table_type}
                  </TextN1>
                </Grid.Col>
                <>
                  {sectionData?.table_data?.map((val) => (
                    <Grid.Col span={1} className={classes.TableGrid}>
                      <Box
                        className={classes.TableBox}
                        style={{
                          backgroundColor:
                            val?.orderID || val?.total
                              ? "#99ff99"
                              : val?.workingTable
                              ? "#ccccb3"
                              : "red",
                        }}
                      >
                        <TextN1 className={classes.Tableprice}>
                          {val?.name}
                        </TextN1>
                      
                      </Box>
                      <ActionIcon
                        variant="filled"
                        color={val?.workingTable ? "red" : "green"}
                        size="sm"
                        aria-label="Settings"
                        className={classes.workingTable}
                        onClick={async () => {
                          if(val?.orderID){
                            shoeNotification("error", "First Complete The Table Order");
                          }else{

                            let temp = {
                              tableID: val?._id,
                              table_type_id: sectionData?.table_type_id,
                            };
                            setSelectedTable(temp);
                          }
                        }}
                      >
                        <IconTrash
                          style={{ width: "90%", height: "90%" }}
                          stroke={1.7}
                        />
                      </ActionIcon>
                    </Grid.Col>
                  ))}
                </>
                <Divider variant="dashed" mt={20} />
              </Grid>
            );
          })}
        </Grid.Col>
      </Grid>

      <Modal
        opened={selectedTable}
        onClose={() => {
          setSelectedTable(null);
        }}
        title="Food Categories"
        size={"md"}
        centered
        transitionProps={{ transition: "rotate-left", duration: 800 }}
      >
        <TextN1> Are You Sure You Want To Delete This Table </TextN1>
        <Box className={classes.btnBox} mt={10}>
          <PrimaryButton onClick={() => setSelectedTable(null)}>
            Cancel
          </PrimaryButton>
          <PrimaryButton
            onClick={async () => {
              try {
                await deleteTable.mutateAsync(selectedTable, {
                  onSuccess: () => {
                    setSelectedTable(null);
                    refetch();
                    shoeNotification("success", "Table Deleted");
                  },
                });
              } catch (error) {
                setSelectedTable(null);
                shoeNotification("error","Can't Delete This Table");
              }
            }}
          >
            Confirm
          </PrimaryButton>
        </Box>
      </Modal>
      <LoadingOverlay visible={isFetching}/>
    </Box>
  );
};

export default TableRoomSettings;
