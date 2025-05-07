import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  big_box:{
    backgroundColor:'#fffff',
    '@media (min-width: 768px)': {
      display:'flex',
      flexDirection:'column',
      alignItems: 'center'
    },
  },
  big_grid:{
    '@media (min-width: 768px)': {
      width:'100vw'
    },
  },
  ShopName: {
    fontSize: theme.fontSizes.md,
    fontWeight: theme.colors.fontWeight.bold,
    letterSpacing:'1px !important',
    color: '#00000',
    lineHeight:'16px'
  },
  address:{
    fontSize: theme.fontSizes.sm,
    color: '#666666',
    lineHeight:'1rem',
  },
  phone:{
    fontSize: theme.fontSizes.md,
    // fontWeight: theme.colors.fontWeight.bold,
    wordBreak:'break-all',
    color: '#666666',
    lineHeight:'1rem',
  },
  open_close:{
    fontSize: theme.fontSizes.sm,
    fontWeight: theme.colors.fontWeight.bold,
    wordBreak:'break-all',
    color: '#666666',
    lineHeight:'1rem',
  },
  about:{
    fontSize: theme.fontSizes.sm,
    // fontWeight: theme.colors.fontWeight.bold,
    wordBreak:'break-all',
    color: '#666666',
    lineHeight:'1rem',
  },
  LogoName:{
    marginTop:'5px',
    color:"#228be6",
    fontSize:'0.7rem'
  },
  LogoBox:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#ffffff',
  },
  menu_btn:{
    width:'100% !important',
    backgroundColor:'white'
  },
  addressLogo:{
    display:'flex',
    alignItems:'center'
  },
  bigAddress:{
    lineHeight:'18px',
    wordBreak:'break-all',
    color: 'gray',
  },
  addressMap:{
    display:'flex',
    alignItems:'center'   
  },
  phone_info:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center'
  },
  openTimingText:{
    color:'#00b300',
    fontWeight: theme.colors.fontWeight.bold,
    letterSpacing:'0.8px !important'
  },
  textDark:{
    color: theme.colors.light_black,
    fontWeight: theme.colors.fontWeight.bold  
  },
  addresGrid:{
    display:'flex',
    flexDirection:'column',
  },
  Timing:{
    color: '#228be6',
    fontWeight: theme.colors.fontWeight.bold,
    paddingLeft:'5px'
  },
  serviceCol:{
    display:'flex',
    alignItems:'center'
  },
  serviceTextHeading:{
    fontSize: theme.fontSizes.lg,
    color: theme.colors.gray,
    fontWeight: theme.colors.fontWeight.bold,
    paddingBottom:'10px'
  },
  info_grid:{
    '@media (min-width: 1200px)': {
      // paddingLeft:'20px'
    },
  },
  loader_box:{
    width:'100%',
    display:'flex',
    justifyContent:'center'
  },
  Grid_icon_paper:{
    display:'flex',
    justifyContent:'center'
  },
  icon_paper:{
    width:'85%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    padding:'15px 5px 10px 5px',
    border:'1px solid #e0e0eb'
  },
  menu_grid:{
    borderRadius:'200%',
    display:'flex',
    justifyContent:'center',
    backgroundColor:'none ',
    '.mantine-Image-image':{
      height:'70px !important'
    },
    '@media (min-width: 768px)': {
      '.mantine-Image-image':{
        height:'100px !important'
      },
    },
    '@media (min-width: 1050px)': {
      '.mantine-Image-image':{
        height:'200px !important'
      },
    },
    '@media (min-width: 2000px)': {
      '.mantine-Image-image':{
        height:'200px !important'
      },
    },
  },

  real_menu_grid:{
    borderRadius:'10px',
    backgroundColor:'none ',
    '.mantine-Image-image':{
      maxHeight:'200px !important'
    },
    '@media (min-width: 768px)': {
      '.mantine-Image-image':{
        maxHeight:'200px !important'
      },
    },
    '@media (min-width: 2000px)': {
      '.mantine-Image-image':{
        maxHeight:'200px !important'
      },
    },
  },
  border:{
    borderBottom: `1px solid ${theme.colors.most_light_gray}`
  },
  address_grid_text:{
    display:'flex',
    alignItems:'center'
  },


  logo_card:{
    display:'flex',
    alignItems:'flex-start',
  },
  logo_card_address:{
    display:'flex',
    alignItems:'flex-start',
  },
  comment:{
    '.mantine-InputWrapper-description':{
      color:'#b1b1cd'
    }
  },
  rating:{
      stroke:'orangered',
  },
  roomImages:{
    boxShadow: "0 10px 8px rgba(0, 0, 0, 0.3)",
    borderRadius: "10px",
    height:'25vh !important',
    width:'100%',
    '@media (max-width: 768px)': {
    height:'15vh !important',
    },
  },
  menuBtnGrind:{
    display: 'flex',
    justifyContent: 'center'
  },
  info_paper:{
    border:'1px solid #f0f0f5'
  },
  paginationGrid:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    color:'gray'
  },
  notifyTopIcon:{
    display:'flex',
    justifyContent:'flex-end',
    paddingRight:10
  },
  images_banner:{
    position:'absolute',
    top:0,
    left:0,
    zIndex:-1,
    width:'100%'
  },
  infoSecondGrid:{
    display:'flex',
    justifyContent:'center'
  },
  typingGrid:{
    position:'absolute',
    top:'35vh',
    zIndex:5,
    width:'100%',
    display:'flex',
    justifyContent:'center'
  },
  typingBox:{
    padding:'10px 20px',
    borderRadius:'10px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  }
}));



