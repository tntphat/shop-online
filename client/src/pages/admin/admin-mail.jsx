import React from "react";

import { fetchMailsStart } from "../../redux/mails/mail.actions";

import { selectMail } from "../../redux/mails/mail.selector";

import { connect } from "react-redux";

import MailGroup from "../../components/MailGroup/MailGroup";
import { useEffect } from "react";

function AdminMail({ fetchMailsStart, selectMail }) {
  console.log("sssssss", selectMail);
  useEffect(() => {
    fetchMailsStart();
  }, [fetchMailsStart]);
  return <MailGroup selectMail={selectMail} />;
}

const mapStateToProp = (state) => ({
  selectMail: selectMail(state),
});

const mapDispatchToProp = (dispatch) => ({
  fetchMailsStart: () => dispatch(fetchMailsStart()),
});

export default connect(mapStateToProp, mapDispatchToProp)(AdminMail);
