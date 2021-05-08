import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import Box from "@material-ui/core/Box";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: theme.palette.text.main,
    flexGrow: 1,
  },
  avatar: {
    color: theme.palette.text.main,
    backgroundColor: "#eb4d4b",
  },
}));

export default function ButtonAppBar({ children, ...rest }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar {...rest}>
        <Toolbar>
          <Box>{children}</Box>
          <Typography variant="h6" className={classes.title}>
            ADMIN
          </Typography>
          <IconButton className={classes.menuButton}>
            <Badge badgeContent={4} color="secondary">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>
          <Avatar className={classes.avatar}>F</Avatar>
        </Toolbar>
      </AppBar>
    </div>
  );
}
