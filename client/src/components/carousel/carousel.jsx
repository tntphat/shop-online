import React from "react";
import Carousel from "react-material-ui-carousel";
import { Box } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Card from "../card/card.component";

function CarouselOverview({ items }) {
  const fourFirst = items.slice(0, 3);
  const fourNext = items.slice(3, 6);
  return (
    <Carousel
      NextIcon={<ArrowForwardIosIcon />}
      PrevIcon={<ArrowBackIosIcon />}
      autoPlay={false}
      animation="slide"
      indicators={false}
      timeout={700}
    >
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        {fourFirst.map((item, i) => (
          <Box key={i} style={{ width: "200px" }}>
            <Card product={item} key={i} hideBtn />
          </Box>
        ))}
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        {fourNext.map((item, i) => (
          <Box key={i} style={{ width: "200px" }}>
            <Card product={item} key={i} hideBtn />
          </Box>
        ))}
      </Box>
    </Carousel>
  );
}

export default CarouselOverview;
