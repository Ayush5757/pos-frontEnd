import { IconEye, IconMessageCircle } from "@tabler/icons-react";
import {
  Card,
  Text,
  Group,
  Center,
  createStyles,
  getStylesRef,
  rem,
  Box,
  Paper,
} from "@mantine/core";
import { LazyLoadImage } from "react-lazy-load-image-component";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    height: rem(100),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],

    [`&:hover .${getStylesRef("image")}`]: {
      transform: "scale(1.03)",
    },
    ".mantine-Group-root": {
      gap: 0,
    },
  },

  image: {
    ...theme.fn.cover(),
    ref: getStylesRef("image"),
    backgroundSize: "cover",
    transition: "transform 500ms ease",
  },

  overlay: {
    position: "absolute",
    top: "20%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .75) 70%)",
  },

  content: {
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    zIndex: 1,
  },

  bodyText: {
    fontSize: "10px",
    fontWeight: theme.colors.fontWeight.bold,
    lineHeight: "10px",
    padding: "4px 5px 2px 5px",
    letterSpacing:'0.5px !important'
  },
  bodyText2: {
    marginTop: "5px",
    color: theme.white,
    lineHeight: "10px",
    backgroundColor: "green",
    padding: "3px 3px 2px 3px",
    borderRadius: "2px",
  },
  BoxCard: {
    // backgroundColor:theme.colors.most_light_gray
  },
}));

export function ImageCard({ image, title, comments, comments2, link }) {
  const { classes, theme } = useStyles();
  return (
    <Paper shadow="xl" className={classes.BoxCard}>
      <Card
        shadow="lg"
        className={classes.card}
        radius="md"
        component="a"
        href={link}
        style={{ padding: 0 }}
        target="_blank"
      >
        <LazyLoadImage
          width={'100%'}
          height={'100%'}
          src={image}
          effect="blur"
          style={{
            objectFit: "cover",
          }}
        />
     

      </Card>
      {comments && (
        <Text size="sm" color="#00b359" className={classes.bodyText}>
          {comments}
        </Text>
      )}
      {comments2 && (
        <Text size="sm" color="#cc7a00" className={classes.bodyText}>
          {comments2}
        </Text>
      )}
      <Text size="sm" className={classes.bodyText} pb={'5px'}>
        {title}
      </Text>
    </Paper>
  );
}
