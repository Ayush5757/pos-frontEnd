import { createStyles, rem } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
    drawer:{
        '.mantine-Drawer-body':{
            padding:'0px'
        }
    },
    Categories:{
        display:'flex',
        padding:'20px 15px',
        background: 'linear-gradient(90deg, #1a75ff 0%, rgba(0,0,0,1) 99%, rgba(121,9,9,1) 100%, rgba(49,189,32,1) 100%, rgba(0,212,255,1) 100%)',
        color:'#ffffff',
        marginTop:'5px',
        justifyContent:'space-between',
        '&:hover': {
            background: 'linear-gradient(90deg, #ff6666 0%, rgba(0,0,0,1) 99%, rgba(121,9,9,1) 100%, rgba(49,189,32,1) 100%, rgba(0,212,255,1) 100%)',
            cursor:'pointer',
            color:'#ffffff',
            fontWeight:'bold'
        }
    },
  NoRecord:{
    margin:'10px 0 0 17px',
    color:theme.colors.light_gray
  }
}));
