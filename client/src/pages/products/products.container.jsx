import { useSelector } from "react-redux";

import WithSpinner from "../../features/with-spinner";
import Products from "./products";
const ProductsWithSpinner = WithSpinner(Products);

const ProductDetailPageContainer = () => {
  return (
    <ProductsWithSpinner
      isLoading={useSelector((state) => state.product.isFetching)}
    />
  );
};

export default ProductDetailPageContainer;
