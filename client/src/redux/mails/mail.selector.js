import { createSelector } from "reselect";

const selectProduct = (state) => state.mail;

export const selectMail = createSelector([selectProduct], (mail) => mail.mails);

export const selectErrors = createSelector(
  [selectProduct],
  (mail) => mail.error
);
