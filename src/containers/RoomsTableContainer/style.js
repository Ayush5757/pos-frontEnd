import { createStyles, rem } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  TableGrid: {
    minHeight:'14vh',
    position: 'relative'
  },
  TableBox: {
    width: "100%",
    minHeight: "10vh",
    maxHeight: "100%",
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    border:`2px solid ${theme.colors.light_black}`,
    borderStyle:'dotted',
    borderRadius:'10px',
    boxShadow: '5px 5px 5px #c0c0d8',
    '&:hover':{
      cursor:'pointer',
    }
  },
  Tableprice:{
    fontWeight:'bold',
    textAlign:'center'
  },
  model:{
    '.mantine-Modal-close':{
      backgroundColor:'white'
    },
    section:{
      // height:'40vh'
    }
  },
  modelSection:{

  },
  sectionHead:{
    fontWeight:'bold',
    color:'#e62e00',
  },
  workingRoom:{
    position:'absolute',
    top:'0px',
    right: '0px'
  },
  btnsGrid:{
    display:'flex',
    alignItems:'center'
  }
}));
