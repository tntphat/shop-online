import { useSelector } from "react-redux";

import WithSpinner from "../../components/with-spinner/with-spinner";
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
