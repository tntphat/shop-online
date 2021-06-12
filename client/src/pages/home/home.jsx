import React from "react";
import { Paper, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

import Carousel from "../../components/carousel/carousel";

import "./home.css";

const HomePage = () => {
  return (
    <Paper>
      <section className="hero"></section>
      <Grid container>
        <Grid item sm={2} />
        <Grid item sm={8}>
          <Carousel />
        </Grid>
        <Grid item sm={2} />
      </Grid>
      <section className="blank"></section>
    </Paper>
  );
};

export default HomePage;
