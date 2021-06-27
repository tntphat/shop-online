import { takeLatest, put, all, call, select } from "redux-saga/effects";
import axiosInstance from "../../helpers/axiosInstance";

import Cookies from "js-cookie";

import UserActionTypes from "./user.types";
import {
  signInSuccess,
  signInSuccessEmployee,
  signInFailure,
  editUserSuccess,
  editUserFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
  addEmployeeSuccess,
  checkUserSessionDone,
} from "./user.actions";

import { selectCurrentUser } from "./user.selector";

export function* signIn({
  payload: { email, password, isEmployee, setOpenPopup },
}) {
  try {
    const { data } = yield axiosInstance.post(
      `/${(isEmployee && "employee") || "user"}/sign-in`,
      {
        email,
        password,
      }
    );
    yield Cookies.set("user", JSON.stringify(data));
    if (isEmployee) yield put(signInSuccessEmployee(data));
    else yield put(signInSuccess(data));
    yield setOpenPopup(false);
  } catch (error) {
    yield put(signInFailure(error.response.data));
  }
}

export function* signUp({ payload }) {
  try {
    const { isEmployee, setConfirmDialog, setOpenPopup, ...others } = payload;
    const path = isEmployee ? "employee" : "user";
    const { data } = yield axiosInstance.post(`/${path}/register`, others);
    if (!isEmployee) {
      yield Cookies.set("user", JSON.stringify(data));
      yield put(signUpSuccess(data));
    } else {
      setConfirmDialog({
        isOpen: true,
        title: "New Employee Infor",
        subTitle: `user: ${data.email} & password: ${data.password}`,
      });
      yield put(addEmployeeSuccess(data));
    }
    yield setOpenPopup(false);
  } catch (error) {
    yield put(signUpFailure(error.response.data));
  }
}

export function* editUser({ payload }) {
  try {
    const { notClient, ...others } = payload;
    const path = notClient ? "employee" : "user";
    const curUser = yield select(selectCurrentUser);

    const { data } = yield axiosInstance.put(`/${path}/edit`, others, {
      headers: {
        Authorization: "Bearer " + curUser.token,
      },
    });
    if (!notClient) {
      yield Cookies.set("user", JSON.stringify(data));
      yield put(editUserSuccess(data));
      // history.push("/");
    } else {
      // yield put(addEmployeeSuccess(data));
    }
  } catch (error) {
    yield put(editUserFailure(error.response.data));
  }
}

export function* isUserAuthenticated() {
  try {
    const data = yield Cookies.get("user");
    const curUser = yield select(selectCurrentUser);
    if (!data) {
      if (curUser) yield signOut();
      yield put(checkUserSessionDone());
      return;
    }

    const user = JSON.parse(data);
    if (user.authority) yield put(signInSuccessEmployee(user));
    else yield put(signInSuccess(user));
    yield put(checkUserSessionDone());
  } catch (error) {
    yield put(checkUserSessionDone());

    yield put(signInFailure(error));
  }
}

export function* signOut({ payload }) {
  try {
    const { history } = payload;
    history.push("/");
    yield Cookies.remove("user");
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* fetchEmployees() {
  try {
    const { data } = yield axiosInstance.get("/employee");
    yield put(fetchEmployeesSuccess(data));
  } catch (error) {
    yield put(fetchEmployeesFailure(error));
  }
}

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signIn);
}

export function* onEditUserStart() {
  yield takeLatest(UserActionTypes.EDIT_USER_START, editUser);
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

export function* onFetchEmployeesStart() {
  yield takeLatest(UserActionTypes.FETCH_EMPLOYEES_START, fetchEmployees);
}

export function* userSagas() {
  yield all([
    call(onSignInStart),
    call(onEditUserStart),
    call(onSignUpStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onFetchEmployeesStart),
  ]);
}
