import InvoiceActionTypes from "./invoice.types";

const INITIAL_STATE = {
  invoices: [],
  error: null,
};

const invoiceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case InvoiceActionTypes.ADD_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: [...state.invoices, action.payload],
        error: null,
      };

    case InvoiceActionTypes.ADD_INVOICE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case InvoiceActionTypes.EDIT_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: state.invoices.map((invoice) =>
          invoice._id === action.payload._id
            ? { ...invoice, status: action.payload.status }
            : invoice
        ),
        error: null,
      };

    case InvoiceActionTypes.EDIT_INVOICE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case InvoiceActionTypes.FETCH_INVOICES_SUCCESS:
    case InvoiceActionTypes.FETCH_USER_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload,
        error: null,
      };
    case InvoiceActionTypes.FETCH_INVOICES_FAILURE:
    case InvoiceActionTypes.FETCH_USER_INVOICES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default invoiceReducer;
