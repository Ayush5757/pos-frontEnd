import { createStyles, Card, Image, Avatar, Text, Group, Paper } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    padding:'0 3px 0 1px',
    border:`1px solid ${theme.colors.most_light_gray}`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  price: {
    // fontWeight: 700,
    // fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    // lineHeight: 1,
    fontSize: "12px",
    backgroundColor: "green",
    padding: "2px 3px 3px 3px",
    color: "white",
    borderRadius: "3px",
  },
  Name: {
    lineHeight:'12px',
    fontSize:theme.fontSizes.xs,
    // wordBreak:'break-all',
    fontWeight:'bold',
  },
  body: {
    padding: '10px 0px 10px 5px',
    // border:`1px solid ${theme.colors.light_black}`
  },
}));

export function ArticleCardVertical({ image, category, title, date, author }) {
  const { classes } = useStyles();
  return (
    <Paper  shadow="xl" radius="md" className={classes.card}>
      <Group noWrap spacing={0}>
        <Image src={image} p={2} height={70} width={70} radius={5} />
        <div className={classes.body}>
          <Text
            color="dimmed"
            weight={'100%'}
            size="xs"
            className={classes.Name}
          >
            {"Paneer Butter Masala Extra Chese"}
          </Text>
          <span className={classes.price}>{"Price ~ 190"}</span>
        </div>
      </Group>
    </Paper>
  );
}
