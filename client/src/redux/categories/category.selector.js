import { createSelector } from "reselect";

const selectCategory = (state) => state.category;

export const selectCategories = createSelector(
  [selectCategory],
  (category) => category.categories
);

export const selectNameCategoryBySlug = (slug) =>
  createSelector([selectCategories], (categories) => {
    let name = "";
    categories.forEach((category) => {
      if (category.slug === slug) name = category.name;
    });
    return name;
  });

export const selectErrors = createSelector(
  [selectCategory],
  (category) => category.error
);
