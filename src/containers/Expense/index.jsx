import {
  ActionIcon,
  Box,
  Button,
  Grid,
  Loader,
  LoadingOverlay,
  ScrollArea,
  Select,
} from "@mantine/core";
import React, { useState } from "react";
import { TextInputView } from "../../components/Inputs";
import SelectInputView from "../../components/Inputs/select";
import { TextN1 } from "../../components/Text";
import { createStyles, rem } from "@mantine/core";
import { Form, Formik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import { add_expense_API, getexpensesDatabyName, } from "../../services/api/expenes";
import { shoeNotification } from "../../components/Notify";
import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { getYear_by_date } from "../../utils/constFunction";
import { debounce } from "lodash";

const useStyles = createStyles((theme) => ({
  expenseItem: {
    fontSize: "12px",
    padding: "3px",
    backgroundColor: "#ebebe0",
    "&:hover": {
      backgroundColor: "#d7d7c1",
      cursor: "pointer",
    },
  },
  noExpense: {
    fontSize: "12px",
    color: theme.colors.light_gray,
    paddingLeft: '10px'
  },
  expenseList: {
    color: '#000099',
    borderBottom: '1px solid blue',
    cursor: 'pointer',
    '&:hover': {
      color: '#4d4dff'
    }
  },
  select_grid:{
    '.mantine-Input-input':{
      border:'none',
      borderBottom:'1px solid gray',
      borderRadius:'0'
    }
  }

}));


const Expense = ({ setExpensisPopUp }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [expSearch, setexpSearch] = useState("");

  const { data } = useQuery({
    queryKey: ["getexpensesDatabyName", expSearch],
    queryFn: () =>
      getexpensesDatabyName({
        shopID: localStorage.getItem("shop_user_id"),
        expName: expSearch,
      }),
    enabled: expSearch !== "",
    onSuccess: (res) => {
      setSearchLoading(false);
    },
  });

  const add_expense = useMutation({
    mutationFn: (newVal) => add_expense_API(newVal),
  });

  const debouncedHandlerSearchExpance = debounce((value) => {
    setSearchLoading(true);
    setexpSearch(value)
  }, 1000);
  return (
    <Box style={{ maxHeight: "90vh", width: "100%" }}>
      <Formik
        initialValues={{}}
        onSubmit={async (values) => {
          let temp = {
            shopID: localStorage.getItem("shop_user_id"),
            month: (new Date()).getMonth() + 1,
            year: getYear_by_date(new Date()),
            expense_list: [
              {
                ex_name: values?.ex_name,
                ex_type: values?.ex_type,
                qty: values?.qty,
                price: values?.price,
              }
            ]
          }
          setIsLoading(true);
          try {
            await add_expense.mutateAsync(temp, {
              onSuccess: (res) => {
                setIsLoading(false);
                setExpensisPopUp(false);
                shoeNotification("success", "Expense Added to Store");
              }
            });
          } catch (error) {
            shoeNotification("error", "Failed Expense");
          }
        }}
        enableReinitialize
      >
        {({ values, setFieldValue, handleChange, errors }) => (
          <Form>
            <Grid gutter={0}>
              <Grid.Col span={12} mt={5} pt={10}>
                <TextInputView
                  onChange={(e) => {
                    debouncedHandlerSearchExpance(e.target.value);
                  }}
                  placeholder={"Search Expenses If Required"}
                  value={values.searchName}
                  icon={
                    <ActionIcon>
                      <IconSearch color={"gray"} />
                    </ActionIcon>
                  }
                />
              </Grid.Col>
              {expSearch && (
                <Grid.Col span={12} pt={10}>
                  {searchLoading ? (
                    <Box style={{ textAlign: 'center' }}>
                      <Loader visible={true} />
                    </Box>
                  ) : (
                    <>
                      {data?.data?.target !== null ?
                        <ScrollArea mih={'5vh'} mah={"15vh"} style={{ width: "100%" }}>
                          <Grid gutter={5}>
                            {data?.data?.target?.expense_list?.map((res) => (
                              <>
                                <Grid.Col span={6} onClick={() => {
                                  setFieldValue('ex_name', res?.ex_name)
                                  setFieldValue('ex_type', res?.ex_type+'')
                                }}>
                                  <TextN1 className={classes.expenseItem} style={{ textAlign: 'center' }}>
                                    {res?.ex_name}
                                  </TextN1>
                                </Grid.Col>
                              </>
                            ))}
                          </Grid>
                        </ScrollArea>
                        : <TextN1 className={classes.noExpense}>
                          No Expenses Found
                        </TextN1>}
                    </>
                  )}
                </Grid.Col>
              )}

              <Grid.Col span={12} mt={10}>
                <TextInputView
                  id={"ex_name"}
                  name={"ex_name"}
                  label={"Expense Name"}
                  onChange={handleChange}
                  placeholder={"Enter Name"}
                  value={values.ex_name}
                />
              </Grid.Col>
              <Grid.Col span={12} mt={10} className={classes.select_grid}>
                <Select
                  id={"ex_type"}
                  name={"ex_type"}
                  label="Type"
                  placeholder="Pick one"
                  onChange={(value) => {
                    setFieldValue("ex_type", value);
                  }}
                  data={[
                    {  label: "KG" ,value: '1' },
                    { label: "Liter", value: '2' },
                    { label: "Pic", value: '3' },
                  ]}
                  value={values.ex_type}
                  />
              </Grid.Col>
              <Grid.Col span={12} mt={10}>
                <TextInputView
                  id={"qty"}
                  name={"qty"}
                  label={"Qty"}
                  type={"number"}
                  onChange={handleChange}
                  placeholder={"Enter Qty"}
                  value={values.qty}
                />
              </Grid.Col>
              <Grid.Col span={12} mt={10}>
                <TextInputView
                  id={"price"}
                  name={"price"}
                  label={"Price of (1) Qty"}
                  type={"number"}
                  onChange={handleChange}
                  placeholder={"Price"}
                  value={values.price}
                />
              </Grid.Col>
              <Grid.Col span={6} mt={10}>
                <Button
                  variant="gradient"
                  gradient={{ from: "#3333ff", to: "#000000", deg: 105 }}
                  mt={15}
                  type="submit"
                >
                  Save Expense
                </Button>
              </Grid.Col>
              <Grid.Col span={6} mt={30} style={{ textAlign: 'end' }}>
                <span className={classes.expenseList} onClick={() => {
                  setExpensisPopUp(false);
                  navigate("/shop-monthly-expanse-list");
                }}>Expence List</span>
              </Grid.Col>
            </Grid>
          </Form>
        )}
      </Formik>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
    </Box>
  );
};

export default Expense;
