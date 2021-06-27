import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import CartItems from "../cart-items/cart-items";

import { Typography, Box, Divider } from "@material-ui/core";

import { CartContext } from "../../providers/cart/cart.provider";

import useStyles from "./cart.styles";

export default function Cart() {
  const classes = useStyles();
  const history = useHistory();
  const { cartItems, toggleHidden, cartItemsCount } = useContext(CartContext);
  const handleCheckout = () => {
    toggleHidden();
    history.push("/checkout");
  };
  return (
    <div className={classes.root}>
      {cartItemsCount ? (
        <CartItems
          cartItems={cartItems}
          title="Ur Cart"
          isCart
          handleCheckout={handleCheckout}
        />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyItems="center"
          className={classes.emptyContainer}
        >
          <Typography style={{ margin: "10px 0" }} variant="h5">
            Ur cart is empty
          </Typography>
          <img
            src="https://www.rphbuddy.com/public/img/empty-cart-2.png"
            alt=""
            className="img"
          />
        </Box>
      )}
    </div>
  );
}
