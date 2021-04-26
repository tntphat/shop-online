import React, { useState } from "react";
import moment from "moment";

import Popup from "./popUp";
import MailForm from "./mail-form";

import {
  Box,
  Hidden,
  Card,
  makeStyles,
  Typography,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  withStyles,
} from "@material-ui/core";

// import MoreVertIcon from "@material-ui/icons/MoreVert";

import MenuMoovert from "./menu-moovert";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    // minWidth: "100%",
    padding: theme.spacing(2),
    overflow: "auto",
  },
}));
function CardMail({ curMail }) {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  return curMail ? (
    <>
      <Typography variant="overline">{curMail.title}</Typography>
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar aria-label="recipe">R</Avatar>}
          action={
            <>
              <MenuMoovert setOpenPopup={setOpenPopup} />
              {/* <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton> */}
            </>
          }
          title={`${curMail.mail_author.firstName} ${curMail.mail_author.lastName}`}
          subheader={moment(curMail.createdAt).format("MMMM Do YYYY")}
        />
        <CardContent>
          <Typography>{curMail.content}</Typography>
        </CardContent>
      </Card>

      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Mail">
        <MailForm setOpenPopup={setOpenPopup} idMail={curMail._id} />
      </Popup>
    </>
  ) : (
    <> </>
  );
}

export default CardMail;
