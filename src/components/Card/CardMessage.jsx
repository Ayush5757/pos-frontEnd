import { Card, Image, Badge, Button, Group, Box, Paper } from "@mantine/core";
import { TextN1 } from "../Text";
import { useStyles } from "./style";
import { LazyLoadImage } from "react-lazy-load-image-component";

const CardMessage = ({ imageUrl, customeLowerBox,imgH='10vh',shadow='sm',padding='5px',onClick,...rest }) => {
  const { classes } = useStyles();
  return (
    <Paper
      p={padding}
      style={{ width: "100%" }}
      {...rest}
    >
      <Card shadow={shadow} radius="md" p={0} className={classes.cardOnly}>
        <Card.Section>
          <Paper h={imgH} w={'100%'} style={{display:'flex',justifyContent:'center'}} shadow="xl">
          <LazyLoadImage
            width={'100%'}
            height={'100%'}
            className={classes.image}
            src={
              imageUrl ??
              "https://p325k7wa.twic.pics/high/dragon-ball/dragonball-project-z/00-page-setup/dbzk_game-thumbnail.jpg?twic=v1/step=10/quality=80/max=760"
            }
            alt=""
            onClick={onClick}
            effect="blur"
            />
            </Paper>
        </Card.Section>
        {customeLowerBox ?? (
          <>
            <Group position="apart" style={{ marginBottom: 10, marginTop: 10 }}>
              <TextN1 weight={500}>Norway Fjord Adventures</TextN1>
              <Badge color="pink" variant="light">
                On Sale
              </Badge>
            </Group>

            <TextN1 size="sm">
              With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway
            </TextN1>

            <Button
              variant="light"
              color="blue"
              fullWidth
              style={{ marginTop: 14 }}
            >
              Book classic tour now
            </Button>
          </>
        )}
      </Card>
    </Paper>
  );
};
export default CardMessage;
