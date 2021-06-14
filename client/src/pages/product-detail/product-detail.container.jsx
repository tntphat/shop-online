import { useSelector } from "react-redux";
import WithSpinner from "../../components/with-spinner/with-spinner";
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
