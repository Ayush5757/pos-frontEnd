import { Carousel } from "@mantine/carousel";
import React, { useRef } from "react";
import { useStyles } from "./style";
import Autoplay from "embla-carousel-autoplay";

const CardCarousel = ({ slidSize,children }) => {
  const slidSizeObj = {
    half: "80%",
    morethen_half: "95%",
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
        { maxWidth: "xs", slideSize: slidSizeObj[slidSize??'half'], slideGap: 6 },
      ]}
      loop
      align="start"
      plugins={[autoplay.current]}
      className={classes.crouselCollection}
      initialSlide={2}
    >
      {children}
    </Carousel>
  );
};

export default CardCarousel;
