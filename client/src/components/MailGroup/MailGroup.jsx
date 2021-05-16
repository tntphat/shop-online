import React, { useState, useEffect } from "react";
import { Box, Hidden, makeStyles } from "@material-ui/core";
import BoxMails from "../box-mails";
import CardMail from "../CardMail";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: "36ch",
    maxHeight: "82vh",
    // border: "2px #424242 solid",
    // backgroundColor: "#757575",
    // boxSizing: "content-box",
    padding: theme.spacing(1),
    // overflow: "auto",
    // backgroundColor: theme.palette.background.paper,
  },
  cardMail: {
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(1),
    },
    maxHeight: "100%",
    width: "100%",
  },
}));

export default function AdminMail({ selectMail, canNotReply }) {
  const classes = useStyles();

  const [curMail, setCurMail] = useState(null);
  return (
    <Box className={classes.root} display="flex">
      <Hidden xsDown>
        <BoxMails
          curMail={curMail}
          mails={selectMail}
          setCurMail={setCurMail}
        />
      </Hidden>
      <Box className={classes.cardMail} display="flex" flexDirection="column">
        {curMail ? (
          <CardMail canNotReply={canNotReply} curMail={curMail} />
        ) : (
          <> </>
        )}
      </Box>
    </Box>
  );
}
