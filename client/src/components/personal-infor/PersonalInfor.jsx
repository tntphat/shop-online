import React, { useState } from "react";
import { IconButton, Typography } from "@material-ui/core";
import Popup from "../popUp";
import MailForm from "../Forms/mail-form";
import MailIcon from "@material-ui/icons/Mail";

export default function (currentUser) {
  const [openPopup, setOpenPopup] = useState(false);
  const user = currentUser.currentUser;
  return (
    <>
      <Typography component={"span"} variant="h3">
        {user.firstName + " " + user.lastName}
      </Typography>
      <Typography component={"span"} variant="h5">
        {" "}
        {user.email}
      </Typography>

      <IconButton onClick={() => setOpenPopup(true)}>
        <MailIcon />
      </IconButton>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Mail">
        <MailForm setOpenPopup={setOpenPopup} />
      </Popup>
    </>
  );
}
