import {
    createStyles,
    ThemeIcon,
    Text,
    SimpleGrid,
    Box,
    Stack,
    Divider,
  } from "@mantine/core";
  
  const useStyles = createStyles((theme, { variant }) => ({
    wrapper: {
      display: "flex",
      alignItems: "center",
      color: theme.colors.light_gray,
    },
  
    icon: {
      marginRight: theme.spacing.md,
      backgroundImage:
        variant === "gradient"
          ? `linear-gradient(135deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
              theme.colors[theme.primaryColor][6]
            } 100%)`
          : "none",
      backgroundColor: "transparent",
    },
  
    title: {
      color: theme.colors.light_gray,
      // backgroundColor:'red',
        // variant === "gradient"
        //   ? theme.colors.gray[6]
        //   : theme.colors[theme.primaryColor][0],
    },
  
    description: {
      color: theme.colors.gray, 
      // backgroundColor:'red',
      width:'100%'
      // color: variant === "gradient" ? theme.black : theme.white,
    },
    title_descrioption_Box:{
      width:'100%',
      // backgroundColor:'blue',
      display:'flex',
      alignItems:'center',
      // padding:'20px 0',
      borderBottom:`1px solid ${theme.colors.most_light_gray}`
    }
  }));
  function List({
    icon: Icon,
    text,
    title,
    description,
    variant = "gradient",
    className,
    onClick,
    itemId,
    ...others
  }) {
    const { classes, cx } = useStyles({ variant });
    return (
      <div className={cx(classes.wrapper, className)} {...others} onClick={()=>{
        onClick(itemId)
      }}>
  
        {variant === "gradient" ? (
          <>
          {text?
            <ThemeIcon size={40} radius="md" className={classes.icon}>
            {text}
          </ThemeIcon>
          :
          <ThemeIcon size={40} radius="md" className={classes.icon}>
            <Icon size="1.5rem" />
          </ThemeIcon>
          }
          </>
        ) : (
          <Box mr="md">
            <Icon size="1.5rem" />
          </Box>
        )}
  
        <div className={classes.title_descrioption_Box}>
          <Text size="xs" className={classes.title}>
            {title}
          </Text>
          <Text className={classes.description}>{description}</Text>
       
        </div>
      </div>
    );
  }
  
  //  This one we Should use.
  export const CustomeListView = ({ data=[], variant,onClick }) => {
    const items = data?.map((item, index) => (
      <List key={index} variant={variant} itemId={item.id} {...item} onClick={onClick} />
    ));
    return <Stack>{items}</Stack>;
  };
  
  export const ContactIcons = () => {
    return (
      <SimpleGrid cols={2}breakpoints={[{ maxWidth: 755, cols: 1, }]}>
        <Box
          sx={(theme) => ({
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            backgroundColor: theme.white,
          })}
        >
          <CustomeListView />
        </Box>
  
        <Box
          sx={(theme) => ({
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            backgroundImage: `linear-gradient(135deg, ${
              theme.colors[theme.primaryColor][6]
            } 0%, ${theme.colors[theme.primaryColor][4]} 100%)`,
          })}
        >
          <CustomeListView variant="white" />
        </Box>
      </SimpleGrid>
    );
  };
  