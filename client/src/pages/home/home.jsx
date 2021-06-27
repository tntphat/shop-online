import React, { useEffect } from "react";
import { Paper, Grid, Typography, Box, Divider } from "@material-ui/core";
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
  return (
    <Paper square>
      <Grid container>
        <Posters />
        <Grid item md={2} xs={false} />
        <Grid item md={8} xs={12}>
          <Box mt={4}>
            <Typography variant="h3" align="center">
              Top products
            </Typography>
            <Divider style={{ margin: "20px 120px" }} />
          </Box>
          <CategoriesOverviewWithSpinner />
        </Grid>
        <Grid item md={2} xs={false} />
      </Grid>
    </Paper>
  );
};

export default HomePage;
