import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Paper, Typography, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selector";
<<<<<<< HEAD

import MailIcon from "@material-ui/icons/Mail";
import Button from '@material-ui/core/Button'

=======
import TabsBar from "../../components/Tabs/Tabs";
import { fetchUserMailsStart } from "../../redux/mails/mail.actions";
import { selectMail } from "../../redux/mails/mail.selector";
import { useEffect } from "react";
import MailGroup from "../../components/MailGroup/MailGroup";
import EditProfile from "../../components/Forms/EditProfile";
>>>>>>> f6a02615cc9d895cb223b4f8231a9e48574c7e65
import Popup from "../../components/popUp";
import MailIcon from "@material-ui/icons/Mail";
import MailForm from "../../components/Forms/mail-form";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: "50px",
    height: "200vh",
  },
}));

const styles = (theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.5em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "2px solid slategrey",
    },
    "input[type=number]::-webkit-inner-spin-button,input[type=number]::-webkit-outer-spin-button":
      {
        "-webkit-appearance": "none",
        margin: 0,
      },
  },
});

const ProfilePage = ({ currentUser, fetchUserMailsStart, mails }) => {
  const classes = useStyles();
  console.log("user: ", currentUser);
  useEffect(() => {
    fetchUserMailsStart();
  }, [fetchUserMailsStart]);
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <Paper className={classes.paper}>
      <TabsBar
        tabs={[
          {
            label: "Mail",
            comp: (
              <>
                <MailGroup canNotReply={1} selectMail={mails} />
                <IconButton onClick={() => setOpenPopup(true)}>
                  <MailIcon />
                </IconButton>
              </>
            ),
          },
          {
            label: "Profile",
            comp: <EditProfile currentUser={currentUser} />,
          },
          {
            label: "Invoices",
            comp: <Typography variant="h3">Invoices</Typography>,
          },
        ]}
      />

      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Mail">
        <MailForm setOpenPopup={setOpenPopup} />
      </Popup>
        
    </Paper>
  );
};

const mapStateToProp = (state) => ({
  currentUser: selectCurrentUser(state),
  mails: selectMail(state),
});

const mapDispatchToProp = (dispatch) => ({
  fetchUserMailsStart: () => dispatch(fetchUserMailsStart()),
});

export default withStyles(styles)(
  connect(mapStateToProp, mapDispatchToProp)(ProfilePage)
);
