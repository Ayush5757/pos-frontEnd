import { Anchor, Text, Title } from "@mantine/core";
import React from "react";
import { useStyles } from "./style";

export const TitleText = ({ children }) => {
  const { classes } = useStyles();
  return (
    <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
      {children}
    </Title>
  );
};

export const TextN1 = ({ children, link,to,onClick ,...rest}) => {
  return (
    <Text {...rest} style={{fontFamily:"'Gabarito', sans-serif", letterSpacing:'0.3px' }} >
      {children}
      {(link && to) && (
        <Anchor
          href={to}
          onClick={onClick}
        >
          {link}
        </Anchor>
      )}
    </Text>
  );
};
