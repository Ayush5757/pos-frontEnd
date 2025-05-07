import React from "react";
import { useStyles } from "./style";
import {
  IconBookmark,
  IconHeart,
  IconShare,
  IconThumbDown,
} from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  rem,
  Box,
  Grid,
  Paper,
} from "@mantine/core";
import { IconThumbDownFilled } from "@tabler/icons-react";
import { TextN1 } from "../../components/Text";

const GeneralNotificationContainer = () => {
  const { classes } = useStyles();
  const linkProps = {
    href: "https://mantine.dev",
    target: "_blank",
    rel: "noopener noreferrer",
  };
  const theme = useMantineTheme();
  return (
    <Box className={classes.big_box}>
      <Grid gutter={0} className={classes.big_grid}>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => {
          return (
            <Paper shadow="xl" mt={10}>
              <Grid className={classes.heading} gutter={0}>
                <Grid.Col span={12} className={classes.view_btn_grid}>
                  <Card withBorder radius="md" className={classes.card}>
                    <Card.Section>
                      <a {...linkProps}>
                        <Image
                          src="https://i.imgur.com/Cij5vdL.png"
                          height={180}
                        />
                      </a>
                    </Card.Section>
                    <Grid gutter={0} mt={10} mb={10}>
                      <Grid.Col span={12}>
                        <TextN1 className={classes.title}>
                          10% off on Pizza menia double chizz
                        </TextN1>
                      </Grid.Col>
                    </Grid>

                    <Text fz="sm" c="dimmed">
                      Come faster and enjoy your meal with your friends and family..
                    </Text>

                    <Group justify="space-between" className={classes.footer}>
                      <Center>
                        <Text fz="sm" inline>
                          Bill Wormeater
                        </Text>
                      </Center>

                      <Group gap={8} mr={0}>
                        <ActionIcon className={classes.action}>
                          <IconHeart
                            style={{ width: rem(16), height: rem(16) }}
                            color={theme.colors.red[6]}
                          />
                        </ActionIcon>
                        <ActionIcon className={classes.action}>
                          <IconThumbDown
                            style={{ width: rem(16), height: rem(16) }}
                            color={theme.colors.red[6]}
                          />
                        </ActionIcon>
                      </Group>
                    </Group>
                  </Card>
                </Grid.Col>
              </Grid>
            </Paper>
          );
        })}
      </Grid>
    </Box>
  );
};

export default GeneralNotificationContainer;
