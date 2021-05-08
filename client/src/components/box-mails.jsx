import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
    width: "36ch",
    minWidth: "36ch",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      minWidth: "24ch",
    },
  },
  inline: {
    display: "inline",
  },
  description: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: "2",
    overflow: "hidden",
  },
  active: {
    backgroundColor: "#84817a",
  },
}));

export default function AlignItemsList({ curMail, mails, setCurMail }) {
  const classes = useStyles();
  console.log("This IS MAILSSSS", mails);
  return (
    <List className={classes.root}>
      {mails.map((mail) => (
        <>
          <ListItem
            button
            alignItems="flex-start"
            onClick={() => setCurMail(mail)}
            className={curMail && mail._id === curMail._id && classes.active}
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={mail.title}
              secondary={
                <React.Fragment>
                  <div className={classes.description}>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {mail.mail_author.firstName}
                    </Typography>
                    {` — ${mail.content}`}
                  </div>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </List>
  );
}
