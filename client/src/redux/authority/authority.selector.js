import { createSelector } from "reselect";

const selectAuthority = (state) => state.authority;

export const selectAuthorities = createSelector(
  [selectAuthority],
  (authority) => authority.authorities
);
