import { createStyles, Card, Overlay, CardProps, Button, Text, rem, Box, Paper } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(240),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  content: {
    ...theme.fn.cover(),
    padding: theme.spacing.xl,
    zIndex: 1,
  },

  action: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    right: theme.spacing.xl,
  },

  title: {
    color: theme.white,
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
  },

  description: {
    color: theme.white,
    maxWidth: rem(220),
  },
}));


export const CardCustome = ({
    title,
    description,
    image,
    action,
    style,
    className,
    ...others
  })=>  {
  const { classes, cx, theme } = useStyles();
  return (
    <Card
      radius="md"
      style={{ backgroundImage: `url(${image})`, ...style }}
      className={cx(classes.card, className)}
      {...others}
    >
        
      <Overlay
        opacity={0.2}
        zIndex={0}
      />

      <Box className={classes.content}>
        <Paper shadow='xl'>
        <Text size="lg" weight={700} className={classes.title}>
          {title}
        </Text>

        <Text size="sm" className={classes.description}>
          {description}
        </Text>
        {action &&
        <Button
        className={classes.action}
        variant="white"
        color="dark"
        component="a"
        size="xs"
        href={action.link}
        >
          {action.label}
        </Button>
        }
      </Paper>
      </Box>
    </Card>
  );
}