import { Box, Grid, Paper } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useStyles } from "./style";
import { MonthPickerInput } from "@mantine/dates";
const BarChart = ({
  data,
  setDate
}) => {
  const { classes } = useStyles();
  useEffect(()=>{
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1; // Adding 1 to make it human-readable
    const year = dateObj.getFullYear();
    setDate({month,year})
  },[])

  const newst = {
    series: [data?.sales??0, data?.expenses??0],
    options: {
      labels: ["Sales", "Expenses"],
      colors: ["#00b359", "#FF5733"],
      chart: {
        width: 380,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: true,
      },
      fill: {
        type: "gradient",
      },
      legend: false,
      tooltip: {
        y: {
          formatter: function (val) {
            return `Rs ${val} ₹`;
          },
        },
      },
    },
  };
  return (
    <Box>
      <Paper mt={10} shadow="xl">
        <Grid gutter={5}>
          <Grid.Col span={12} md={9} className={classes.chartGrid}>
            <Chart
              options={newst.options}
              series={newst.series}
              type="donut"
              style={{ width: "100%" }}
              height={320}
            />
          </Grid.Col>
          <Grid.Col  span={12} sm={5} md={3} p={10} className={classes.chartGrid}>
          <MonthPickerInput
            w={'100%'}
            label="Pick Month"
            placeholder="Pick Month"
            onChange={(val)=>{
              const date = new Date(val);
              const month = date.getMonth() + 1;
              const year = date.getFullYear();
              setDate({month,year});
            }}
          />
          </Grid.Col>
        </Grid>
      </Paper>
    </Box>
  );
};

export default BarChart;
