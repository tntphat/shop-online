import React, { useEffect } from "react";
import { Paper, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import Carousel from "../../components/carousel/carousel";

import { fetchProductsStart } from "../../redux/product/product.actions";
import { fetchCategoriesStart } from "../../redux/categories/category.actions";
import { selectProductsByFiler } from "../../redux/product/product.selector";
import CategoriesOverviewWithSpinner from "../../components/categories-overview/categories-overview.container";

import "./home.css";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsStart());
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  const categories = useSelector((state) => state.category.categories);
  console.log("categories", categories);
  const arrTopsProductsByCategories = [];

  return (
    <Paper>
      <section className="hero"></section>
      <Grid container>
        <Grid item sm={2} />
        <Grid item sm={8}>
          <CategoriesOverviewWithSpinner />
        </Grid>
        <Grid item sm={2} />
      </Grid>
    </Paper>
  );
};

export default HomePage;
