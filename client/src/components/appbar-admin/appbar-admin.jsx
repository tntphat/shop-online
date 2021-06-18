import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import Box from "@material-ui/core/Box";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Search from "../../components/search/search";

import { signOutStart } from "../../redux/user/user.actions";
import { Button } from "@material-ui/core";

import useStyles from "./appbar-admin.styles";

function AppbarAdmin({ children, signOutStart, user, setOpenPopup, ...rest }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOutStart({ history });

    // history.push("/");
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );
  const classes = useStyles();
  console.log(children);
  return (
    <div className={classes.root}>
      <AppBar {...rest}>
        <Toolbar>
          <Box>{children}</Box>
          <Search />
          <div className={classes.title}></div>

          {user && user.authority ? (
            <>
              <IconButton className={classes.menuButton}>
                <Badge badgeContent={4} color="secondary">
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </>
          ) : (
            <Button onClick={() => setOpenPopup(true)}>Sign In</Button>
          )}

          {/* <Avatar className={classes.avatar}>F</Avatar> */}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  signOutStart: (history) => dispatch(signOutStart(history)),
});

export default connect(null, mapDispatchToProps)(AppbarAdmin);
