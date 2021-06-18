import React, { useState } from "react";
import { Box, Hidden } from "@material-ui/core";
import BoxMails from "../box-mails/box-mails";
import CardMail from "../CardMail";

import useStyles from "./MailGroup.styles";

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
