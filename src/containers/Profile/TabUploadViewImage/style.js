import { createStyles, rem } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  tabOne: {
    width: "50%",
   
  },
  tabTwo: {
    width: "50%",
  },
  selectedTab: {
    backgroundColor: "#fffff !important", // Change to your desired background color
    color: "black !important", // Change to your desired text color
  },
  notSelectedTab:{
    backgroundColor:'#b3ccff',
    color: '#ffffff',
  },
  ImageShowBox:{
    marginTop:'10px'
  },
  imagesGalleryImage:{
    maxWidth:'100%'
  },
  submitBtn:{
    width:'100%'
  }
}));
