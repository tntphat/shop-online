import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import Card from "../../components/card/card.component";

import { useLocation, useHistory } from "react-router-dom";

import { connect } from "react-redux";

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

const ProductsPage = ({ selectProductsByFiler, selectCategories }) => {
  let query = useQuery();
  let history = useHistory();
  const classes = useStyles();
  const first = useRef(0);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const { products, max } = selectProductsByFiler(
    query.get("category"),
    query.get("sub"),
    query.get("kw"),
    query.get("sort"),
    query.get("from"),
    query.get("to")
  );

  useEffect(() => {
    if (first.current) {
      query.delete("from");
      query.delete("to");
      query.delete("sort");
    } else first.current = 1;
    history.replace({
      search: query.toString(),
    });
  }, [query.get("category"), query.get("kw")]);

  return (
    <Grid container className={classes.paper} spacing={1}>
      <Grid container item xs={12} sm={3}>
        <Grid item md={3} sm={0} />
        <Grid item md={9} xs={12}>
          <ListCategory categories={selectCategories} />
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

const mapStateToProp = (state, ownProps) => ({
  selectProductsByFiler: (category, sub, kw, sort, from, to) =>
    selectProductsByFiler(category, sub, kw, sort, from, to)(state),
  selectCategories: selectCategories(state),
});

export default connect(mapStateToProp)(ProductsPage);
