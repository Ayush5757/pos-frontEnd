import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  AddBtnGrid: {
    display: "flex",
    justifyContent:'flex-end'
  },
  headingGrid:{
    display: "flex",
    alignItems:'center',
    color: theme.colors.light_black,
  },
  heading:{
    fontWeight: theme.colors.fontWeight.bold,
    fontSize:'16px',
    letterSpacing:'1px'
  },
  ModelTop:{
    '.mantine-Modal-header':{
      borderBottom:`1px solid ${theme.colors.light_gray}`,
      marginBottom:'15px'
    }
  },
  productimage:{
    maxWidth:'50%',
  },
  submitBtn:{
    width:'100%',
    letterSpacing:'1px'
  },
  images:{
    width:'100%'
  },
  head:{
    width:'100%',
    fontSize:'0.8rem',
  },
  pName:{
    fontWeight: theme.colors.fontWeight.bold,
    color:'#ffffff',
    fontSize:'0.8rem',   
  },
  pName2:{
    fontWeight: theme.colors.fontWeight.bold,
    color: '#ffffff',
    fontSize:'0.9rem', 
    padding:'3px 10px 5px 10px', 
    background: 'rgba(0,0,0,0.7)',
    borderRadius:'10px'
  },
  pPrice:{
    fontSize:'0.7rem', 
    fontWeight: theme.colors.fontWeight.bold,
    borderRadius:'5px',
    color: '#ffffff',
    backgroundColor:'green',
    padding:'3px 10px'   
  },
  pPrice2:{
    fontSize:'0.7rem', 
    fontWeight: theme.colors.fontWeight.bold,
    borderRadius:'5px',
    color: '#ffffff',
    backgroundColor:'red',
    padding:'3px 10px'   
  },
  info_Grid:{
    position:'absolute',
    bottom:'0px',
    width:'100%'
  },
  categorieHeading:{
  },
  headingBox:{
    width:'100%',
    '@media (min-width: 768px)': {
      width:'50%',
    },
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center',
    cursor:'pointer',
    color:'#ffffff',
    borderRadius:'5px',
    padding:'10px',
    background: '#3399ff',
    '&:hover':{
      background: 'orangered',
      color:'#ffffff',
    }
  },
  headingBoxInside:{
    display:'flex',
    alignItems:'center',
  },

  food_card:{
    cursor: 'pointer',
    '&:hover':{
    }
  },
  inline_grid:{
    display:'flex',
    justifyContent:'space-between'
  },
  btn_Box:{
    display:'flex',
    justifyContent:'space-between'
  },
  nonsellpriceheading:{
    marginLeft:'10px',
    color:'orangered'
  }
}));
