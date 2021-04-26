import React from "react";
import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import BarChartIcon from "@material-ui/icons/BarChart";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Drawer from "@material-ui/core/Drawer";
import DashboardIcon from "@material-ui/icons/Dashboard";
import CategoryIcon from "@material-ui/icons/Category";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  home: {
    height: "100px",
  },

  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  homeIcon: {
    fontSize: "4rem",
  },
  link: {
    textDecoration: "none",
    display: "block",
    color: theme.palette.text.main,
  },
}));

const DrawerChildren = ({ children, ...rest }) => {
  const classes = useStyles();
  return (
    <Drawer {...rest}>
      <Box display="flex" flexDirection="row-reverse" alignItems="center">
        {/* <Box flexGrow="1" textAlign="center">
          <Link className={classes.link} to="/">
            <IconButton className={classes.home}>
              <HomeIcon className={classes.homeIcon} />
            </IconButton>
          </Link>
        </Box> */}
        <div className={classes.toolbarIcon}>{children}</div>
      </Box>

      <Divider />
      <List>
        <Link className={classes.link} to="/admin">
          <ListItem button key="Dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link className={classes.link} to="/admin/mail">
          <ListItem button key="Mail">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Mail" />
          </ListItem>
        </Link>
        <Link className={classes.link} to="/admin/products">
          <ListItem button key="Products">
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </Link>
        <Link className={classes.link} to="/admin/chart">
          <ListItem button key="Chart">
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Chart" />
          </ListItem>
        </Link>
        <Link className={classes.link} to="/admin/employees">
          <ListItem button key="Employees Manage">
            <ListItemIcon>
              <PeopleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Employees Manage" />
          </ListItem>
        </Link>
        <Link className={classes.link} to="/admin/categories">
          <ListItem button key="Categories">
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem button key="Log Out">
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
      <Link className={classes.link} to="/">
        <ListItem button key="Home">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </Link>
    </Drawer>
  );
};

export default DrawerChildren;