import ProductActionTypes from "./product.types";
import {
  addProductToList,
  delProductFromList,
  editProductFromList,
} from "./product.util";

const INITIAL_STATE = {
  products: [],
  error: null,
  isFetching: false,
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: addProductToList(state.products, action.payload),
        error: null,
      };

    case ProductActionTypes.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case ProductActionTypes.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        products: editProductFromList(state.products, action.payload),
        error: null,
      };

    case ProductActionTypes.EDIT_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case ProductActionTypes.DEL_PRODUCT_SUCCESS:
      return {
        ...state,
        products: delProductFromList(state.products, action.payload),
        error: null,
      };

    case ProductActionTypes.DEL_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case ProductActionTypes.FETCH_PRODUCTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isFetching: false,
        error: null,
      };
    case ProductActionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
