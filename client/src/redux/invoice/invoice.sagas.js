import { takeLatest, put, all, call, select } from "redux-saga/effects";
import axiosInstance from "../../helpers/axiosInstance";

import { selectCurrentUser } from "../user/user.selector";

import InvoiceActionTypes from "./invoice.types";

import {
  addInvoiceFailure,
  addInvoiceSuccess,
  fetchInvoicesSuccess,
  fetchInvoicesFailure,
  editInvoiceSuccess,
  editInvoiceFailure,
} from "./invoice.actions";
export function* addInvoice({ payload }) {
  try {
    console.log("helo from saga Invoice ADD", payload);
    const {
      products,
      total_price,
      productsQuantityLeft,
      clearCart,
      setNotify,
      productsPurchased,
      history,
    } = payload;
    const curUser = yield select(selectCurrentUser);
    if (!curUser) {
      yield setNotify({
        isOpen: true,
        message: "Pls sign in before paying",
        type: "error",
      });
    } else {
      const { data } = yield axiosInstance.post(
        "/invoice",
        { products, total_price, productsQuantityLeft, productsPurchased },
        {
          headers: {
            Authorization: "Bearer " + curUser.token,
          },
        }
      );

      yield setNotify({
        isOpen: true,
        message: "Bn đã pay thành công",
        type: "success",
      });
      yield clearCart();
      yield history.push("/products");
      yield put(addInvoiceSuccess(data));
    }
  } catch (error) {
    yield put(addInvoiceFailure(error.response.data));
  }
}

export function* editInvoice({ payload }) {
  try {
    console.log("edit invoice: ", payload);
    const { data } = yield axiosInstance.patch("/invoice", payload);
    console.log(data);
    yield put(editInvoiceSuccess(data));
  } catch (e) {
    yield put(editInvoiceFailure());
  }
}

export function* fetchUserInvoices() {
  try {
    const curUser = yield select(selectCurrentUser);
    console.log("helo from saga FETCH USER InvoiceLLLS");
    const { data } = yield axiosInstance.get("/invoice/user", {
      headers: {
        Authorization: "Bearer " + curUser.token,
      },
    });
    console.log("invoices: ", data);
    yield put(fetchInvoicesSuccess(data));
  } catch (error) {
    yield put(fetchInvoicesFailure(error.response.data));
  }
}

export function* fetchInvoices() {
  try {
    console.log("helo from saga FETCH InvoiceLLLS");
    const { data } = yield axiosInstance.get("/invoice");
    console.log(data);
    yield put(fetchInvoicesSuccess(data));
  } catch (error) {
    yield put(addInvoiceFailure(error.response.data));
  }
}

export function* onAddInvoiceStart() {
  yield takeLatest(InvoiceActionTypes.ADD_INVOICE_START, addInvoice);
}

export function* onEditInvoiceStart() {
  yield takeLatest(InvoiceActionTypes.EDIT_INVOICE_START, editInvoice);
}

export function* onFetchInvoicesStart() {
  yield takeLatest(InvoiceActionTypes.FETCH_INVOICES_START, fetchInvoices);
}

export function* onFetchUserInvoicesStart() {
  yield takeLatest(
    InvoiceActionTypes.FETCH_USER_INVOICES_START,
    fetchUserInvoices
  );
}

export function* invoiceSagas() {
  yield all([
    call(onAddInvoiceStart),
    call(onFetchInvoicesStart),
    call(onEditInvoiceStart),
    call(onFetchUserInvoicesStart),
  ]);
}
