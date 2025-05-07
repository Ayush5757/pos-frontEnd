import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  gridSearchBox:{ 
    input:{
      border: `1px solid #d0d0e1`,
    }
  },
  search: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: '#ffff',
    padding: '0 0 20px 0',
    input:{
      border:`1px solid #d0d0e1`
    }
  },
  crouselCollection:{
    '.mantine-vcl0d1':{
      display:'none'
    },
    '.mantine-Carousel-indicators':{
      display:'none'   
    }
  },
  ShopBox:{
    padding:'0 0 16px 0',
    border: `1px solid ${theme.colors.most_light_gray}`,
    borderRadius:'10px',
    boxShadow: '2px 2px 7px #d0d0e1'
  },
  DarkFont:{
    fontSize:theme.fontSizes.lg,
    fontWeight: theme.colors.fontWeight.bold,
  },
  title_logo:{
    display:'flex',
    alignItems:'center',    
  },
  title:{
    display:'flex',
    alignItems:'end',
  },
  address:{
    fontSize: theme.fontSizes.sm,
  },
  about:{
    fontSize: theme.fontSizes.sm,
    color: theme.colors.light_gray,
  },
  openClose:{
  },
  statusOpen:{
    color: theme.colors.light_green,
  },
  statusClose:{
    color: theme.colors.light_red,
  },
  Btn:{
    width:'100%'
  },
  image:{
    img:{
      height:'18vh !important',
      '@media (max-width: 1024px)': {
        height:'16vh !important',
      },
    }
  },
  shopDetails:{
  },
  shopDetails_second:{
    // paddingLeft:'10px'   
  },
  notifyTopIcon:{
    display:'flex',
    justifyContent:'center',
    marginTop:'10px'
  },
  headingGrid:{
    borderBottom:'1px solid #e0e0eb'
  },
  discoverHeading:{
    color:'#b1b1cd'
  }
  
}));
