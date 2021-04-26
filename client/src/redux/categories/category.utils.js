export const addSubCategory = (categories, subcategory) => {
  categories.forEach((category) => {
    if (category._id === subcategory.category_id) {
      category.sub_categories.push(subcategory);
    }
  });
  return categories;
};
