import CategoryActionTypes from "./category.types";

export const addCategoryStart = (category) => ({
  type: CategoryActionTypes.ADD_CATEGORY_START,
  payload: category,
});

export const addCategorySuccess = (category) => ({
  type: CategoryActionTypes.ADD_CATEGORY_SUCCESS,
  payload: category,
});

export const addCategoryFailure = (error) => ({
  type: CategoryActionTypes.ADD_CATEGORY_FAILURE,
  payload: error,
});

export const editCategoryStart = (category) => ({
  type: CategoryActionTypes.EDIT_CATEGORY_START,
  payload: category,
});

export const editCategorySuccess = (category) => ({
  type: CategoryActionTypes.EDIT_CATEGORY_SUCCESS,
  payload: category,
});

export const editCategoryFailure = (error) => ({
  type: CategoryActionTypes.EDIT_CATEGORY_FAILURE,
  payload: error,
});

export const deleteCategoryStart = (category) => ({
  type: CategoryActionTypes.DELETE_CATEGORY_START,
  payload: category,
});

export const deleteCategorySuccess = (category) => ({
  type: CategoryActionTypes.DELETE_CATEGORY_SUCCESS,
  payload: category,
});

export const deleteCategoryFailure = (error) => ({
  type: CategoryActionTypes.DELETE_CATEGORY_FAILURE,
  payload: error,
});

export const fetchCategoriesStart = () => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_START,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = (error) => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_FAILURE,
  payload: error,
});
