import { createStyles } from "@mantine/core";
export const useStyles = createStyles((theme) => ({
  outer_box: {
    display: 'flex',
    justifyContent: 'center'
  },
  inner_box: {
    width:'100%',
    '@media (min-width: 768px)': {
      width:'60vw'
    },
  },
  second_form: {
    borderTop:`1px solid ${theme.colors.most_light_gray}`
  },
  day_offs:{
    '.mantine-MultiSelect-input':{
      border:'1px solid gray'
    } 
  },
  check_status:{
    '.mantine-Switch-track':{
      backgroundColor:'red'
    }
  },
  time:{
    input:{
      border: `1px solid ${theme.colors.light_gray}`,
    }
  }
}));
