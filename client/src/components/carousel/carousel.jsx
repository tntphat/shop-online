import React from "react";
import { useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { Box } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Card from "../card/card.component";

function Example(props) {
  const products = useSelector((state) => state.product.products);
  const fourFirst = products.slice(0, 3);
  const fourNext = products.slice(4, 5);
  return (
    <Carousel
      NextIcon={<ArrowForwardIosIcon />}
      PrevIcon={<ArrowBackIosIcon />}
      //   autoPlay={false}
      animation="slide"
      indicators={false}
      timeout={700}
    >
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        {fourFirst.map((item, i) => (
          <Box style={{ width: "200px" }}>
            <Card product={item} key={i} hideBtn />
          </Box>
        ))}
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        {fourNext.map((item, i) => (
          <Box style={{ width: "200px" }}>
            <Card product={item} key={i} hideBtn />
          </Box>
        ))}
      </Box>
    </Carousel>
  );
}

export default Example;
