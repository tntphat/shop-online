import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

import { connect } from "react-redux";

import { fetchProductsStart } from "../../redux/product/product.actions";
import { fetchCategoriesStart } from "../../redux/categories/category.actions";
import { selectProducts } from "../../redux/product/product.selector";
import { useEffect } from "react";

// import ProductsPage from "../products/products";
// import ProductDetail from "../product-detail/product-detail";
import Spinner from "../../components/Spinner/Spinner";
const ProductsPageContainer = lazy(() =>
  import("../products/products.container")
);
const ProductDetailContainer = lazy(() =>
  import("../product-detail/product-detail.container")
);

// import ProductsPage from "../products/products";
// import ProductDetailContainer from "../product-detail/product-detail";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: "60px",
    minHeight: "100vh",
  },
}));

const ProductContainer = ({
  fetchProductsStart,
  fetchCategoriesStart,
  match,
}) => {
  const classes = useStyles();
  useEffect(() => {
    fetchProductsStart();
  }, [fetchProductsStart]);
  useEffect(() => {
    fetchCategoriesStart();
  }, [fetchCategoriesStart]);
  return (
    <Paper className={classes.paper}>
      <Suspense fallback={<Spinner />}>
        <Route exact path={`${match.path}`} component={ProductsPageContainer} />
        <Route
          exact
          path={`${match.path}/:productId`}
          component={ProductDetailContainer}
        />
      </Suspense>
    </Paper>
  );
};

const mapDispatchToProp = (dispatch) => ({
  fetchProductsStart: () => dispatch(fetchProductsStart()),
  fetchCategoriesStart: () => dispatch(fetchCategoriesStart()),
});

const mapStateToProp = (state) => ({
  selectProducts: selectProducts(state),
});

export default connect(mapStateToProp, mapDispatchToProp)(ProductContainer);
