import { Typography, Paper } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `20px 0`,
  },
}));

const Footer = () => {
  const location = useLocation();
  const classes = useStyles();

  if (location.pathname.includes("/admin")) return <> </>;

  return (
    <Paper className={classes.root}>
      <Typography align="center" variant="body2">
        ©Copyright 2021. Designed by Fat
      </Typography>
    </Paper>
  );
};

export default Footer;
