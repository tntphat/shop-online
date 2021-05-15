import React, { useContext, useState, useRef, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles, useTheme } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../redux/user/user.selector";
import ThemeContext from "../../contexts/theme.context";

import { signOutStart, testHeader } from "../../redux/user/user.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    background: "red",
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: theme.palette.text.main,
  },
  navBar: {
    background: "transparent",
    color: theme.palette.text.main,
    marginTop: "40px",
    transition: "margin 700ms",
    position: "fixed",
    width: "100%",
    boxShadow: "0 0 0",
    zIndex: 3,
  },
  navBar2: {
    boxShadow:
      "0 1px 5px -1px rgb(51 62 73 / 14%), 0 4px 10px 0 rgb(51 62 73 / 8%)",
    background: theme.palette.navBar.main,
    marginTop: "0px",
  },
  btn: {
    background: "red",
    color: theme.palette.text.main,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.main,
    fontWeight: "400",
  },
  vl: {
    height: "30vh",
    backgroundColor: "red",
    position: "absolute",
  },
}));
console.log("RE RENDERRRR");

const HideAppBar = ({ currentUser, signOutStart, testHeader, location }) => {
  const [reach, setReach] = useState(true);
  const classes = useStyles();
  const { night, setNight } = useContext(ThemeContext);
  const switchTheme = () => {
    setNight(!night);
    Cookies.set("isNight", night);
    console.log(Cookies.get("isNight"));
  };
  const test = (node) => {
    const test2 = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setReach(false);
      } else {
        setReach(true);
      }
    });
    if (node) test2.observe(node);
  };
  return (
    <>
      {location.pathname === "/" ? (
        <Box
          ref={test}
          // ref={`${location.pathname !== "/" ? test : ""}`}
          className={classes.vl}
        />
      ) : (
        <> </>
      )}

      <Box className={`${classes.navBar}  ${reach ? classes.navBar2 : ""}`}>
        <Box
          mx={4}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Hidden smUp>
            <IconButton edge="start" aria-label="menu">
              <i className="fas fa-bars"></i>
            </IconButton>
          </Hidden>

          <IconButton>
            <Link className={classes.link} to="/">
              <i className="fas fa-home"></i>
            </Link>
          </IconButton>

          <Hidden xsDown>
            {!currentUser ? (
              <>
                <Link className={classes.link} to="/sign-in">
                  <Typography variant="h5">Sign In</Typography>
                </Link>

                <Link className={classes.link} to="/register">
                  <Typography variant="h5">Sign Up</Typography>
                </Link>
              </>
            ) : (
              <>
                <Typography variant="h5">{currentUser.firstName}</Typography>

                <IconButton onClick={signOutStart}>SIGN OUT</IconButton>

                <Link className={classes.link} to="/profiles">
                  <Typography variant="h5">Profiles</Typography>
                </Link>
              </>
            )}

            <Link className={classes.link} to="/products">
              <Typography variant="h5">Products</Typography>
            </Link>

            <Link className={classes.link} to="/admin">
              <Typography variant="h5">Admin</Typography>
            </Link>
            <IconButton onClick={switchTheme}>
              <i className="fas fa-adjust"></i>
            </IconButton>
          </Hidden>
        </Box>
      </Box>
    </>
  );
};

const mapStateToProp = (state) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProp = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  testHeader: () => dispatch(testHeader()),
});

export default withRouter(
  connect(mapStateToProp, mapDispatchToProp)(HideAppBar)
);
