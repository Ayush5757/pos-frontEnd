import { createStyles, rem } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  Wrap: {
    padding: "10px",
  },
  create: {
    marginTop: "10px",
    // backgroundColor:'yellow'
  },
  paper: {
    width: "100%",
    height: "100%",
    padding: "10px",
    display: "flex",
    textAlign:'center',
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${theme.colors.most_light_gray}`,
    fontWeight: "bold",
    color: theme.colors.light_black,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#adad85",
      color: "#ffffff",
    },
  },
  delete:{
   "&:hover": {
      color: "red",
    },
  },
  cancel:{
    textAlign:'end'
  },
  month:{
    fontSize:'1.5rem',
    color:'#ffffff'
  },
  heading:{
    width:'100%',
    borderRadius:'15px',
    marginTop:'10px',
    background: 'linear-gradient(90deg, rgba(46,26,175,1) 0%, rgba(0,0,0,1) 99%, rgba(121,9,9,1) 100%, rgba(49,189,32,1) 100%, rgba(0,212,255,1) 100%)',
    padding:'15px 20px',
  },
  searchBox:{
    display:'flex',
    alignItems:'flex-end'
  },
  date:{
    label:{
      color:'#ffffff'
    }
  },
  table_grid:{
    border:`1px solid ${theme.colors.most_light_gray}`,
    borderRadius:'5px'
  },
  refresh_grid:{
    display:'flex',
    alignItems:'center'
  },
  total:{
    fontSize:'1rem',
    color:'#ffffff'
  },
  deleteBtnBox:{
    display:'flex',
    justifyContent:'space-between'
  },
  paginationGrid:{
    display:'flex',
    justifyContent:'center'
  }
  
}));
