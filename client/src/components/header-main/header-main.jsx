import React, { useContext, useState, useRef, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles, fade } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    cursor: "default",
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "0",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
console.log("RE RENDERRRR");

const HideAppBar = ({
  currentUser,
  signOutStart,
  testHeader,
  location,
  history,
}) => {
  const [reach, setReach] = useState(true);
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
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
        <Box ref={test} className={classes.vl} />
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
          <Box>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(searchValue);
                history.push(`/products?kw=${searchValue}`);
                setSearchValue("");
              }}
            >
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </form>
          </Box>

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
