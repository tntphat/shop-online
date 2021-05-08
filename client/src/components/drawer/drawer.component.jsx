import React from "react";
import { Link } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";

import DrawerData from "./drawer.data";

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
        {DrawerData.map((item) => (
          <Link key={item.name} className={classes.link} to={item.link}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
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
