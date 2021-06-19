import React, { useEffect } from "react";
import { Paper, Grid, Typography, Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { fetchProductsStart } from "../../redux/product/product.actions";
import { fetchCategoriesStart } from "../../redux/categories/category.actions";
import CategoriesOverviewWithSpinner from "../../components/categories-overview/categories-overview.container";
import Posters from "../../components/posters/posters";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsStart());
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  const categories = useSelector((state) => state.category.categories);
  console.log("categories", categories);
  return (
    <Paper square>
      <Grid container>
        <Posters />
        <Grid item md={2} xs={false} />
        <Grid item md={8} xs={12}>
          <Box my={4}>
            <Typography variant="h2" align="center">
              Top products of us
            </Typography>
          </Box>
          <CategoriesOverviewWithSpinner />
        </Grid>
        <Grid item md={2} xs={false} />
      </Grid>
    </Paper>
  );
};

export default HomePage;
