import { takeLatest, put, all, call, select } from "redux-saga/effects";
import axiosInstance from "../../helpers/axiosInstance";

import { selectCurrentUser } from "../user/user.selector";

import MailActionTypes from "./mail.types";

import {
  addMailFailure,
  addMailSuccess,
  fetchMailsSuccess,
  fetchMailsFailure,
  repMailSuccess,
  repMailFailure,
} from "./mail.actions";

export function* addMail({ payload }) {
  try {
    const curUser = yield select(selectCurrentUser);
    const { data } = yield axiosInstance.post("/mails/add", payload, {
      headers: {
        Authorization: "Bearer " + curUser.token,
      },
    });
    yield put(addMailSuccess(data));
  } catch (error) {
    yield put(addMailFailure(error.response.data));
  }
}

export function* repMail({ payload }) {
  try {
    const { data } = yield axiosInstance.patch("/mails/rep", payload);
    yield put(repMailSuccess(data));
  } catch (e) {
    yield put(repMailFailure());
  }
}

export function* fetchUserMails() {
  try {
    const curUser = yield select(selectCurrentUser);
    const { data } = yield axiosInstance.get("/mails/user", {
      headers: {
        Authorization: "Bearer " + curUser.token,
      },
    });
    yield put(fetchMailsSuccess(data));
  } catch (error) {
    yield put(fetchMailsFailure(error.response.data));
  }
}

export function* fetchMails() {
  try {
    const { data } = yield axiosInstance.get("/mails");
    yield put(fetchMailsSuccess(data));
  } catch (error) {
    yield put(addMailFailure(error.response.data));
  }
}

export function* onAddMailStart() {
  yield takeLatest(MailActionTypes.ADD_MAIL_START, addMail);
}

export function* onRepMailStart() {
  yield takeLatest(MailActionTypes.REP_MAIL_START, repMail);
}

export function* onFetchMailsStart() {
  yield takeLatest(MailActionTypes.FETCH_MAILS_START, fetchMails);
}

export function* onFetchUserMailsStart() {
  yield takeLatest(MailActionTypes.FETCH_USER_MAILS_START, fetchUserMails);
}

export function* mailSagas() {
  yield all([
    call(onAddMailStart),
    call(onFetchMailsStart),
    call(onRepMailStart),
    call(onFetchUserMailsStart),
  ]);
}
