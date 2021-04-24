import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import Card from "../../components/card/card.component";

import { connect } from "react-redux";

import { fetchProductsStart } from "../../redux/product/product.actions";
import { selectProducts } from "../../redux/product/product.selector";
import { useEffect } from "react";
import ListCategory from "../../components/list-category";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: "60px",
    minHeight: "100vh",
  },
}));

const ProductsPage = ({ selectProducts, fetchProductsStart }) => {
  const classes = useStyles();
  useEffect(() => {
    fetchProductsStart();
  }, [fetchProductsStart]);
  // console.log(selectProducts);
  return (
    <Paper className={classes.paper}>
      <Grid container>
        <Grid container item xs={false} sm={3}>
          <Grid item sm={3} />
          <Grid item sm={9}>
            <ListCategory />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container spacing={1}>
            {selectProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={3}>
                <Card key={index} product={product} />
              </Grid>
            ))}
            {selectProducts.map((product, index) => (
              <Grid item xs={12} sm={6} md={3}>
                <Card key={index} product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={false} sm={1} />
      </Grid>
    </Paper>
  );
};

const mapStateToProp = (state) => ({
  selectProducts: selectProducts(state),
});

const mapDispatchToProp = (dispatch) => ({
  fetchProductsStart: () => dispatch(fetchProductsStart()),
});

export default connect(mapStateToProp, mapDispatchToProp)(ProductsPage);
