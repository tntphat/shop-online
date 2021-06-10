import React, { useContext, useState } from "react";
import { connect, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

import {
  selectProductSpecified,
  selectProductsByProduct,
} from "../../redux/product/product.selector";
import SlateRender from "../../components/controls/SlateRender";

import { formatNumber } from "../../helpers/number";
import { Divider, IconButton } from "@material-ui/core";

import { CartContext } from "../../providers/cart/cart.provider";
import Notification from "../../components/Notification";

import Card from "../../components/card/card.component";

import BreadCrumbs from "../../components/breadcrumbs/Breadcrumbs";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100vw",
  },
  breadCrumbs: {
    margin: "30px 0",
  },
  title: {
    bold: true,
    margin: "20px 0",
  },
  price: {
    color: "#C10017",
    marginTop: 20,
    marginBottom: 20,
  },
  img: {
    display: "block",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100%",
    height: "300px",

    backgroundCover: "auto",
  },
  quantity: {
    height: "100%",
    // alignContent: "center",
    textAlign: "center",
    margin: "auto 8px",
  },
  btnAdd: {
    marginTop: "auto",
  },
  divider: {
    marginTop: "8px",
    marginBottom: "8px",
  },
}));

const ProductDetail = (props) => {
  const { product, selectTopProducts } = props;
  const topProducts = selectTopProducts(product);
  console.log("top prod: ", topProducts);
  const classes = useStyles();
  const { addItem } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const handleAddToCart = (product, quantity) => {
    addItem(product, quantity);
    setNotify({
      isOpen: true,
      message: "Bn đã add to cart",
      type: "success",
    });
    setQuantity(1);
  };

  console.log("product: ", product);

  return (
    <Grid container className={classes.root}>
      <Grid item sm={1} xs={0} />

      <Grid item container spacing={1} sm={10} xs={12}>
        <Grid item sm={12}>
          <Box mb={3}>
            <BreadCrumbs
              arr={[
                { name: "Shop", link: "/" },
                {
                  name: product.category_id.name,
                  link: `/products?category=${product.category_id.slug}`,
                },
                {
                  name: product.sub_category_id.name,
                  link: `/products?sub=${product.sub_category_id.slug}`,
                },
              ]}
              present={product.name}
            />
          </Box>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div
            className={classes.img}
            style={{ backgroundImage: `url(${product.imgs})` }}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <Box
            style={{ height: "300px" }}
            display="flex"
            flexDirection="column"
          >
            <Box display="flex" mb={3} flexDirection="row">
              <Typography component="span">4.0</Typography>

              <Rating name="read-only" value={4} readOnly />
              <Box mx={1}>
                <Divider
                  // variant="middle"
                  light={true}
                  orientation="vertical"
                />
              </Box>
              <Typography>0 đã bán</Typography>
              <Box mx={1}>
                <Divider
                  // variant="middle"
                  light={true}
                  orientation="vertical"
                />
              </Box>
              <Typography>0 đánh giá</Typography>
            </Box>
            <Typography variant="h5">{product.name}</Typography>
            <Typography className={classes.price} variant="h6">
              {formatNumber(product.price)} VND
            </Typography>

            <Box mb={1}>
              <IconButton
                onClick={() => {
                  if (quantity > 1) setQuantity((state) => state - 1);
                }}
              >
                <RemoveIcon />
              </IconButton>
              <span className={classes.quantity}>{quantity}</span>
              <IconButton
                onClick={() => {
                  if (product.quantity_left > quantity)
                    setQuantity((state) => state + 1);
                }}
              >
                <AddIcon />
              </IconButton>
              <span className={classes.quantity}>
                {product.quantity_left} left
              </span>
            </Box>
            <Button
              onClick={() => handleAddToCart(product, quantity)}
              className={classes.btnAdd}
              size="large"
              fullWidth
              variant="contained"
            >
              Add to cart
            </Button>
          </Box>
        </Grid>

        <Grid item sm={10}>
          <Typography variant="h5">Description</Typography>
          <SlateRender content={product.description} />
        </Grid>
        <Grid item sm={2}>
          <Typography variant="h6">Top selling</Typography>
          {topProducts.map((prod) => (
            <>
              <Card product={prod} hideBtn />
              <Divider className={classes.divider} variant="middle" light />
            </>
          ))}
        </Grid>
      </Grid>
      <Grid item sm={1} xs={0} />

      <Notification notify={notify} setNotify={setNotify} />
    </Grid>
  );
};

const mapStateToProp = (state, ownProps) => ({
  product: selectProductSpecified(ownProps.match.params.productId)(state),
  selectTopProducts: (product) => selectProductsByProduct(product)(state),
});

export default connect(mapStateToProp)(ProductDetail);

// export default ProductDetail;
