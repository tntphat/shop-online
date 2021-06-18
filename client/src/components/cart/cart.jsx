import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import CartItems from "../cart-items/cart-items";

import { Typography } from "@material-ui/core";

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
  console.log(cartItems);
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
        <Typography variant="h5">Ur cart is empry</Typography>
      )}
    </div>
  );
}
