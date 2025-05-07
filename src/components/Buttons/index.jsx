import { Box, Button, createStyles } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React from "react";
export const useStyles = createStyles((theme) => ({
  PlusBtn:{

  }
}))
export const PrimaryButton = ({children,disabled,...rest}) => {
  // const { classes } = useStyles();
  return (
    <Button style={{backgroundColor:disabled===true&&'gray'}}disabled={disabled} {...rest}>
      {children}
    </Button>
  );
};

export const AddPlusButton = ({onClick,...rest}) => {
  const { classes } = useStyles();
  return (
    <Button leftIcon={<IconPlus />} onClick={onClick} variant="outline" className={classes.PlusBtn} {...rest}>
      Add Product
    </Button>
  );
};