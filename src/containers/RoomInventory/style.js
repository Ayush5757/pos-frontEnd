import { createStyles, rem } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
    RightSection:{
      border:`1px solid ${theme.colors.most_light_gray}`,
      padding:'10px',
      borderRadius:'10px'
    },
    LeftSection:{
        border:`1px solid ${theme.colors.most_light_gray}`,
        padding:'10px',
        borderRadius:'10px'
      },
      items:{
        cursor:'pointer'
      },
      NoCatSelec:{
        padding:'5px 5px 5px 10px'
      },
      categoryEmptyBox:{
        width:'100%',
        paddingTop:'10px',
        display:'flex',
        justifyContent:'center'
      },
      categoryEmptyMsgBox:{
        paddingTop:'10px',
        color:theme.colors.light_gray
      },
      CardProduct:{
        width:'100%',
        backgroundColor:theme.colors.most_light_gray,
        border:`1px solid ${theme.colors.light_gray}`,
        borderRadius:'5px',
        display:'flex',
        flexDirection: 'column',
        alignItems:'center',
        justifyContent:'center',
        fontWeight:700,
        color: theme.colors.light_black,    
        padding:'10px',
        '&:hover':{
          color:'#ffffff',        
          background: 'linear-gradient(90deg, #ff6666 0%, rgba(0,0,0,1) 99%, rgba(121,9,9,1) 100%, rgba(49,189,32,1) 100%, rgba(0,212,255,1) 100%)',
  
        }
      },
      qr_outer_box:{
        height: '95vh',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
      },
      badge_table:{
        '&:hover':{
          cursor: 'pointer'
        }
      },
      plate_type_modal:{
        section:{
          height:'30vh'
        }
      },
      KotconfirmbtnBox:{
        display:'flex',
        justifyContent:'space-between'
      },
      info_to_save_order_before_kot:{
        color: 'red',
        fontWeight:'700'
      },
      customeform:{
        textarea:{
          height:'15vh',
          marginTop:'5px'
        }
      },
      box_badge_table:{
        display:'flex',
        alignItems:'center'
      },
      searchItemGrid:{
        width:'40%',
        '@media (max-width: 450px)': {
          width:'100%',
        },
      },
      lastTabGrid:{
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        paddingBottom:'4px'
      },
      extraChargeGrid:{
        display:'flex',
        justifyContent:'flex-end',
        padding:'7px',
        borderRadius:'7px'
      },
      addOnChargeGrid:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'#f0f0f5',
        justifyContent:'center',
        borderRadius:'10px',
        height:'100%'
      },
      addOnChargeGridClear:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:'10px',
      },
      leftGrid:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
      },
      chargeName:{
        textAlign:'center',
        color:'#00000',
        letterSpacing:'1px !important',
        lineHeight:'14px !important',
        fontSize:'12px'
      },
      chargeValue:{
        color:'green',
      },
      printBtns:{
        display:'flex',
      },
      printWithTextQrBox:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
      },
      printTableNameQR:{
        fontSize:'26px',
        fontWeight:'bolder',
        letterSpacing:'1px !important'
      },
      product_price:{
        fontSize:'10px',
        letterSpacing:'0.5px'
      },
      product_item:{
        fontSize:'12px',
        textAlign:'center'
      },
      RoomPriceSelectboxwithWathsapp:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
      }
}));
