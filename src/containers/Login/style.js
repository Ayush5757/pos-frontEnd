import { createStyles, rem } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "100vh",
    backgroundSize: "cover",
    // backgroundImage:"url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
    '.mantine-ftmntk':{
      paddingTop:'5%' 
    },
  },

    formWrap: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: "100vh",
    maxWidth: rem(450),
    paddingTop: rem(500),

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

}));
