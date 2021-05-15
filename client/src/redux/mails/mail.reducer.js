import MailActionTypes from "./mail.types";

const INITIAL_STATE = {
  mails: [],
  error: null,
};

const mailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MailActionTypes.ADD_MAIL_SUCCESS:
      return {
        ...state,
        mails: [...state.mails, action.payload],
        error: null,
      };

    case MailActionTypes.ADD_MAIL_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case MailActionTypes.REP_MAIL_SUCCESS:
      return {
        ...state,
        mails: state.mails.map((mail) =>
          mail._id === action.payload._id
            ? { ...mail, reply: action.payload.reply }
            : mail
        ),
        error: null,
      };

    case MailActionTypes.REP_MAIL_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case MailActionTypes.FETCH_MAILS_SUCCESS:
    case MailActionTypes.FETCH_USER_MAILS_SUCCESS:
      return {
        ...state,
        mails: action.payload,
        error: null,
      };
    case MailActionTypes.FETCH_MAILS_FAILURE:
    case MailActionTypes.FETCH_USER_MAILS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default mailReducer;
