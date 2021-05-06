import UserActionTypes from "./user.types";

export const signInStart = (user) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: user,
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = (user) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: user,
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const fetchEmployeesStart = () => ({
  type: UserActionTypes.FETCH_EMPLOYEES_START,
});

export const fetchEmployeesSuccess = (employees) => ({
  type: UserActionTypes.FETCH_EMPLOYEES_SUCCESS,
  payload: employees,
});

export const fetchEmployeesFailure = (error) => ({
  type: UserActionTypes.FETCH_EMPLOYEES_FAILURE,
  payload: error,
});

export const addEmployeeSuccess = (employee) => ({
  type: UserActionTypes.ADD_EMPLOYEE_SUCCESS,
  payload: employee,
});

export const testHeader = () => ({
  type: UserActionTypes.TEST_HEADER,
});
