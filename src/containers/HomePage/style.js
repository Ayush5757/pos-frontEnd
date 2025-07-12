import { createStyles, rem } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  grid:{
    padding:'15px',
    backgroundColor:'rgba(50, 0, 0, 0.7)',
    position:'fixed',
    top:0,
    width:'100%',
    zIndex:5
  },
  menuBar_rightGrid:{
    display:'flex',
    justifyContent:'flex-end' 
  },
  menuBar_rightGrid_insideGrid:{
    display:'flex',
    justifyContent:'flex-end',
    alignItems:'center',
    // backgroundColor:'green'
  },
  gridNav:{
    width:'100%',
    // backgroundColor:'Red',
    display:'flex',
    justifyContent:'flex-end',
    padding: 0,
    height:'100%',
  },
  text:{
    '@media (max-width: 750px)': {
      fontSize:'12px',
    },
    width:'100%',
    height:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor:'yellow',
    fontSize:'16px',
    color:'white',
    cursor:'pointer',
    transition:'all 0.3s ease',
    '&:hover':{
      color:'#ffffffc8',
      transform: 'translateY(-2px)'
    }
  },
  bannerImage_box:{
    position:'absolute',
    top:0,
    zIndex:-1
  },
  BannerBox:{
    position:'relative'
  },
  bannerTextBox:{
    position:'absolute',
    width:'100%',
    top:'30%',
    display:'flex',
    justifyContent:'center',
    '@media (max-width: 750px)':{
      top: '20%'
    }
  },
  dataBox:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    '@media (min-width: 1025px)':{
      // backgroundColor:'green'
    }
  },
  heading:{
    fontSize:'3rem',
    backgroundColor:'rgba(0, 0, 0, 0.9)',
    '@media (max-width: 750px)':{
      backgroundColor:'white',
       color:'black',
       fontWeight: 'bold',
        background:'none !important',
    },
    transition: 'all 0.5s ease',
    transform: 'translateY(-4px)',
    padding:'10px',
    color:'white',
    borderRadius:'10px',
    margin:'auto'
  },
  description:{
    fontSize:'1.4rem',
    color:'rgba(0, 0, 0, 0.84)',
    fontWeight:800,
    letterSpacing:'-0.5px !important',
    width:'80%',
    padding:'10px 25px',
    borderRadius:'10px',
    margin:'auto',
    '@media (max-width: 750px)': {
      width:'95%',
      fontSize:'1rem',
      display:'none'
    },
    paddingTop:'10%',
    fontFamily: "Poppins, sans-serif !important"
  },
  cardInfo:{
    display:'flex',
    justifyContent:'center',
    boxShadow: '2px 2px 8px #b3b3cc',
    border:'1px solid #e0e0eb',
    borderRadius:'20px',
  },
  linedescheading:{
    lineHeight:'1.2rem !important',
    fontSize:'1rem'
  },
  linedesc:{
    lineHeight:'1.2rem !important',
    fontSize:'0.8rem'
  },
  BigCard:{
    display:'flex',
    justifyContent:'center',
  },
  imageShadow:{
    display:'flex',
    alignItems:'center',
    borderRadius:'40px',
  },
  longdesc:{
    padding:'30px',
    fontSize:'1rem'
  },
  planeinfo:{
    display:'flex',
    justifyContent:'center'
  },
  planeinfo_Box:{
    width:'70%',
    backgroundColor:'#e6f3ff',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    padding:'40px 60px',
    borderRadius:'10px',
    '@media (max-width: 750px)': {
      width:'100%',
    },
  },
  planeHeading:{
    fontSize:'1.4rem',
    marginBottom:'15px'
  },
  justMiddleImageGrid:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  TickInfoGrid:{
    display:'flex',
    justifyContent:'center',
    // backgroundColor:"red"
  },
  boxTickinfo:{
    backgroundColor:'#e6f3ff',
    padding:'20px',
    borderRadius:'10px'
  },
  TickInfoBox:{
    width:"90%",
    display:'flex',
    alignItems:'center',
    boxShadow: '2px 2px 8px #b3b3cc',
    padding:'20px',
    borderRadius:'10px',
    backgroundColor:'#ffffff',
  },
  footerBox:{
    display:'flex',
    justifyContent:'center'
  },
  footerHeading:{
    fontSize:'22px',
    fontWeight:'bold',
    color:'gray'
  },
  footerPoints:{
    fontSize:'18px',
    marginTop:'12px',
    color:'gray'
  },
  logoGrid:{
    display:'flex',
    alignItems:'center'
  },
  afterfooterBox:{
    display:'flex',
    justifyContent:'center'
  },
  afterfooterPoints:{
    fontSize:'14px',
    color:'gray'
  },
  logoBox:{
    display:'flex',
    justifyContent:'flex-end'
  },
  cotactus_heading:{
    fontSize:'16px'
  },
  contact_display:{
    display:'flex',
    alignItems:'center',
  },
  contact_label:{
    fontSize:'12px'
  },
  contactUs_firstSection:{
    backgroundColor:'#1a8cff',
    color:'#ffffff',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    borderRadius:'10px'
  },
  contact_us_right_heading:{
    fontSize:'16px',
    fontWeight:700
  },
  contactus_outerGrid:{
    display:'flex',
    justifyContent:'center'
  },
  contactus_outerGridCol:{
    border:'1px solid #e0e0eb',
    padding:'20px',
    borderRadius:'10px',
    boxShadow: '2px 2px 8px #d0d0e1',
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  contactUDHeadingLeft:{
    fontSize:'18px',
    borderBottom:'1px solid white'
  },
  sendGrid:{
    display:'flex',
    justifyContent:'space-between'
  },
  image_card:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  forBorder:{
    borderTop:'1px solid gray'
  },
  logo_grid:{
    display:'flex',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  domainName:{
    color:'#ffffff',
    paddingLeft:'15px'
  },
  height30vh:{
    maxHeight:'30vh',
  },
  imageWidth100:{
    height:'100%',
  },
  showMenuPopBox:{
    display:'flex',
    justifyContent:'space-between'
  },
  titletext:{
    color:'#8383af',
    fontSize:'14px'
  },
  modelSection:{
    '.mantine-Overlay-root':{
      backgroundColor:'rgba(0,0,0,0.5)'
    }
  }
}));
