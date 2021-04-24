import MailActionTypes from "./mail.types";

export const addMailStart = (mail) => ({
  type: MailActionTypes.ADD_MAIL_START,
  payload: mail,
});

export const addMailSuccess = (mail) => ({
  type: MailActionTypes.ADD_MAIL_SUCCESS,
  payload: mail,
});

export const addMailFailure = (error) => ({
  type: MailActionTypes.ADD_MAIL_FAILURE,
  payload: error,
});

export const fetchMailsStart = () => ({
  type: MailActionTypes.FETCH_MAILS_START,
});

export const fetchMailsSuccess = (mails) => ({
  type: MailActionTypes.FETCH_MAILS_SUCCESS,
  payload: mails,
});

export const fetchMailsFailure = (error) => ({
  type: MailActionTypes.FETCH_MAILS_FAILURE,
  payload: error,
});
