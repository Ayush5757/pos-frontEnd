import { Carousel } from "@mantine/carousel";
import React, { useRef } from "react";
import { CardCustome } from "../../components/Card";
import Autoplay from "embla-carousel-autoplay";
import { useStyles } from "./style";

const CollectionCrousel = ({slidSize}) => {
  const slidSizeObj = {
    "half":'80%',
    "full":'100%'
  }
  const autoplay = useRef(Autoplay({ delay: 7000 }));
  const { classes } = useStyles();
  return (
    <Carousel
      withIndicators
      slideSize="100%"
      slideGap="md"
      breakpoints={[
        { maxWidth: 'xs', slideSize: slidSizeObj[slidSize], slideGap: 20 },
      ]}
      loop
      align="start"
      plugins={[autoplay.current]}
      className={classes.crouselCollection}
    >
      <Carousel.Slide>
        <CardCustome
          // title="ar"
          // description={"sada0"}
          image={
            "https://staticg.sportskeeda.com/editor/2022/01/5a341-16426304912639-1920.jpg"
          }
          action={{ label: "saasda", link: "asd" }}
        />
      </Carousel.Slide>
      <Carousel.Slide>
        {" "}
        <CardCustome
          // title="ar"
          // description={"sada0"}
          image={
            "https://staticg.sportskeeda.com/editor/2022/01/5a341-16426304912639-1920.jpg"
          }
          action={{ label: "saasda", link: "asd" }}
        />
      </Carousel.Slide>
      <Carousel.Slide>
        {" "}
        <CardCustome
          // title="ar"
          // description={"sada0"}
          image={
            "https://staticg.sportskeeda.com/editor/2022/01/5a341-16426304912639-1920.jpg"
          }
          action={{ label: "saasda", link: "asd" }}
        />
      </Carousel.Slide>
    </Carousel>
  );
};

export default CollectionCrousel;
