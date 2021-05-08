import AuthorityActionTypes from "./authority.types";

export const addAuthorityStart = (Authority) => ({
  type: AuthorityActionTypes.ADD_AUTHORITY_START,
  payload: Authority,
});

export const addAuthoritySuccess = (Authority) => ({
  type: AuthorityActionTypes.ADD_AUTHORITY_SUCCESS,
  payload: Authority,
});

export const addAuthorityFailure = (error) => ({
  type: AuthorityActionTypes.ADD_AUTHORITY_FAILURE,
  payload: error,
});

export const editAuthorityStart = (Authority) => ({
  type: AuthorityActionTypes.EDIT_AUTHORITY_START,
  payload: Authority,
});

export const editAuthoritySuccess = (Authority) => ({
  type: AuthorityActionTypes.EDIT_AUTHORITY_SUCCESS,
  payload: Authority,
});

export const editAuthorityFailure = (error) => ({
  type: AuthorityActionTypes.EDIT_AUTHORITY_FAILURE,
  payload: error,
});

export const deleteAuthorityStart = (Authority) => ({
  type: AuthorityActionTypes.DELETE_AUTHORITY_START,
  payload: Authority,
});

export const deleteAuthoritySuccess = (Authority) => ({
  type: AuthorityActionTypes.DELETE_AUTHORITY_SUCCESS,
  payload: Authority,
});

export const deleteAuthorityFailure = (error) => ({
  type: AuthorityActionTypes.DELETE_AUTHORITY_FAILURE,
  payload: error,
});

export const fetchAuthoritiesStart = () => ({
  type: AuthorityActionTypes.FETCH_AUTHORITIES_START,
});

export const fetchAuthoritiesSuccess = (authorities) => ({
  type: AuthorityActionTypes.FETCH_AUTHORITIES_SUCCESS,
  payload: authorities,
});

export const fetchAuthoritiesFailure = (error) => ({
  type: AuthorityActionTypes.FETCH_AUTHORITIES_FAILURE,
  payload: error,
});
