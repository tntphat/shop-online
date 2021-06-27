import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Carousel from "../carousel/carousel";
import { Divider, Typography } from "@material-ui/core";
import { selectTopsProductsByCategories } from "../../redux/product/product.selector";

import useStyles from "./categories-overview.styles";

export default function CategoriesOverview() {
  const categories = useSelector((state) => state.category.categories);
  const classes = useStyles();
  const history = useHistory();
  const topsProducts = useSelector((state) =>
    selectTopsProductsByCategories(categories)(state)
  );
  return (
    <div className={classes.root}>
      {topsProducts.map((products, i) => (
        <div key={i}>
          <Typography
            onClick={() =>
              history.push(`/products?category=${categories[i].slug}`)
            }
            className={classes.title}
            component="span"
            variant="h5"
          >
            {categories[i].name}
          </Typography>
          <Carousel items={products} />
          <Divider style={{ margin: "20px 16px" }} />
        </div>
      ))}
    </div>
  );
}
