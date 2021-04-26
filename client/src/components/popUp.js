import React from "react";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  makeStyles,
  Typography,
  IconButton,
  Box,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
}));

export default function PopUp(props) {
  const { title, children, openPopup, setOpenPopup, setTargetRow } = props;
  const classes = useStyles();
  return (
    <Dialog
      classes={{ paper: classes.dialogWrapper }}
      open={openPopup}
      maxWidth="md"
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Button
            onClick={() => {
              if (setTargetRow) setTargetRow(null);
              setOpenPopup(false);
            }}
          >
            <CloseIcon />{" "}
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
