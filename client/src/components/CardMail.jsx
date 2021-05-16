import React, { useState } from "react";
import moment from "moment";

import Popup from "./popUp";
import MailForm from "./Forms/mail-form";
import SlateRender from "./controls/SlateRender";

import {
  Card,
  makeStyles,
  Typography,
  CardContent,
  CardHeader,
  Avatar,
  Divider,
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
function CardMail({ curMail, canNotReply }) {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const Action =
    !curMail.reply && !canNotReply ? (
      <MenuMoovert setOpenPopup={setOpenPopup} />
    ) : (
      <> </>
    );
  return curMail ? (
    <>
      <Typography variant="overline">{curMail.title}</Typography>
      <Card className={classes.root}>
        {curMail.reply ? (
          <>
            <CardHeader
              avatar={<Avatar aria-label="recipe">A</Avatar>}
              title={"Admin"}
            />
            <CardContent>
              <SlateRender content={curMail.reply} />
            </CardContent>
            <Divider light />
          </>
        ) : (
          <></>
        )}
        <CardHeader
          avatar={<Avatar aria-label="recipe">C</Avatar>}
          title={`${curMail.mail_author.firstName} ${curMail.mail_author.lastName}`}
          subheader={moment(curMail.createdAt).format("MMMM Do YYYY")}
          action={Action}
        />

        <CardContent>
          <SlateRender content={curMail.content} />
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
