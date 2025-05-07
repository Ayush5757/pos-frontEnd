import { PasswordInput, createStyles } from "@mantine/core";
import React from "react";


export const useStyles = createStyles((theme) => ({
  customeText:{
    label:{
      fontSize:'0.75rem'
    },
    input:{
      border: `1px solid ${theme.colors.light_gray}`,
      borderTop:'none',
      borderRight:'none',
      borderLeft:'none',
      borderRadius:'0',
      fontSize:'0.75rem',
      marginTop:'2px',
      '::placeholder':{
        fontSize:'0.75rem',
        color:theme.colors.light_gray
      }
    }
  }
}));

const PasswordInputView = ({ ...rest }) => {
  const { classes } = useStyles();
  return <PasswordInput size="xs" className={classes.customeText} {...rest} />;
};

export const PasswordInputNormal = ({ size="sm",...rest }) => {
  return (
    <PasswordInput
      size={size}
      {...rest}
      />
  );
};
export default PasswordInputView;
