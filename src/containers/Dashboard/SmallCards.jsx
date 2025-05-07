import { ActionIcon, Box, Card, Grid, Image } from "@mantine/core";
import React from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { useStyles } from "./style";
import { TextN1 } from "../../components/Text";

const SmallCards = () => {
  const { classes } = useStyles();
  return (
    <>
      <Grid.Col span={12}>
        <Grid style={{ marginTop: "0px" }}>
          <Grid.Col span={6} className={classes.headingCards}>
            <TextN1 size="sm" weight={700} className={classes.service}>
              Services
            </TextN1>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box
              className={classes.arrow}
            >
              <ActionIcon>
                <IconChevronRight className={classes.arrowBtn}/>
              </ActionIcon>
            </Box>
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={3}>
        <Card
          style={{ maxWidth: "100%", padding: "0" }}
          radius="md"
          className={classes.Card}
         
        >
          <Box className={classes.cardIimageContainer}>
            <Image
              src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
              height={130}
              fit="cover"
              radius={{ topLeft: "md", topRight: "md" }}
              className="card-image"
            />
            <Box className={classes.cardText}>
              <TextN1
                size="sm"
                weight={700}
                style={{ textAlign: "start" }}
                color="white"
              >
                Card Titleisgood
              </TextN1>
            </Box>
          </Box>
        </Card>
      </Grid.Col>

      <Grid.Col span={3}>
        <Card
          style={{ maxWidth: "100%", padding: "0" }}
          radius="md"
          className={classes.Card}
         
        >
          <Box className={classes.cardIimageContainer}>
            <Image
              src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
              height={130}
              fit="cover"
              radius={{ topLeft: "md", topRight: "md" }}
              className="card-image"
            />
            <Box className={classes.cardText}>
              <TextN1
                size="sm"
                weight={700}
                style={{ textAlign: "start" }}
                color="white"
              >
                Titleisgood
              </TextN1>
            </Box>
          </Box>
        </Card>
      </Grid.Col>

      <Grid.Col span={3}>
        <Card
          style={{ maxWidth: "100%", padding: "0" }}
          radius="md"
          className={classes.Card}
         
        >
          <Box className={classes.cardIimageContainer}>
            <Image
              src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
              height={130}
              fit="cover"
              radius={{ topLeft: "md", topRight: "md" }}
              className="card-image"
            />
            <Box className={classes.cardText}>
              <TextN1
                size="sm"
                weight={700}
                style={{ textAlign: "start" }}
                color="white"
              >
                Work Hard
              </TextN1>
            </Box>
          </Box>
        </Card>
      </Grid.Col>

      <Grid.Col span={3}>
        <Card
          style={{ maxWidth: "100%", padding: "0" }}
          radius="md"
          className={classes.Card}
        >
          <Box className={classes.cardIimageContainer}>
            <Image
              src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
              height={130}
              fit="cover"
              radius={{ topLeft: "md", topRight: "md" }}
              className="card-image"
            />
            <Box className={classes.cardText}>
              <TextN1
                size="sm"
                weight={700}
                style={{ textAlign: "start" }}
                color="white"
              >
                Card
              </TextN1>
            </Box>
          </Box>
        </Card>
      </Grid.Col>

      <Grid.Col span={12}>
        <Grid style={{ marginTop: "10px" }}>
          <Grid.Col span={6} className={classes.headingCards}>
            <TextN1 size="sm" weight={700} className={classes.service}>
              Services
            </TextN1>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box
              className={classes.arrow}
            >
              <ActionIcon>
                <IconChevronRight className={classes.arrowBtn} />
              </ActionIcon>
            </Box>
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={3}>
        <Card
          style={{ maxWidth: "100%", padding: "0" }}
          radius="md"
          className={classes.Card}
         

        >
          <Box className={classes.cardIimageContainer}>
            <Image
              src="https://m.media-amazon.com/images/M/MV5BNmY3MWYwNWUtMTExYy00YjFmLTljMzctMzgyN2VkZWEyMWEzL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTk3OTMzOA@@._V1_FMjpg_UX1000_.jpg"
              height={130}
              fit="cover"
              radius={{ topLeft: "md", topRight: "md" }}
              className="card-image"
            />
            <Box className={classes.cardText}>
              <TextN1
                size="sm"
                weight={700}
                style={{ textAlign: "start" }}
                color="white"
              >
                Card Titleisgood
              </TextN1>
            </Box>
          </Box>
        </Card>
      </Grid.Col>

      <Grid.Col span={3}>
        <Card
          style={{ maxWidth: "100%", padding: "0" }}
          radius="md"
          className={classes.Card}
         

        >
          <Box className={classes.cardIimageContainer}>
            <Image
              src="https://m.media-amazon.com/images/M/MV5BNmY3MWYwNWUtMTExYy00YjFmLTljMzctMzgyN2VkZWEyMWEzL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTk3OTMzOA@@._V1_FMjpg_UX1000_.jpg"
              height={130}
              fit="cover"
              radius={{ topLeft: "md", topRight: "md" }}
              className="card-image"
            />
            <Box className={classes.cardText}>
              <TextN1
                size="sm"
                weight={700}
                style={{ textAlign: "start" }}
                color="white"
              >
                Titleisgood
              </TextN1>
            </Box>
          </Box>
        </Card>
      </Grid.Col>

      <Grid.Col span={3}>
        <Card
          style={{ maxWidth: "100%", padding: "0" }}
          radius="md"
          className={classes.Card}
         

        >
          <Box className={classes.cardIimageContainer}>
            <Image
              src="https://m.media-amazon.com/images/M/MV5BNmY3MWYwNWUtMTExYy00YjFmLTljMzctMzgyN2VkZWEyMWEzL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTk3OTMzOA@@._V1_FMjpg_UX1000_.jpg"
              height={130}
              fit="cover"
              radius={{ topLeft: "md", topRight: "md" }}
              className="card-image"
            />
            <Box className={classes.cardText}>
              <TextN1
                size="sm"
                weight={700}
                style={{ textAlign: "start" }}
                color="white"
              >
                Work Hard
              </TextN1>
            </Box>
          </Box>
        </Card>
      </Grid.Col>

      <Grid.Col span={3}>
        <Card
          style={{ maxWidth: "100%", padding: "0" }}
          radius="md"
          className={classes.Card}
         

        >
          <Box className={classes.cardIimageContainer}>
            <Image
              src="https://m.media-amazon.com/images/M/MV5BNmY3MWYwNWUtMTExYy00YjFmLTljMzctMzgyN2VkZWEyMWEzL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTk3OTMzOA@@._V1_FMjpg_UX1000_.jpg"
              height={130}
              fit="cover"
              radius={{ topLeft: "md", topRight: "md" }}
              className="card-image"
            />
            <Box className={classes.cardText}>
              <TextN1
                size="sm"
                weight={700}
                style={{ textAlign: "start" }}
                color="white"
              >
                Card
              </TextN1>
            </Box>
          </Box>
        </Card>
      </Grid.Col>

      <Grid.Col span={12}>
        <Grid style={{ marginTop: "10px" }}>
          <Grid.Col span={6} className={classes.headingCards}>
            <TextN1 size="sm" weight={700} className={classes.service}>
              Services
            </TextN1>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box
              className={classes.arrow}
            >
              <ActionIcon>
                <IconChevronRight className={classes.arrowBtn} />
              </ActionIcon>
            </Box>
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={3}>
        <Card
          style={{ maxWidth: "100%", padding: "0" }}
          radius="md"
          className={classes.Card}
         

        >
          <Box className={classes.cardIimageContainer}>
            <Image
              src="https://img2.wallspic.com/previews/0/0/1/4/7/174100/174100-anime-goku-anime_art-dragon_ball-cartoon-500x.jpg"
              height={130}
              fit="cover"
              radius={{ topLeft: "md", topRight: "md" }}
              className="card-image"
            />
            <Box className={classes.cardText}>
              <TextN1
                size="sm"
                weight={700}
                style={{ textAlign: "start" }}
                color="white"
              >
                Card Titleisgood
              </TextN1>
            </Box>
          </Box>
        </Card>
      </Grid.Col>

      <Grid.Col span={3}>
        <Card
          style={{ maxWidth: "100%", padding: "0" }}
          radius="md"
          className={classes.Card}
         

        >
          <Box className={classes.cardIimageContainer}>
            <Image
              src="https://img2.wallspic.com/previews/0/0/1/4/7/174100/174100-anime-goku-anime_art-dragon_ball-cartoon-500x.jpg"
              height={130}
              fit="cover"
              radius={{ topLeft: "md", topRight: "md" }}
              className="card-image"
            />
            <Box className={classes.cardText}>
              <TextN1
                size="sm"
                weight={700}
                style={{ textAlign: "start" }}
                color="white"
              >
                Titleisgood
              </TextN1>
            </Box>
          </Box>
        </Card>
      </Grid.Col>

      <Grid.Col span={3}>
        <Card
          style={{ maxWidth: "100%", padding: "0" }}
          radius="md"
          className={classes.Card}
         

        >
          <Box className={classes.cardIimageContainer}>
            <Image
              src="https://img2.wallspic.com/previews/0/0/1/4/7/174100/174100-anime-goku-anime_art-dragon_ball-cartoon-500x.jpg"
              height={130}
              fit="cover"
              radius={{ topLeft: "md", topRight: "md" }}
              className="card-image"
            />
            <Box className={classes.cardText}>
              <TextN1
                size="sm"
                weight={700}
                style={{ textAlign: "start" }}
                color="white"
              >
                Work Hard
              </TextN1>
            </Box>
          </Box>
        </Card>
      </Grid.Col>
      <Grid.Col span={3}>
        <Card
          style={{ maxWidth: "100%", padding: "0" }}
          radius="md"
          className={classes.Card}
         

        >
          <Box className={classes.cardIimageContainer}>
            <Image
              src="https://img2.wallspic.com/previews/0/0/1/4/7/174100/174100-anime-goku-anime_art-dragon_ball-cartoon-500x.jpg"
              height={130}
              fit="cover"
              radius={{ topLeft: "md", topRight: "md" }}
              className="card-image"
            />
            <Box className={classes.cardText}>
              <TextN1
                size="sm"
                weight={700}
                style={{ textAlign: "start" }}
                color="white"
              >
                Card
              </TextN1>
            </Box>
          </Box>
        </Card>
      </Grid.Col>
    </>
  );
};

export default SmallCards;
