import React from "react";
import { withRouter, useLocation } from "react-router-dom";
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

import DrawerData from "../../constants/authorities.data";

import useStyles from "./drawer.styles";

const DrawerChildren = ({
  children,
  match,
  isMobile,
  handleDrawerClose,
  role,
  ...rest
}) => {
  const classes = useStyles();
  let location = useLocation();
  const locate = location.pathname;
  return (
    <Drawer {...rest}>
      <Box display="flex" flexDirection="row-reverse" alignItems="center">
        <div className={classes.toolbarIcon}>{children}</div>
      </Box>

      <Divider />
      <List>
        {DrawerData.map(
          (item) =>
            role % item.id === 0 && (
              <Link
                key={item.name}
                className={`${classes.link}  ${
                  locate === item.link && classes.active
                } `}
                to={item.link}
              >
                <ListItem
                  // onClick={() => isMobile && handleDrawerClose()}
                  button
                >
                  <ListItemIcon
                    className={` ${locate === item.link && classes.active} `}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </Link>
            )
        )}
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

export default withRouter(DrawerChildren);
