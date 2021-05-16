import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsProductsLoaded } from "../../redux/product/product.selector";
import WithSpinner from "../../components/with-spinner/with-spinner";
import Products from "./products";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsProductsLoaded,
});

const ProductsPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(Products);

export default ProductsPageContainer;
