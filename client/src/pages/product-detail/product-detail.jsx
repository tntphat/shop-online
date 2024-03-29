import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

import TextField from "@material-ui/core/TextField";

import {
  selectProductSpecified,
  selectProductsByProduct,
} from "../../redux/product/product.selector";
import SlateRender from "../../components/controls/SlateRender";

import { formatNumber } from "../../helpers/number";
import { Divider, IconButton } from "@material-ui/core";

import { CartContext } from "../../providers/cart/cart.provider";
import Notification from "../../features/Notification";

import Card from "../../components/card/card.component";

import BreadCrumbs from "../../components/breadcrumbs/Breadcrumbs";
import Rate from "../../components/rating/rating";

import { rateProductStart } from "../../redux/product/product.actions";

import labels from "../../constants/labels-rating.data";

import useStyles from "./product-detail.styles";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const currUser = useSelector((state) => state.user.currentUser);
  const product = useSelector((state) =>
    selectProductSpecified(productId)(state)
  );
  const topProducts = useSelector((state) =>
    selectProductsByProduct(product)(state)
  );
  // const topProducts = selectTopProducts(product);
  const classes = useStyles();
  const { addItem } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);

  const [value, setValue] = React.useState(0);
  const [comment, setComment] = React.useState("");

  const [hover, setHover] = React.useState(-1);

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

  const handleRate = (star, detail) => {
    dispatch(
      rateProductStart({
        star,
        detail,
        id: product._id,
        starProduct: product.star,
        ratesLength: product.rates.length,
        setComment,
        setNotify,
      })
    );
  };

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
            <Box display="flex" mb={2} flexDirection="row">
              <Typography component="span">
                {Math.round(product.star * 2) / 2}
              </Typography>

              <Rating value={product.star} precision={0.5} readOnly />
              <Box mx={1}>
                <Divider
                  // variant="middle"
                  light={true}
                  orientation="vertical"
                />
              </Box>
              <Typography>{product.purchased} đã bán</Typography>
              <Box mx={1}>
                <Divider
                  // variant="middle"
                  light={true}
                  orientation="vertical"
                />
              </Box>
              <Typography>{product.rates.length} đánh giá</Typography>
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
          <Divider style={{ margin: "30px 0" }} />
          {currUser ? (
            <>
              <Typography variant="h5">Rate Product</Typography>
              <Box display="flex" flexDirection="row" mt={2}>
                <Rating
                  name="hover-feedback"
                  value={value}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                />
                {value !== null && (
                  <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
                )}
              </Box>
              <TextField
                label="Comment"
                multiline
                rows={4}
                value={comment}
                variant="outlined"
                fullWidth
                style={{ margin: "10px 0" }}
                onChange={(event) => setComment(event.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => handleRate(value, comment)}
              >
                Rate
              </Button>
            </>
          ) : undefined}

          <Typography style={{ margin: "20px 0" }} variant="h5">
            Rating from Clients
          </Typography>

          {product.rates.length ? (
            product.rates.map((rate) => <Rate user={rate.user} rating={rate} />)
          ) : (
            <Typography>No rate from this product</Typography>
          )}
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

// const mapStateToProp = (state, ownProps) => ({
//   product: selectProductSpecified(ownProps.match.params.productId)(state),
//   selectTopProducts: (product) => selectProductsByProduct(product)(state),
// });

// export default connect(mapStateToProp)(ProductDetail);

export default ProductDetail;
