import { Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";

import { selectProductSpecified } from "../../redux/product/product.selector";

const ProductDetail = (props) => {
  const { selectProductSpecified } = props;
  console.log("test product: ", selectProductSpecified);
  return (
    <>
      <Typography variant="h1">{selectProductSpecified.name}</Typography>
    </>
  );
};

const mapStateToProp = (state, ownProps) => ({
  selectProductSpecified: selectProductSpecified(
    ownProps.match.params.productId
  )(state),
});

export default connect(mapStateToProp)(ProductDetail);

// export default ProductDetail;
