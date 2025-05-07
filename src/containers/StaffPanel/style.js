import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  staffAddBtn: {
    display:'flex',
    justifyContent:'flex-end',
    alignItems:'center',
  },
  AddStaffPopUp:{
    display:'flex',
    justifyContent:'flex-end'
  },
  view:{
    color: 'blue',
    cursor: 'pointer',
    '&:hover':{
      borderBottom:'1px solid blue',
    }
  },
  ColLast:{
    display:'flex',
    alignItems:'center'
  },
  Update:{
    marginLeft:'20px',
    color:'red',
    cursor:'pointer',
    '&:hover':{
      borderBottom:'1px solid red',
    }
  },
  leave:{
    marginLeft:'20px',
    color:'purple',
    cursor:'pointer',
    '&:hover':{
      borderBottom:'1px solid purple',
    }
  },
  confirmBox:{
    display:'flex',
    justifyContent:'space-between'
  },
  deleteConfirmMsg:{
    color:'red'
  },
  info_text:{
    color:'#52527a',
    lineHeight:'16px',
    marginTop:'12px'
  },
  information:{
    color:'#000000',
  },
  leave_grid:{
    padding:'10px 10px',
    boxShadow: '3px 5px 5px #888888',
    border:'2px solid #f0f0f5',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  datePicker_box:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    '@media (min-width: 768px)': {
      width:'50%'
    },
    width:'100%',
    '.mantine-Popover-dropdown':{
      marginTop:'20vh'
      // backgroundColor:'red',
    }
  },
  noData:{
    color:'#9494b8'
  },
  paginationGrid:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  }
}));
