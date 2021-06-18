import React from "react";
import { Box, Paper, Typography, Button } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: " 100vw",
  },
  carou: {
    width: "100%",
    height: "100%",
  },
  box: {
    minWidth: "60vw",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: `1px solid ${theme.palette.text.main}`,
    padding: theme.spacing(4),
    borderRadius: theme.spacing(4),
  },
  item: {
    width: "100%",
    height: "100%",
  },
  poster_1: {
    width: "100vw",
    height: "100vh",
    backgroundColor: theme.palette.poster.poster1,
  },
  poster2: {
    width: "100vw",
    height: "100vh",
    backgroundColor: theme.palette.poster.poster2,
  },
  poster3: {
    width: "100vw",
    height: "100vh",
    backgroundColor: theme.palette.poster.poster3,
  },
  btnIndicator: {
    padding: "4px", // 1
    color: theme.palette.poster.indicator,
    "&:hover": {
      color: theme.palette.poster.indicatorHover,
    },
  },
  btnIndicatorActive: {
    color: theme.palette.poster.indicatorActive,
  },
}));

function Posters() {
  const classes = useStyles();
  const history = useHistory();
  return (
    // <Paper className={classes.root}>
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
          //   marginBottom: "200px", // 5
          //   textAlign: "right", // 4
        },
      }}
    >
      <Paper square className={classes.poster_1}>
        <Box className={classes.box}>
          <Typography variant="h2">NUMEROUS PRODUCTS</Typography>
          <Box my={2}>
            <Typography variant="h4">
              Our store has all what u need !
            </Typography>
          </Box>
          <Button onClick={() => history.push("/products")} variant="outlined">
            check it out
          </Button>
        </Box>
      </Paper>
      <Paper square className={classes.poster2}>
        <Box className={classes.box}>
          <Typography variant="h2">FREE SHIP</Typography>
          <Box my={2}>
            <Typography variant="h4">
              U dont need to care about ship fee
            </Typography>
          </Box>
          <Button onClick={() => history.push("/products")} variant="outlined">
            check it out
          </Button>
        </Box>
      </Paper>
      <Paper square className={classes.poster3}>
        <Box className={classes.box}>
          <Typography variant="h2">ON TIME </Typography>
          <Box my={2}>
            <Typography variant="h4">
              If we were late, we would give u valuable vouchers
            </Typography>
          </Box>
          <Button onClick={() => history.push("/products")} variant="outlined">
            check it out
          </Button>
        </Box>
      </Paper>
    </Carousel>
    // </Paper>
  );
}

export default Posters;
