import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  big_box:{
    display: 'flex',
    justifyContent: 'center'
  },
  big_grid:{
    width:'100%',
    '@media (min-width: 768px)': {
      width:'60vw'
    },
  },
  current_date:{
    backgroundColor:'#4d79ff',
    padding:'5px',
    borderRadius:'5px',
  },
  current_total:{
    color:'#00ff99'
  },
  current_Orders:{
    color:'orange',
    fontSize:'1.2rem'
  },
  for_border:{
    borderTop: '1px solid #ffffff'
  },
  item_name:{
    color:'#ffffff',
    paddingTop:'2px'
  },
  already_order_item_name:{
    color:'#e0e0eb',
    paddingTop:'2px'
  },
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
    fontSize:'1.2rem',
    color:'#ffffff'
  },
  heading:{
    width:'100%',
    borderRadius:'5px',
    marginTop:'10px',
    background: 'linear-gradient(90deg, black 0%, rgba(46,26,175,1) 99%, black 100%, black 100%, black 100%)',
    padding:'15px 20px',
  },
  heading_page:{
    width:'100%',
    borderRadius:'5px',
    marginTop:'10px',
    background: 'linear-gradient(90deg, black 0%, orangered 99%, orangered 100%, orangered 100%,orangered 100%)',
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
  item_name_grid:{
    display:'flex',
    alignItems:'flex-start'
  },
  modalOuter:{
    height:'80vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  modal_inner:{
    width:'100%'
  },
  loader_grid:{
    display:'flex',
    justifyContent:'center'
  },
  otp_message_grid:{
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  confirm_btn_grid:{
   display:'flex',
   justifyContent:'center'
  },
  bookedMsg:{
    color:'#ff6666'
  },
  noteBtnGrid:{
    display:'flex',
    justifyContent:'flex-end'
  },
  noteBtn:{
    height:'1.8rem',
    backgroundColor: '#009999'
  },
  addOnBtn:{
    height:'1.8rem',
    backgroundColor: '#e69900'
  },
  addMoreOrderPopup:{
    display: 'flex',
    flexDirection:'column'
  },
  addMoreItemTitle:{
    marginBottom:'10px',
    lineHeight:'1.2rem'
  },
  table_name:{
    fontWeight:700,
    color:'#ff6666'
  },
  notifyTopIcon:{
    display:'flex',
    justifyContent:'flex-end'
  },
  titlegst:{
    color:'orange'
  },
  BoxTotal:{
    display:'flex',
    justifyContent:'flex-end'
  },
  onCenterGrid:{
    display:'flex',
    justifyContent:'center',
    '.mantine-PinInput-input':{
      border:'1px solid #3399ff',
      color:'#3399ff'
    }
  }

  
}));
