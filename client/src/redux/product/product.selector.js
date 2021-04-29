import { createSelector } from "reselect";

const selectProduct = (state) => state.product;

export const selectProducts = createSelector(
  [selectProduct],
  (product) => product.products
);

export const selectIsProductsFetching = createSelector(
  [selectProduct],
  (product) => product.isFetching
);

export const selectIsProductsLoaded = createSelector(
  [selectProduct],
  (product) => !product.products.length
);

export const selectProductSpecified = (productUrlParam) =>
  createSelector([selectProducts], (productsData) => {
    console.log("check selector: ", productsData, productUrlParam);
    let b = null;
    productsData.forEach((product) => {
      console.log(product._id === productUrlParam);
      if (product._id === productUrlParam) b = product;
    });
    return b;
  });

export const selectErrors = createSelector(
  [selectProduct],
  (product) => product.error
);
