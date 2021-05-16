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
    let b = null;
    productsData.forEach((product) => {
      if (product._id === productUrlParam) b = product;
    });
    return b;
  });

export const selectProductsByFiler = (categoryId, subCategoryId) =>
  createSelector([selectProducts], (productsData) => {
    console.log("PARAM: ", categoryId, productsData);
    return (
      (subCategoryId &&
        productsData.filter(
          (product) => product.sub_category_id.slug === subCategoryId
        )) ||
      (categoryId &&
        productsData.filter(
          (product) => product.category_id.slug === categoryId
        )) ||
      productsData
    );
    // const data = !productUrlParam
    //   ? productsData
    //   : productsData.filter(
    //       (product) => product.category_id._id === productUrlParam
    //     );
    // console.log("data: ", data);
    // return data;
  });

export const selectErrors = createSelector(
  [selectProduct],
  (product) => product.error
);
