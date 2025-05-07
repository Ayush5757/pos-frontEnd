import { createStyles, rem } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  heading: {
    color: "#50507c",
    fontSize: "14px",
  },
  phone_grid: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  grid_box: {
    backgroundColor: "#79d2a6",
    borderRadius: "5px",
  },
  table_heading:{
    fontSize:'14px'
  },
  table_heading2:{
    fontSize:'14px',
    display:'flex',
    justifyContent:'flex-end',
  },
  table_val:{
    fontSize:'12px',
  },
  table_val2:{
    fontSize:'12px',
    display:'flex',
    justifyContent:'flex-end',
  },
  grid_total:{
    display:'flex',
    justifyContent:'flex-end',
  },
  completeOrder_Grid:{
    display:'flex',
    justifyContent:'flex-end'
  }
}));
