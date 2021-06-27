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
import StoreOutlinedIcon from "@material-ui/icons/StoreOutlined";

import DrawerHeader from "../drawer-header/drawer-header";
import { signOutStart } from "../../redux/user/user.actions";

import dataHeaderDrawer from "../../constants/header.data";

import useStyles from "./header.styles";

const HideAppBar = ({ currentUser, signOutStart, location, history }) => {
  const [reach, setReach] = useState(true);
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  const { night, setNight } = useContext(ThemeContext);
  const { hidden, toggleHidden, cartItemsCount } = useContext(CartContext);
  const switchTheme = () => {
    setNight(!night);
    Cookies.set("isNight", night);
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
          <Box className={classes.firstRow} display="flex" flexDirection="row">
            <Hidden smDown>
              <IconButton onClick={() => history.push("/")}>
                <StoreOutlinedIcon />
              </IconButton>
            </Hidden>
            <form
              style={{ margin: "auto 0" }}
              onSubmit={(e) => {
                e.preventDefault();
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
            <Hidden xsDown>
              {dataHeaderDrawer.map((item) => (
                <Link key={item.name} className={classes.link} to={item.link}>
                  <Typography className={classes.headerTitle} variant="body1">
                    {item.name}
                  </Typography>
                </Link>
              ))}
            </Hidden>
          </Box>

          <Box
            className={classes.thirdRow}
            justifyContent="space-between"
            display="flex"
            flexDirection="row"
          >
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
                  className={classes.btnAuth}
                  onClick={() => {
                    setIsIn(true);
                    setOpenPopup(true);
                  }}
                >
                  Log in
                </Button>
                <Hidden smDown>
                  <Button
                    className={classes.btnAuth}
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
});

export default withRouter(
  connect(mapStateToProp, mapDispatchToProp)(HideAppBar)
);
