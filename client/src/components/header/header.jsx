import React, { useContext, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles, fade } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Badge from "@material-ui/core/Badge";
import Hidden from "@material-ui/core/Hidden";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";
import Cart from "../cart/cart.outside";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../redux/user/user.selector";
import ThemeContext from "../../contexts/theme.context";
import { CartContext } from "../../providers/cart/cart.provider";

import SignInForm from "../Forms/Auth";

import Popup from "../../features/popUp";

import DrawerHeader from "../drawer-header/drawer-header";
import { signOutStart, testHeader } from "../../redux/user/user.actions";

import dataHeaderDrawer from "../../constants/header.data";

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
    margin: "auto 20px",
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
    with: "100%",
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

const HideAppBar = ({ currentUser, signOutStart, location, history }) => {
  const [reach, setReach] = useState(true);
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const { night, setNight } = useContext(ThemeContext);
  const { hidden, toggleHidden, cartItemsCount } = useContext(CartContext);
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

  const [openPopup, setOpenPopup] = useState(false);
  const [isIn, setIsIn] = useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer((prev) => !prev);
  };

  if (location.pathname.includes("/admin")) return <> </>;

  return (
    <>
      {location.pathname === "/" ? (
        <Box ref={test} className={classes.vl} />
      ) : (
        <> </>
      )}

      <DrawerHeader
        openDrawer={openDrawer}
        toggleDrawer={toggleDrawer}
        items={dataHeaderDrawer}
      />

      <Box className={`${classes.navBar}  ${reach ? classes.navBar2 : ""}`}>
        <Box
          mx={4}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Hidden smUp>
            <IconButton edge="start" aria-label="menu" onClick={toggleDrawer}>
              <i className="fas fa-bars"></i>
            </IconButton>
          </Hidden>
          <Box display="flex" flexDirection="row" flex={1}>
            <Hidden xsDown>
              {dataHeaderDrawer.map((item) => (
                <Link className={classes.link} to={item.link}>
                  <Typography variant="h5">{item.name}</Typography>
                </Link>
              ))}
            </Hidden>

            <form
              style={{ margin: "auto 0" }}
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
          <Box display="flex" flexDirection="row">
            <IconButton
              style={{ zIndex: 4 }}
              onClick={(e) => {
                toggleHidden();
              }}
            >
              <Badge badgeContent={`${cartItemsCount}`} color="secondary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>

            {!currentUser ? (
              <>
                <Button
                  style={{ margin: "auto 20px" }}
                  onClick={() => {
                    setIsIn(true);
                    setOpenPopup(true);
                  }}
                >
                  Log in
                </Button>
                <Hidden smDown>
                  <Button
                    style={{ margin: "auto 20px" }}
                    onClick={() => {
                      setIsIn(false);
                      setOpenPopup(true);
                    }}
                  >
                    Sign up
                  </Button>
                </Hidden>
              </>
            ) : (
              <>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  {(currentUser && currentUser.firstName) || "Name"}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      history.push("/profiles");
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      signOutStart({ history });
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}

            <IconButton onClick={switchTheme}>
              <i className="fas fa-adjust"></i>
            </IconButton>
          </Box>
        </Box>
        {hidden ? null : <Cart />}
      </Box>

      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title={!isIn ? "Sign Up" : "Sign In"}
      >
        <SignInForm isIn={isIn} setIsIn={setIsIn} setOpenPopup={setOpenPopup} />
      </Popup>
    </>
  );
};

const mapStateToProp = (state) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProp = (dispatch) => ({
  signOutStart: (history) => dispatch(signOutStart(history)),
  testHeader: () => dispatch(testHeader()),
});

export default withRouter(
  connect(mapStateToProp, mapDispatchToProp)(HideAppBar)
);
