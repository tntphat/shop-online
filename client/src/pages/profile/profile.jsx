import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Paper, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selector";

import MailIcon from "@material-ui/icons/Mail";

import TabsBar from "../../components/Tabs/Tabs";
import { fetchUserMailsStart } from "../../redux/mails/mail.actions";
import { selectMail } from "../../redux/mails/mail.selector";
import { useEffect } from "react";
import MailGroup from "../../components/MailGroup/MailGroup";
import EditProfile from "../../components/Forms/EditProfile";
import Invoices from "../../components/invoices/invoices";
import Popup from "../../features/popUp";
import MailForm from "../../components/Forms/mail-form";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: "50px",
    minHeight: "92vh",
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
            comp: <Invoices />,
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
