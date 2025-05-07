import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  big_box:{
    '@media (min-width: 768px)': {
      display:'flex',
      flexDirection:'column',
      // justifyContent:'center',
      alignItems: 'center'
    },
  },
  big_grid:{
    '@media (min-width: 768px)': {
      width:'60vw'
    },
  },
  btn_grd:{
    display:'flex',
    justifyContent:'space-between'
  },
  noDataBox:{
    width:'100%',
    height:'75vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  }
}));
