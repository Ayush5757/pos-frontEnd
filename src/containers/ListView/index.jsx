import React from "react";
import { ImageIconsImports } from "../../ImageIconsImports";
import { CustomeListView } from "../../components/List";
import { useStyles } from "./style";
import { Box } from "@mantine/core";
const ListView = () => {
  const { classes } = useStyles();
  const listData = () => {
    return [
      {
        id:'1',
        //   title: "User Name",
        description: "Retails Shops",
        icon: ImageIconsImports.IconUserCircle,
      },
      {
        id:'2',
        //   title: "User Name",
        description: "All Slots",
        icon: ImageIconsImports.IconUserCircle,
      },
      {
        id:'3',
        //   title: "User Name",
        description: "Gate Keeper",
        icon: ImageIconsImports.IconUserCircle,
      },
      {
        id:'4',
        //   title: "User Name",
        description: "Andha Kanoon",
        icon: ImageIconsImports.IconUserCircle,
      },
      {
        id:'5',
        //   title: "User Name",
        description: "Phone Ga",
        icon: ImageIconsImports.IconUserCircle,
      },
      // { title: "Phone", description: props?.mobileNumber?? '--' , icon: ImageIconsImports.IconPhone },
      // {
      //   title: "Whatsapp Phone",
      //   description: props?.wathsappNumber??'--',
      //   icon: ImageIconsImports.IconPhone,
      // },
      // { title: "Gender", description: props?.gender??'--', icon: ImageIconsImports.IconFriends },
      // { title: "Email", description: props?.email??'--', icon: ImageIconsImports.IconAt },
      // {
      //   title: "Other",
      //   description: props?.others??'--',
      //   icon: ImageIconsImports.IconArticleFilledFilled,
      // },
    ];
  };

  return (
    <Box className={classes.ListBox}>
      <CustomeListView data={listData()} variant={"white"} onClick={(id)=>{
        console.log("id",id);
      }} />
    </Box>
  );
};

export default ListView;
