import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Card from "../../components/card/card.component";

import { useLocation, useHistory } from "react-router-dom";

import { selectProductsByFiler } from "../../redux/product/product.selector";
import { selectCategories } from "../../redux/categories/category.selector";
import ListCategory from "../../components/list-category";
import FilterBar from "../../components/filter-bar/FilterBar";

import Notification from "../../components/Notification";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: "100%",
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductsPage = () => {
  let query = useQuery();
  let history = useHistory();
  const classes = useStyles();
  const first = useRef(0);

  const categorySlug = query.get("category");
  const subSlug = query.get("sub");
  const kwQuery = query.get("kw");

  const { products, max } = useSelector((state) =>
    selectProductsByFiler(
      categorySlug,
      subSlug,
      kwQuery,
      query.get("sort"),
      query.get("from"),
      query.get("to")
    )(state)
  );

  const categories = useSelector((state) => selectCategories(state));

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    function handleClearQuery() {
      query.delete("from");
      query.delete("to");
      query.delete("sort");
      history.replace({
        search: query.toString(),
      });
    }
    if (first.current) {
      handleClearQuery();
    } else first.current = 1;
  }, [categorySlug, kwQuery, subSlug]);

  return (
    <Grid container className={classes.paper} spacing={1}>
      <Grid container item xs={12} sm={3}>
        <Grid item md={3} sm={0} />
        <Grid item md={9} xs={12}>
          <ListCategory categories={categories} />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8} style={{ marginTop: "16px" }}>
        {/* <Hidden xsDown> */}
        <FilterBar max={max} count={products.length} />
        {/* </Hidden> */}

        <Grid container spacing={1}>
          {products.map((product, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Card product={product} setNotify={setNotify} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={false} sm={1} />
      <Notification notify={notify} setNotify={setNotify} />
    </Grid>
  );
};

export default ProductsPage;
