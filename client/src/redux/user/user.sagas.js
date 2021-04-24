import { takeLatest, put, all, call, select } from "redux-saga/effects";
import axios from "axios";
import Cookies from "js-cookie";

import UserActionTypes from "./user.types";
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from "./user.actions";

import { selectCurrentUser } from "./user.selector";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

export function* signIn({ payload: { email, password } }) {
  try {
    console.log("helo from saga SIGN IN ");
    const { data } = yield axiosInstance.post("/user/sign-in", {
      email,
      password,
    });
    console.log(data);
    yield Cookies.set("user", JSON.stringify(data));
    yield put(signInSuccess(data));
  } catch (error) {
    yield put(signInFailure(error.response.data));
  }
}

export function* signUp({ payload }) {
  try {
    console.log("helo from saga SIGN Up ");
    const { data } = yield axiosInstance.post("/user/register", payload);
    yield Cookies.set("user", JSON.stringify(data));
    yield put(signUpSuccess(data));
  } catch (error) {
    yield put(signUpFailure(error.response.data));
  }
}

export function* isUserAuthenticated() {
  try {
    console.log("CHECK USER SAGA");
    const data = yield Cookies.get("user");
    console.log(!data);
    if (!data) return;
    yield put(signInSuccess(JSON.parse(data)));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield Cookies.remove("user");
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

// export function* testHeader() {
//   try {
//     const data = yield Cookies.get("user");
//     const { token } = JSON.parse(data);
//     console.log("HELLO FROM TEST SAGAS", token);
//     yield axiosInstance.post(
//       "/test",
//       { data: 1 },
//       { headers: { Authorization: "Bearer " + token } }
//     );
//   } catch (error) {
//     yield put(signOutFailure(error));
//   }
// }

export function* testHeader() {
  try {
    const data = yield select(selectCurrentUser);
    console.log(data);
    // const { token } = JSON.parse(data);
    // console.log("HELLO FROM TEST SAGAS", token);
    yield axiosInstance.post(
      "/test",
      { data: 1 },
      {
        headers: {
          Authorization: "Bearer " + data.token,
        },
      }
    );
  } catch (error) {
    console.log(error);
    // yield put(signOutFailure(error));
  }
}

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signIn);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onTestHeader() {
  yield takeLatest(UserActionTypes.TEST_HEADER, testHeader);
}

export function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onSignUpStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onTestHeader),
  ]);
}
