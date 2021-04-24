import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles, ThemeProvider } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    top: theme.spacing(9),
  },
}));

export default function Notifacation(props) {
  const { notify, setNotify } = props;
  const classes = useStyles();
  function handleClose(event, reason) {
    if (reason === "clickaway") return;
    setNotify({
      ...notify,
      isOpen: false,
    });
  }
  return (
    <Snackbar
      className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
