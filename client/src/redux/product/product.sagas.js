import { takeLatest, put, all, call } from "redux-saga/effects";
import axios from "axios";

import ProductActionTypes from "./product.types";

import {
  addProductFailure,
  addProductSuccess,
  editProductFailure,
  editProductSuccess,
  delProductFailure,
  delProductSuccess,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "./product.actions";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

export function* addProduct({payload}) {
  try {
    console.log("helo from saga");
    console.log(payload.file)
    const fd = new FormData();
    fd.append('name',payload.name);
    fd.append('description',payload.description);
    fd.append('price',payload.price);
    fd.append('expiry_date',payload.expiry_date);
    fd.append('file',payload.file);
    const { data } = yield axiosInstance.post("/products/add", fd);
    console.log('data:',data);
    yield put(addProductSuccess(data));
  } catch (error) {
    yield put(addProductFailure(error.response.data));
  }
}

export function* editProduct({ payload }) {
  try {
    console.log("helo from saga edit");
    // const { data } = yield axiosInstance.post("/products/edit", { name, type });
    yield axiosInstance.put("/products/edit", {
      data: payload,
    });
    // console.log(updatedProduct);
    yield put(editProductSuccess(payload));
  } catch (error) {
    yield put(editProductFailure(error.response.data));
  }
}

export function* delProduct({ payload }) {
  try {
    console.log("helo from saga", payload._ids);
    yield axiosInstance.delete("/products/del", {
      data: {
        ids: payload._ids,
      },
    });
    yield put(delProductSuccess(payload.ids));
  } catch (error) {
    yield put(delProductFailure(error.response.data));
  }
}

export function* fetchProducts() {
  try {
    console.log("helo from saga FETCH PRODOCUYT");
    const { data } = yield axiosInstance.get("/products");
    yield put(fetchProductsSuccess(data));
  } catch (error) {
    yield put(fetchProductsFailure(error));
  }
}

export function* onEditProductStart() {
  yield takeLatest(ProductActionTypes.EDIT_PRODUCT_START, editProduct);
}

export function* onAddProductStart() {
  yield takeLatest(ProductActionTypes.ADD_PRODUCT_START, addProduct);
}

export function* onDelProductStart() {
  yield takeLatest(ProductActionTypes.DEL_PRODUCT_START, delProduct);
}

export function* onFetchProductsStart() {
  yield takeLatest(ProductActionTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* productSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDelProductStart),
    call(onEditProductStart),
  ]);
}
