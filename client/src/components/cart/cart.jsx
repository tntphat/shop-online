import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import CartItems from "../cart-items/cart-items";

import { Typography } from "@material-ui/core";

import { CartContext } from "../../providers/cart/cart.provider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "absolute",
    right: "80px",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    zIndex: 5,
    border: "1px solid #636e72",
  },
  name: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: "1",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "60px",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  text: {
    margin: "0 6px",
  },
  btnCheckOut: {
    margin: "0 40px",
  },
}));

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
