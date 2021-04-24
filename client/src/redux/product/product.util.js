export const addProductToList = (products, product) => {
  return [...products, product];
};

export const delProductFromList = (products, product) => {
  return products.filter((prod, index) => !product.includes(index.toString()));
};

export const editProductFromList = (products, product) => {
  return products.map((item) =>
    item._id === product._id ? { ...item, ...product } : item
  );
};
