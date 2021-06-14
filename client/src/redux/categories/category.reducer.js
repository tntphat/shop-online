import CategoryActionTypes from "./category.types";

import { addSubCategory } from "./category.utils";

const INITIAL_STATE = {
  categories: [],
  isFetching: false,
  error: null,
};

const mailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CategoryActionTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        error: null,
      };

    case CategoryActionTypes.ADD_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case CategoryActionTypes.EDIT_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.map((item) =>
          item._id === action.payload._id
            ? { ...item, ...action.payload }
            : item
        ),
        error: null,
      };

    case CategoryActionTypes.EDIT_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CategoryActionTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (item) => item._id !== action.payload
        ),
        error: null,
      };

    case CategoryActionTypes.DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CategoryActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
        error: null,
      };
    case CategoryActionTypes.FETCH_CATEGORIES_START:
      return {
        ...state,
        isFetching: true,
      };

    case CategoryActionTypes.ADD_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        categories: addSubCategory(state.categories, action.payload),
        error: null,
      };

    case CategoryActionTypes.ADD_SUBCATEGORY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case CategoryActionTypes.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default mailReducer;
