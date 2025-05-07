import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  outer_box: {
    display: 'flex',
    justifyContent: 'center',
    
  },
  inner_box: {
    width:'100%',
    '@media (min-width: 768px)': {
      width:'60vw'
    },
  },
  heading:{
    background: 'linear-gradient(90deg, #006666 0%, rgba(0,0,0,1) 99%, black 100%, rgba(49,189,32,1) 100%, rgba(0,212,255,1) 100%)',
    color: '#ffffff',
    padding: '10px',
    borderRadius: '5px',
    // border: `1px solid ${theme.colors.light_gray}`    
  },
  box1:{
    background: 'linear-gradient(90deg, #006666 0%, rgba(0,0,0,1) 99%, black 100%, rgba(49,189,32,1) 100%, rgba(0,212,255,1) 100%)',
    color:'#ffffff'  
  },
  grid_card_message:{
    // img:{
    //   '@media (min-width: 992px)':{
    //     // height: '10rem !important'
    //   }
    
    // }
  },
  box_delete:{
    position:'absolute', 
    bottom:'5px',
    right:'5px',
    backgroundColor:'black',
    borderRadius:'100px',
    padding:'5px',
    '&:hover':{
      backgroundColor:'white',   
    }
  },
  canselDeleteBox:{
    display:'flex',
    justifyContent:'space-between'
  }

}));
