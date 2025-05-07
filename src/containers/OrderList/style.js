import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  Outer_Grid:{
    borderRadius:'10px',
    input:{
      border:'1px solid #e0e0eb'
    },
    '.mantine-DatePickerInput-input':{
      border:'1px solid #e0e0eb'
    }
  },
  Outer_Grid_Table:{
  },
  SearchBox:{
    display:'flex',
    alignItems:'end'
  },
  customer_name:{
    color:'blue',
    cursor:'pointer',
    '&:hover':{
      color:'red',
    }
  },
  infoBox:{
    display:'flex',
    alignItems:'center',
    marginBottom:'5px'
  },
  key:{
    color:'#000000',
    fontWeight:'bolder',
    lineHeight:'16px'
  },
  value:{
    color:'#7373a5',
    marginLeft:'5px',
    lineHeight:'16px'
  },
  phone:{
    color:'blue',
    cursor:'pointer',
    letterSpacing:'0.05rem',
    '&:hover' :{
      color:'red',
      borderBottom:'1px solid red',
    }
  },
  withPhone:{
    display:'flex'
  },
  zomato:{
    color:'red',
    letterSpacing: '0.1rem'
  },
  swigy:{
    color:'orange',
    letterSpacing: '0.1rem'
  },
  deleteBtnBox:{
    display:'flex',
    justifyContent:'space-between'
  },

  paginationGrid:{
    display:'flex',
    justifyContent:'center'
  },
 
}));
