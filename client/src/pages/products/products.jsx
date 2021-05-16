import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Card from "../../components/card/card.component";

import { useLocation } from "react-router-dom";

import { connect } from "react-redux";

import { selectProductsByFiler } from "../../redux/product/product.selector";
import { selectCategories } from "../../redux/categories/category.selector";
import ListCategory from "../../components/list-category";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: "60px",
    minHeight: "100vh",
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductsPage = ({ selectProductsByFiler, selectCategories }) => {
  let query = useQuery();
  const products = selectProductsByFiler(
    query.get("category"),
    query.get("sub")
  );
  return (
    <Grid container>
      <Grid container item xs={false} sm={3}>
        <Grid item sm={3} />
        <Grid item sm={9}>
          <ListCategory categories={selectCategories} />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8} style={{ marginTop: "16px" }}>
        <Grid container spacing={1}>
          {products.map((product, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Card product={product} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={false} sm={1} />
    </Grid>
  );
};

const mapStateToProp = (state, ownProps) => ({
  selectProductsByFiler: (category, sub) =>
    selectProductsByFiler(category, sub)(state),
  selectCategories: selectCategories(state),
});

export default connect(mapStateToProp)(ProductsPage);
