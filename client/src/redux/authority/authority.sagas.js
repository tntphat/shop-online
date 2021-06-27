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
    const { data } = yield axiosInstance.post("/authorities/add", payload);
    yield put(addAuthoritySuccess(data));
  } catch (error) {
    yield put(addAuthorityFailure(error.response.data));
  }
}

export function* fetchAuthorities() {
  try {
    const { data } = yield axiosInstance.get("/authorities");
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
