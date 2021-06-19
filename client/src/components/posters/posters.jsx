import React from "react";
import { Box, Paper, Typography, Button } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import dataPosters from "../../constants/posters.data";

import useStyles from "./posters.styles";

function Posters() {
  const classes = useStyles();
  const arrPost = [classes.poster1, classes.poster2, classes.poster3];
  const history = useHistory();
  return (
    <Carousel
      className={classes.root}
      //   autoPlay={false}
      timeout={100}
      indicatorIconButtonProps={{
        className: classes.btnIndicator,
      }}
      activeIndicatorIconButtonProps={{
        className: classes.btnIndicatorActive,
      }}
      indicatorContainerProps={{
        style: {
          position: "absolute",
          bottom: "50px",
        },
      }}
    >
      {dataPosters.map((poster, ind) => (
        <Paper square className={`${classes.poster} ${arrPost[ind]}`}>
          <Box className={classes.box}>
            <Typography className={classes.title} variant="h2">
              {poster.title}
            </Typography>
            <Typography className={classes.caption} variant="h4">
              {poster.caption}
            </Typography>
            <Button
              onClick={() => history.push(poster.link)}
              variant="outlined"
            >
              {poster.btn}
            </Button>
          </Box>
        </Paper>
      ))}
    </Carousel>
  );
}

export default Posters;
