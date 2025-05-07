import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  cardOnly: {
    // border:'1px solid #e3e6e8',
    transition: '0.3s ease-in-out',
    cursor: 'pointer',
    '&:hover':{
      transform: 'translateY(-7px)',
    }
  },
  crouselCollection:{
    '.mantine-vcl0d1':{
      display:'none'
    },
    '.mantine-Carousel-indicators':{
      display:'none'   
    }
  },
  image:{
    objectFit: 'cover'
  }
}));
