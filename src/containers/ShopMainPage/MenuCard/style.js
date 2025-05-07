import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  outer_box:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
   
    // height:'100vh'
  },
  tab_panel:{
    width:'95vw',
  },
  search: {
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: '#ffffff',
    padding: '0px 0 10px 0',
  },

    Product:{
      display:'flex',
      alignItems:'center'
    },
  productName: {
     wordBreak:'break-all',
     lineHeight:'14px',
     fontSize:theme.fontSizes.xs,
     color:theme.colors.light_black,
    //  backgroundColor:'red',
  },
  priceBox:{
    display:'flex',
    flexDirection:'column'
  },
  priceName:{
    lineHeight:'14px',
    fontSize:theme.fontSizes.sm,
    color:'#000000',
    fontWeight:'bold'
  },
  price:{
    lineHeight:'14px',
    fontSize:theme.fontSizes.xs,
    color:theme.colors.light_black,
    fontWeight:'bold'
  },
  productName2: {
    wordBreak:'break-all',
    lineHeight:'14px',
    fontSize:theme.fontSizes.sm,
    color:theme.colors.light_black,
    textAlign:'end'
   //  backgroundColor:'red',
 },
 priceName2:{
  lineHeight:'14px',
  fontSize:theme.fontSizes.sm,
  color:'#000000',
  fontWeight:'bold',
  textAlign:'end'
},
price2:{
  lineHeight:'14px',
  fontSize:theme.fontSizes.xs,
  color:theme.colors.light_black,
  fontWeight:'bold',
  textAlign:'end'
},
// -----------

pPrice2:{
  width: '100%',
  background: '#ff6666',
  padding: '2px',
  fontWeight:'bold',
  borderRadius: '5px',
  color: 'white',
  textAlign: 'center',
  letterSpacing:'1px !important'
},

pPrice:{
  width: '100%',
  background: '#1ab2ff',
  padding: '2px',
  borderRadius: '5px',
  color: 'white',
  fontWeight:'bold',
  textAlign: 'center',  
  letterSpacing:'1px !important'
},

desc:{
  fontSize: '0.7rem',
  lineHeight:'12px',
  textAlign:'start'
},
btn:{
  width: '100%',
},
pName2:{
  lineHeight: '12px',
  fontSize: '0.7rem',
  fontWeight: '700',
  letterSpacing:'1px !important',
  color:'#800033'
},
categorieHeading:{
  padding:'10px',
  background: 'linear-gradient(90deg, black 0%, green 70%, black 80%, green 100%)',
  borderRadius:'5px',
  color:'#ffffff',
  display:'flex',
  alignItems:'center'
},
total_label:{
  fontWeight:'bold',
  color:'orangered'
},
total:{
  fontWeight:'bold',
  color:'green'
},
stickyButtonContainer:{
  position: 'fixed',
  bottom: '10px',
  right: '38vw',
  zIndex: 999,
  '@media (min-width: 768px)': {
    right: '45vw',
  },
},
stickyButton: {
  backgroundColor: 'orangered',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
},
NoDataBox:{
  display:'flex',
  justifyContent:'center',
  width:'100%',
  marginTop:'20px'
},
Nodatamsg:{
  color:'#d1d1e0',
},
notifyTopIcon:{
  display:'flex',
  justifyContent:'flex-end'
},
gridCategorie:{
  input:{
    border:`1px solid ${theme.colors.light_gray}`
  }
},
foodMenuTitle:{
  color:'green',
  fontWeight: 700,
  letterSpacing:'1px !important'
},
showClickedFoodImageprice:{
  background:'green',
  borderRadius:'10px'
},
showClickedFoodImagehalfprice:{
  background:'orangered',
  borderRadius:'10px'
},
boxPrising:{
  display:'flex'
},
card:{
  boxShadow: '5px 5px 10px #c2d6d6'
},
popupImage:{
  boxShadow: '5px 5px 10px #c2d6d6',
},
paginationGrid:{
  display:'flex',
  alignItems:'center',
  justifyContent:'center'
},
headingPopup:{
  fontWeight: "bold",
  lineHeight: "22px",
  color: "orangered",
},
scrollGrid:{
  width:'50vw',
  display:'flex',
  alignItems:'center',
  overflowX: 'scroll',
  overflowY: 'hidden',
  whiteSpace:'nowrap',
  scrollbarWidth: 'thin', 
  scrollbarColor: `${theme.colors.light_gray} ${theme.colors.gray}`, // For Firefox
  '&::-webkit-scrollbar': {
    width: '10px', // width of the scrollbar
    height:'5px',
  },
  '@media (max-width: 768px)': {
    '&::-webkit-scrollbar': {
      width: '10px', // width of the scrollbar
      height:'1px'
    },
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'red', // color of the thumb
    borderRadius: '5px', // rounded corners
    '@media (max-width: 768px)': {    
      backgroundColor: theme.colors.gray, // color of the thumb
      borderRadius: '5px', // rounded corners
    }
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#e0e0eb', // color of the track
    '@media (max-width: 768px)': {    
      backgroundColor: '#e0e0eb', // color of the track
    }
  },
},
boxInsidescrollBox:{
  paddingBottom:'10px'
},
closeBtnGrid:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
},
prisingGrid:{
  display:'flex',
  justifyContent:'space-evenly',
  alignItems:'center'
},
cutText:{
  textDecoration: 'line-through',
  fontWeight:'bold',
  borderRight:'1px solid #ffffff',
  alignItems:'center',
},
infoGrid:{
  position:'relative'
},
infoOffer:{
  position:'absolute',
  right:0,
  top:'-12px'
},
offdiscountBox:{
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center'
},
offLabel:{
  color:'orangered',
  fontSize:'12px'
}
}));
