import ProductActionTypes from "./product.types";

export const addProductStart = (product) => ({
  type: ProductActionTypes.ADD_PRODUCT_START,
  payload: product,
});

export const addProductSuccess = (product) => ({
  type: ProductActionTypes.ADD_PRODUCT_SUCCESS,
  payload: product,
});

export const addProductFailure = (error) => ({
  type: ProductActionTypes.ADD_PRODUCT_FAILURE,
  payload: error,
});

export const editProductStart = (product) => ({
  type: ProductActionTypes.EDIT_PRODUCT_START,
  payload: product,
});

export const editProductSuccess = (product) => ({
  type: ProductActionTypes.EDIT_PRODUCT_SUCCESS,
  payload: product,
});

export const editProductFailure = (error) => ({
  type: ProductActionTypes.EDIT_PRODUCT_FAILURE,
  payload: error,
});

export const delProductStart = (product) => ({
  type: ProductActionTypes.DEL_PRODUCT_START,
  payload: product,
});

export const delProductSuccess = (product) => ({
  type: ProductActionTypes.DEL_PRODUCT_SUCCESS,
  payload: product,
});

export const delProductFailure = (error) => ({
  type: ProductActionTypes.DEL_PRODUCT_FAILURE,
  payload: error,
});

export const fetchProductsStart = () => ({
  type: ProductActionTypes.FETCH_PRODUCTS_START,
});

export const fetchProductsSuccess = (products) => ({
  type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
  payload: error,
});
