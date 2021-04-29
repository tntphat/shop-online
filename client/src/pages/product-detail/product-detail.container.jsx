import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsProductsLoaded } from "../../redux/product/product.selector";
import WithSpinner from "../../components/with-spinner/with-spinner";
import ProductDetail from "./product-detail";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsProductsLoaded,
});

const ProductDetailPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(ProductDetail);

export default ProductDetailPageContainer;
