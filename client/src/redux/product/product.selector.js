import { createSelector } from "reselect";

const selectProduct = (state) => state.product;

export const selectProducts = createSelector(
  [selectProduct],
  (product) => product.products
);

export const selectErrors = createSelector(
  [selectProduct],
  (product) => product.error
);
