import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  checking: true,
  employees: [],
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.EDIT_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.FETCH_EMPLOYEES_START:
      return {
        ...state,
      };
    case UserActionTypes.FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action.payload,
        error: null,
      };
    case UserActionTypes.FETCH_EMPLOYEES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case UserActionTypes.ADD_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.payload],
        error: null,
      };
    case UserActionTypes.CHECK_USER_SESSION:
      return {
        ...state,
        checking: true,
      };
    case UserActionTypes.CHECK_USER_SESSION_DONE:
      return {
        ...state,
        checking: false,
      };
    default:
      return state;
  }
};

export default userReducer;
