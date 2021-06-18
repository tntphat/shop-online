import { useSelector } from "react-redux";
import WithSpinner from "../../features/with-spinner";
import ProductDetail from "./product-detail";
const ProductDetailWithSpinner = WithSpinner(ProductDetail);

const ProductDetailPageContainer = () => {
  return (
    <ProductDetailWithSpinner
      isLoading={useSelector((state) => state.product.isFetching)}
    />
  );
};

export default ProductDetailPageContainer;
