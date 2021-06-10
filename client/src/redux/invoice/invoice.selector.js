import { createSelector } from "reselect";

const selectInvoice = (state) => state.invoice;

export const selectInvoices = createSelector(
  [selectInvoice],
  (invoice) => invoice.invoices
);

export const selectErrors = createSelector(
  [selectProduct],
  (mail) => mail.error
);
