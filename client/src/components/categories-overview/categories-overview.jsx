import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "../carousel/carousel";
import { Divider, Typography } from "@material-ui/core";
import { selectTopsProductsByCategories } from "../../redux/product/product.selector";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `20px 0`,
  },
  title: {
    margin: `10px 8px`,
    position: "relative",
    cursor: "pointer",
    "&:hover": {
      // color: theme.palette.table.main,
      // textDecoration: "underlined",
      opacity: ".6",
    },
    "&::before": {
      content: "''",
      position: "absolute",
      width: "4px",
      height: "100%",
      backgroundColor: "#636e72",
      left: "-8px",
    },
  },
}));

export default function () {
  const categories = useSelector((state) => state.category.categories);
  const classes = useStyles();
  const history = useHistory();
  const topsProducts = useSelector((state) =>
    selectTopsProductsByCategories(categories)(state)
  );
  console.log("RENDER AGAIN", topsProducts);
  return (
    <div className={classes.root}>
      {topsProducts.map((products, i) => (
        <>
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
        </>
      ))}
    </div>
  );
}
