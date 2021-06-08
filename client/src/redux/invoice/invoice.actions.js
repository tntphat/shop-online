import InvoiceActionTypes from "./invoice.types";

export const addInvoiceStart = (Invoice) => ({
  type: InvoiceActionTypes.ADD_INVOICE_START,
  payload: Invoice,
});

export const addInvoiceSuccess = (Invoice) => ({
  type: InvoiceActionTypes.ADD_INVOICE_SUCCESS,
  payload: Invoice,
});

export const addInvoiceFailure = (error) => ({
  type: InvoiceActionTypes.ADD_INVOICE_FAILURE,
  payload: error,
});

export const editInvoiceStart = (Invoice) => ({
  type: InvoiceActionTypes.EDIT_INVOICE_START,
  payload: Invoice,
});

export const editInvoiceSuccess = (Invoice) => ({
  type: InvoiceActionTypes.EDIT_INVOICE_SUCCESS,
  payload: Invoice,
});

export const editInvoiceFailure = (error) => ({
  type: InvoiceActionTypes.EDIT_INVOICE_FAILURE,
  payload: error,
});

export const fetchInvoicesStart = () => ({
  type: InvoiceActionTypes.FETCH_INVOICES_START,
});

export const fetchInvoicesSuccess = (Invoices) => ({
  type: InvoiceActionTypes.FETCH_INVOICES_SUCCESS,
  payload: Invoices,
});

export const fetchInvoicesFailure = (error) => ({
  type: InvoiceActionTypes.FETCH_INVOICES_FAILURE,
  payload: error,
});

export const fetchUserInvoicesStart = () => ({
  type: InvoiceActionTypes.FETCH_USER_INVOICES_START,
});

export const fetchUserInvoicesSuccess = (Invoices) => ({
  type: InvoiceActionTypes.FETCH_USER_INVOICES_SUCCESS,
  payload: Invoices,
});

export const fetchUserInvoicesFailure = (error) => ({
  type: InvoiceActionTypes.FETCH_USER_INVOICES_FAILURE,
  payload: error,
});
