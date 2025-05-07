import React from "react";
import {
  ActionIcon,
  Box,
  Grid,
  Paper,
  Rating,
  ThemeIcon,
  createStyles,
} from "@mantine/core";
import { TextN1 } from "../../components/Text";
import {
  IconCircleCheckFilled,
  IconJewishStarFilled,
} from "@tabler/icons-react";

export const useStyles = createStyles((theme) => ({
  commentHeading: {
    fontWeight: theme.colors.fontWeight.bold,
    fontSize: theme.fontSizes.lg,
    color: theme.colors.light_black,
  },
  commenterName: {
    fontWeight: theme.colors.fontWeight.bold,
    letterSpacing:'0.8px !important'
  },
  commenterComment: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.light_black,
    lineHeight: "1.3rem",
  },
  commentBorder: {
    borderBottom: `1px solid ${theme.colors.most_light_gray}`,
  },
}));

const CommentSection = ({ data_Comment }) => {
  const { classes } = useStyles();
  return (
    <Box>
      <Grid gutter={0}>
        <Grid.Col span={12} mb={15}>
          <TextN1 className={classes.commentHeading}>Customer Reviews</TextN1>
        </Grid.Col>
        {data_Comment?.map((val) => (
          <>
            <Grid.Col span={12}>
              <TextN1 className={classes.commenterName}>
                {val?.name}
              </TextN1>
            </Grid.Col>
            <Grid.Col span={12}>
              {/* <IconJewishStarFilled size="1rem" className={classes.stars} /> */}
              {val?.rating>=0 &&
                <Rating value={val?.rating} className={classes.rating} readOnly/>
              }
            </Grid.Col>
            <Grid.Col
              span={12}
              mt={10}
              pb={10}
              className={classes.commentBorder}
            >
              <TextN1 className={classes.commenterComment}>
                {val?.comment}
              </TextN1>
            </Grid.Col>
          </>
        ))}
      </Grid>
    </Box>
  );
};

export default CommentSection;
