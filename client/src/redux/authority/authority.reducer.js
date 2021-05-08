import AuthorityActionTypes from "./authority.types";

const INITIAL_STATE = {
  authorities: [],
  error: null,
};

const authorityReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthorityActionTypes.ADD_AUTHORITY_SUCCESS:
      return {
        ...state,
        authorities: [...state.authorities, action.payload],
        error: null,
      };

    case AuthorityActionTypes.ADD_AUTHORITY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case AuthorityActionTypes.FETCH_AUTHORITIES_SUCCESS:
      return {
        ...state,
        authorities: action.payload,
        error: null,
      };
    case AuthorityActionTypes.FETCH_AUTHORITIES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authorityReducer;
