import { Carousel } from "@mantine/carousel";
import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import CardMessage from "../../components/Card/CardMessage";
import { useStyles } from "./style";

const CardCrousel = ({ slidSize }) => {
  const slidSizeObj = {
    half: "80%",
    full: "100%",
  };
  const autoplay = useRef(Autoplay({ delay: 7000 }));
  const { classes } = useStyles();
  return (
    <Carousel
      withIndicators
      slideSize="100%"
      slideGap="md"
      breakpoints={[
        { maxWidth: "xs", slideSize: slidSizeObj[slidSize], slideGap: 20 },
      ]}
      loop
      align="start"
      plugins={[autoplay.current]}
      className={classes.crouselCollection}
    >
      <Carousel.Slide>
        <CardMessage />
      </Carousel.Slide>
      <Carousel.Slide>
        <CardMessage />
      </Carousel.Slide>
      <Carousel.Slide>
        <CardMessage />
      </Carousel.Slide>
    </Carousel>
  );
};

export default CardCrousel;
