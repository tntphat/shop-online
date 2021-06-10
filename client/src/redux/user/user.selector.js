import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectCurrentEmployee = createSelector(
  [selectUser],
  (user) => user.currentEmployee
);

export const selectChecking = createSelector(
  [selectUser],
  (user) => user.checking
);

export const selectEmployees = createSelector(
  [selectUser],
  (user) => user.employees
);

export const selectErrors = createSelector([selectUser], (user) => user.error);
