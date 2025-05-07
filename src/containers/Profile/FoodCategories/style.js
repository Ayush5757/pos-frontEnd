import { createStyles, rem } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  Wrap: {
    padding: "10px",
  },
  create: {
    marginTop: "10px",
    // backgroundColor:'yellow'
  },
  paper: {
    width: "100%",
    height: "100%",
    padding: "10px",
    display: "flex",
    textAlign:'center',
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${theme.colors.most_light_gray}`,
    fontWeight: "bold",
    color: theme.colors.light_black,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#adad85",
      color: "#ffffff",
    },
  },
  delete:{
   "&:hover": {
      color: "red",
    },
  },
  cancel:{
    textAlign:'end'
  },
}));
