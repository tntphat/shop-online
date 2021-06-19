import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function DrawerHeader({
  openDrawer,
  toggleDrawer,
  items,
  items2,
}) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div>
      <Drawer anchor={"left"} open={openDrawer} onClose={toggleDrawer}>
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            {items.map((item) => (
              <div key={item.name}>
                <ListItem button onClick={() => history.push(item.link)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}
