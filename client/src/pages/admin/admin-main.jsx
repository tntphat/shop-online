import React, { useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import AdminHome from "./admin-home";
import AdminChart from "./admin-chart";
import AdminMail from "./admin-mail";
import AdminProduct from "./admin-product";
import AdminProductAdd from "./admin-pruduct-add";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import DrawerChildren from "../../components/drawer/drawer.component";
import NavBar from "../../components/appbar-admin/appbar-admin";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerShift: {
    width: "60px",
  },
  // appBar: {
  //   [theme.breakpoints.up("md")]: {
  //     width: `calc(100% - ${drawerWidth}px)`,
  //     marginLeft: drawerWidth,
  //   },
  //   backgroundColor: theme.palette.navBar.main,
  // },
  appBar: {
    backgroundColor: theme.palette.navBar.main,
    [theme.breakpoints.down("sm")]: {
      width: `100% !important`,
    },
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    width: "100%",
    padding: theme.spacing(1),
  },
  home: {
    height: "100px",
  },
  homeIcon: {
    fontSize: "4rem",
  },
  menuButton: {
    marginRight: 36,
    color: theme.palette.text.main,
  },
  menuButtonHidden: {
    display: "none",
  },
  drawerPaper: {
    float: "left",
    // position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(5),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
}));

function AdminPage(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  console.log(open);
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar
        position="absolute"
        className={`${classes.appBar}  ${open && classes.appBarShift} `}
      >
        <Hidden smDown>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={`${classes.menuButton}  ${
              open && classes.menuButtonHidden
            } `}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden mdUp>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </NavBar>
      <nav
        className={`${classes.drawer}  ${!open && classes.drawerShift} `}
        aria-label="mailbox folders"
      >
        <Hidden mdUp implementation="css">
          <DrawerChildren
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          ></DrawerChildren>
        </Hidden>
        <Hidden smDown implementation="css">
          <DrawerChildren
            classes={{
              paper: `${classes.drawerPaper}  ${
                !open ? classes.drawerPaperClose : ""
              } `,
            }}
            variant="permanent"
            open={open}
          >
            <IconButton onClick={handleDrawerClose}>
              <ArrowBackIosIcon />
            </IconButton>
          </DrawerChildren>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path="/admin" component={AdminHome} />
          <Route exact path="/admin/chart" component={AdminChart} />
          <Route exact path="/admin/mail" component={AdminMail} />
          <Route exact path="/admin/products" component={AdminProduct} />
          <Route exact path="/admin/products/add" component={AdminProductAdd} />
        </Switch>
      </main>
    </div>
  );
}

AdminPage.propTypes = {
  window: PropTypes.func,
};

export default withRouter(AdminPage);
