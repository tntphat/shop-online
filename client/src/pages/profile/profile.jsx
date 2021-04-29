import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Paper, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selector";
import MailIcon from "@material-ui/icons/Mail";
import Popup from "../../components/popUp";
import MailForm from "../../components/Forms/mail-form";

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: "60px",
    height: "200vh",
  },
}));

const ProfilePage = ({ currentUser }) => {
  console.log(currentUser);
  const [openPopup, setOpenPopup] = useState(false);
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Typography variant="h3">
        {currentUser.firstName + " " + currentUser.lastName}
      </Typography>
      <Typography variant="h5"> {currentUser.email}</Typography>

      <IconButton onClick={() => setOpenPopup(true)}>
        <MailIcon />
      </IconButton>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Mail">
        <MailForm setOpenPopup={setOpenPopup} />
      </Popup>
    </Paper>
  );
};

const mapStateToProp = (state) => ({
  currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProp)(ProfilePage);
