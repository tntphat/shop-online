import { takeLatest, put, all, call, select } from "redux-saga/effects";
import axios from "axios";

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

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

export function* addInvoice({ payload }) {
  try {
    console.log("helo from saga Invoice ADD", payload);
    const {
      products,
      total_price,
      productsQuantityLeft,
      clearCart,
      setNotify,
      history,
    } = payload;
    const curUser = yield select(selectCurrentUser);
    const { data } = yield axiosInstance.post(
      "/invoice",
      { products, total_price, productsQuantityLeft },
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
  } catch (error) {
    yield put(addInvoiceFailure(error.response.data));
  }
}

export function* editInvoice({ payload }) {
  try {
    const { data } = yield axiosInstance.patch("/invoice/edit", payload);
    console.log("data:", data);
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
    console.log(data);
    yield put(fetchInvoicesSuccess(data));
  } catch (error) {
    yield put(addInvoiceFailure(error.response.data));
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
