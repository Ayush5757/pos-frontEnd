import {
  Box,
  Checkbox,
  Grid,
  Group,
  LoadingOverlay,
  Paper,
  Switch,
  Tabs,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import BarChart from "../../components/Chart/BarChart";
import ExpenseTable from "./ExpenseTable";

import { useQuery } from "@tanstack/react-query";
import { getExpandSalesTotal } from "../../services/api/dashboard";
import { TextN1 } from "../../components/Text";
import { PrimaryButton } from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [isIncludeStaffSal, setisIncludeStaffSal] = useState(1);
  const monthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const { data, refetch, isFetching } = useQuery({
    queryKey: ["getExpandSalesTotal"],
    queryFn: () =>
      getExpandSalesTotal(
        date?.month,
        date?.year,
        new Date(),
        isIncludeStaffSal
      ),
    enabled: date ? true : false,
  });

  useEffect(() => {
    if (date) {
      refetch();
    }
  }, [date, isIncludeStaffSal]);

  return (
    <Grid gutter={10}>
      <Grid.Col span={12}>
        <TextN1 className={classes.dashboardheading}> Sales & Expenses</TextN1>
      </Grid.Col>
      {date && (
        <Grid.Col span={12}>
          <TextN1 className={classes.dashboardheadingdate}>
            Date - {monthNames[date?.month]} / {date?.year}
          </TextN1>
        </Grid.Col>
      )}
      <Grid.Col span={12}>
        <BarChart
          data={{
            sales: data?.data?.target?.sales,
            expenses: data?.data?.target?.expenses,
          }}
          date={date}
          setDate={setDate}
        />
      </Grid.Col>
      <Grid.Col span={12} mt={10}>
        <TextN1>Month Details</TextN1>
      </Grid.Col>
      <Grid.Col span={12} md={3}>
        <Paper
          withBorder
          p="md"
          shadow="xl"
          radius="md"
          mt={10}
          className={classes.salesandexpPaper}
          onClick={()=>navigate('/shop-order-list')}
        >
          <Group justify="apart">
            <Box>
              <TextN1
                c="dimmed"
                tt="uppercase"
                fw={700}
                fz="xs"
                className={classes.label}
              >
                Total Sales
              </TextN1>
              <TextN1 fw={700} fz="xl" c={"green"}>
                {data?.data?.target?.sales} ₹
              </TextN1>
            </Box>
          </Group>
          <TextN1 c="dimmed" fz="sm" mt="md">
            <TextN1 component="span" c={"green"} fw={700}>
              Visit Sales
            </TextN1>{" "}
            here
          </TextN1>
        </Paper>
      </Grid.Col>

      <Grid.Col span={12} md={3}>
        <Paper
          withBorder
          p="md"
          shadow="xl"
          radius="md"
          mt={10}
          className={classes.salesandexpPaper}
          onClick={()=>navigate('/shop-monthly-expanse-list')}
        >
          <Group justify="apart">
            <Box>
              <TextN1
                c="dimmed"
                tt="uppercase"
                fw={700}
                fz="xs"
                className={classes.label}
              >
                Total Expenses
              </TextN1>
              <TextN1 fw={700} fz="xl" c={"red"}>
                {data?.data?.target?.expenses} ₹
              </TextN1>
            </Box>
          </Group>
          <TextN1 c="dimmed" fz="sm" mt="md">
            <TextN1 component="span" c={"red"} fw={700}>
              Visit Expenses
            </TextN1>{" "}
            here
          </TextN1>
        </Paper>
      </Grid.Col>

      <Grid.Col span={12} md={3}>
        <Paper
          withBorder
          p="md"
          shadow="xl"
          radius="md"
          mt={10}
          className={classes.salesandexpPaper}
          onClick={()=>navigate('/shop-order-list')}
        >
          <Group justify="apart">
            <Box>
              <TextN1
                c="dimmed"
                tt="uppercase"
                fw={700}
                fz="xs"
                className={classes.label}
              >
                {(data?.data?.target?.sales - data?.data?.target?.expenses)>=0?'Total Profit':'Total Loss'}
              </TextN1>
              <TextN1
                fw={700}
                fz="xl"
                c={
                  data?.data?.target?.sales - data?.data?.target?.expenses > 0
                    ? "green"
                    : "red"
                }
              >
                {data?.data?.target?.sales - data?.data?.target?.expenses} ₹
              </TextN1>
            </Box>
          </Group>
          <TextN1 c="dimmed" fz="sm" mt="md">
            <TextN1
              component="span"
              c={
                data?.data?.target?.sales - data?.data?.target?.expenses > 0
                  ? "green"
                  : "red"
              }
              fw={700}
            >
              {data?.data?.target?.sales - data?.data?.target?.expenses > 0
                ? "Month Profit"
                : "Month Lose"}{" "}
              {monthNames[date?.month]} / {date?.year}
            </TextN1>
          </TextN1>
        </Paper>
      </Grid.Col>
      <Grid.Col span={12} mt={10}>
        <TextN1>Including Staff</TextN1>
      </Grid.Col>
      <Grid.Col span={12} md={3}>
        <Paper
          withBorder
          p="md"
          shadow="xl"
          radius="md"
          mt={3}
          className={classes.salesandexpPaper}
          onClick={()=>navigate('/shop-monthly-expanse-list')}
        >
          <Group justify="apart">
            <Box>
              <TextN1
                c="dimmed"
                tt="uppercase"
                fw={700}
                fz="xs"
                className={classes.label}
              >
                Total Expenses + Staff Salary
              </TextN1>
              <TextN1 fw={700} fz="xl" c={"red"}>
                {(data?.data?.target?.staffresult ?? 0) +(data?.data?.target?.expenses ?? 0)} ₹
              </TextN1>
            </Box>
          </Group>
          <TextN1 c="dimmed" fz="sm" mt="md">
            <TextN1 component="span" c={"red"} fw={700}>
              Visit Expenses
            </TextN1>{" "}
            here
          </TextN1>
        </Paper>
      </Grid.Col>

      <Grid.Col span={12} md={3}>
        <Paper
          withBorder
          p="md"
          shadow="xl"
          radius="md"
          mt={3}
          className={classes.salesandexpPaper}
          onClick={()=>navigate('/shop-order-list')}
        >
          <Group justify="apart">
            <Box>
              <TextN1
                c="dimmed"
                tt="uppercase"
                fw={700}
                fz="xs"
                className={classes.label}
              >
                {data?.data?.target?.sales -
                    ((data?.data?.target?.expenses ?? 0) +
                      (data?.data?.target?.staffresult ?? 0)) >=
                  0?'Total Profit Including Staff Salary':'Total Loss Including Staff Salary'}
              </TextN1>
              <TextN1
                fw={700}
                fz="xl"
                c={
                  data?.data?.target?.sales -
                    ((data?.data?.target?.expenses ?? 0) +
                      (data?.data?.target?.staffresult ?? 0)) >
                  0
                    ? "green"
                    : "red"
                }
              >
                {data?.data?.target?.sales -
                  ((data?.data?.target?.expenses ?? 0) +
                    (data?.data?.target?.staffresult??0))}{" "}
                ₹
              </TextN1>
            </Box>
          </Group>
          <TextN1 c="dimmed" fz="sm" mt="md">
            <TextN1
              component="span"
              c={
                data?.data?.target?.sales -
                  (data?.data?.target?.expenses +
                    data?.data?.target?.staffresult) >
                0
                  ? "green"
                  : "red"
              }
              fw={700}
            >
              {data?.data?.target?.sales -
                (data?.data?.target?.expenses +
                  data?.data?.target?.staffresult) >
              0
                ? "Month Profit"
                : "Month Lose"}{" "}
              {monthNames[date?.month]} / {date?.year}
            </TextN1>
          </TextN1>
        </Paper>
      </Grid.Col>
      <LoadingOverlay visible={isFetching} />
    </Grid>
  );
};

export default Dashboard;
