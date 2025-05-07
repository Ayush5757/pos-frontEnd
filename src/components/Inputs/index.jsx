import { Box, NumberInput, TextInput } from "@mantine/core";
import React from "react";
import { IconAt } from "@tabler/icons-react";
import { createStyles } from "@mantine/core";

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
      '::placeholder':{
        fontSize:'0.75rem',
        color:theme.colors.light_gray
      }
    }
  },
  customeNormalTextInput:{
    label:{
      fontSize:'0.75rem',
      letterSpacing:'0.03rem',
    },
    input:{
      border: `1px solid ${theme.colors.light_gray}`,
    }
  }
}));

export const TextInputView = ({ ...rest }) => {
  const { classes } = useStyles();
  return (
    <TextInput
      size="xs"
      className={classes.customeText}
      {...rest}
      />
  );
};

export const TextInputViewNormal = ({ size="sm",...rest }) => {
  const { classes } = useStyles();
  return (
    <TextInput
      size={size}
      className={classes.customeNormalTextInput}
      {...rest}
      />
  );
};

export const NumberInputViewNormal = ({ size="sm",...rest }) => {
  const { classes } = useStyles();
  return (
    <NumberInput
      size={size}
      className={classes.customeNormalTextInput}
      {...rest}
      />
  );
};