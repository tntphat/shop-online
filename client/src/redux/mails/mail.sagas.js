import { takeLatest, put, all, call, select } from "redux-saga/effects";
import axios from "axios";

import { selectCurrentUser } from "../user/user.selector";

import MailActionTypes from "./mail.types";

import {
  addMailFailure,
  addMailSuccess,
  fetchMailsSuccess,
  fetchMailsFailure,
} from "./mail.actions";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

export function* addMail({ payload }) {
  try {
    console.log("helo from saga MAIL ADD");
    const curUser = yield select(selectCurrentUser);
    const { data } = yield axiosInstance.post("/mails/add", payload, {
      headers: {
        Authorization: "Bearer " + curUser.token,
      },
    });
    console.log(data);
    // yield put(addMailSuccess(data));
  } catch (error) {
    yield put(addMailFailure(error.response.data));
  }
}

export function* fetchMails() {
  try {
    console.log("helo from saga FETCH MAILLLLS");
    const { data } = yield axiosInstance.get("/mails");
    console.log(data);
    yield put(fetchMailsSuccess(data));
  } catch (error) {
    yield put(addMailFailure(error.response.data));
  }
}

export function* onAddMailStart() {
  yield takeLatest(MailActionTypes.ADD_MAIL_START, addMail);
}
export function* onFetchMailsStart() {
  yield takeLatest(MailActionTypes.FETCH_MAILS_START, fetchMails);
}

export function* mailSagas() {
  yield all([call(onAddMailStart), call(onFetchMailsStart)]);
}
