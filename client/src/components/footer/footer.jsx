import { Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `20px 0`,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography align="center" variant="body2">
        ©Copyright 2021. Designed by Fat
      </Typography>
    </Paper>
  );
};

export default Footer;
