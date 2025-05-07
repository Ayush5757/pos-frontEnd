import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  outer_box:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
   
    // height:'100vh'
  },
  tab_panel:{
    '@media (min-width: 768px)': {
      width:'95vw'
    },
    
  },
  search: {
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: '#ffff',
    padding: '10px 0 10px 0',
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
pPrice:{
  width: '100%',
  background: 'linear-gradient(90deg, black 0%, green 70%, black 90%, black 100%)',
  padding: '2px',
  borderRadius: '5px',
  color: 'white',
  fontWeight:'bold',
  textAlign: 'center',
},
pPrice2:{
  width: '100%',
  background: '#00b359',
  padding: '2px',
  fontWeight:'bold',
  borderRadius: '5px',
  color: 'white',
  textAlign: 'center',
},
desc:{
  fontSize: '0.8rem',
  lineHeight:'14px',
  textAlign:'start',
  paddingBottom:'10px'
},
btn:{
  width: '100%',
},
pName2:{
  lineHeight: '12px',
  fontSize: '0.9rem',
  fontWeight: '700',
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
Nodatamsg:{
  color:'gray'
},
about:{
    lineHeight:'14px',
    color:'#5c5c8a'
},
room_dialog_price:{
    backgroundColor:'green',
    padding:'5px 10px',
    color:'#ffffff',
    borderRadius:'10px'
},
room_dialog_about:{
    lineHeight:'16px',
    paddingBottom:'15px'
},
roomMenuTitle:{
  color:'green',
  fontWeight: 700,
  letterSpacing:'1px !important'
},
headgrid:{
  display:'flex',
  justifyContent:'flex-end'
},
modalbox:{

},
paginationGrid:{
  display:'flex',
  alignItems:'center',
  justifyContent:'center'
},
}));
