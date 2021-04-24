import React, { useState } from "react";

import { Box, Hidden, makeStyles, Typography } from "@material-ui/core";

import { fetchMailsStart } from "../../redux/mails/mail.actions";

import { selectMail } from "../../redux/mails/mail.selector";

import { connect } from "react-redux";

import BoxMails from "../../components/box-mails";
import CardMail from "../../components/CardMail";
import { useEffect } from "react";

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

function AdminMail({ fetchMailsStart, selectMail }) {
  const classes = useStyles();

  const [curMail, setCurMail] = useState(selectMail[0]);
  console.log("sssssss", selectMail);
  useEffect(() => {
    fetchMailsStart();
  }, [fetchMailsStart]);
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
        <CardMail curMail={curMail} />
      </Box>
    </Box>
  );
}

const mapStateToProp = (state) => ({
  selectMail: selectMail(state),
});

const mapDispatchToProp = (dispatch) => ({
  fetchMailsStart: () => dispatch(fetchMailsStart()),
});

export default connect(mapStateToProp, mapDispatchToProp)(AdminMail);
