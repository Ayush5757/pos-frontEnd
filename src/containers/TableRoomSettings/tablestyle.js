import { createStyles, rem } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  TableGrid: {
    minHeight:'12vh',
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
  workingTable:{
    position:'absolute',
    top:'0px',
    right: '0px'
  },
  workingRoom:{
    position:'absolute',
    top:'0px',
    right: '0px'
  },

  btnBox:{
    display:'flex',
    justifyContent:'space-between'
  }
}));
