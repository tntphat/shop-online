import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: theme.palette.text.main,
  },
  navBar: {
    background: theme.palette.navBar.main,
    color: theme.palette.text.main,
    boxShadow:
      "0 1px 5px -1px rgb(51 62 73 / 14%), 0 4px 10px 0 rgb(51 62 73 / 8%)",
  },
  link: {
    textDecoration: "none",
  },
  btn: {
    background: theme.palette.text.main,
    color: theme.palette.navBar.main,
    "&:hover": {
      background: "#8395a7",
    },
  },
}));

export default function ButtonAppBar({ path }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navBar}>
        <Box
          mx={4}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
          >
            <i className="fas fa-bars"></i>
          </IconButton>
          <Link className={classes.link} to="/">
            <Typography variant="h6" className={classes.title}>
              Home
            </Typography>
          </Link>
          <Link className={classes.link} to={path}>
            <Button className={classes.btn}>
              Sign {path === "/register" ? "Up" : "In"}
            </Button>
          </Link>
        </Box>
      </AppBar>
    </div>
  );
}
