import { takeLatest, put, all, call } from "redux-saga/effects";
import axiosInstance from "../../helpers/axiosInstance";

import AuthorityActionTypes from "./authority.types";

import {
  addAuthorityFailure,
  addAuthoritySuccess,
  fetchAuthoritiesSuccess,
  fetchAuthoritiesFailure,
} from "./authority.actions";

export function* addAuthority({ payload }) {
  try {
    console.log("helo from saga Authority ADD", payload);
    const { data } = yield axiosInstance.post("/authorities/add", payload);
    console.log(data);
    yield put(addAuthoritySuccess(data));
  } catch (error) {
    yield put(addAuthorityFailure(error.response.data));
  }
}

export function* fetchAuthorities() {
  try {
    console.log("helo from saga FETCH AuthoritieS");
    const { data } = yield axiosInstance.get("/authorities");
    console.log(data);
    yield put(fetchAuthoritiesSuccess(data));
  } catch (error) {
    yield put(fetchAuthoritiesFailure(error.response.data));
  }
}

export function* onAddAuthorityStart() {
  yield takeLatest(AuthorityActionTypes.ADD_AUTHORITY_START, addAuthority);
}
export function* onFetchAuthoritiesStart() {
  yield takeLatest(
    AuthorityActionTypes.FETCH_AUTHORITIES_START,
    fetchAuthorities
  );
}

export function* authoritySagas() {
  yield all([call(onAddAuthorityStart), call(onFetchAuthoritiesStart)]);
}
