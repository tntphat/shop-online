import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Card from "../../components/card/card.component";

import { connect } from "react-redux";

import { selectProducts } from "../../redux/product/product.selector";
import { selectCategories } from "../../redux/categories/category.selector";
import ListCategory from "../../components/list-category";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: "60px",
    minHeight: "100vh",
  },
}));

const ProductsPage = ({ selectProducts, selectCategories }) => {
  // console.log(selectProducts);
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
          {selectProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={3}>
              <Card key={index} product={product} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={false} sm={1} />
    </Grid>
  );
};

const mapStateToProp = (state) => ({
  selectProducts: selectProducts(state),
  selectCategories: selectCategories(state),
});

export default connect(mapStateToProp)(ProductsPage);
