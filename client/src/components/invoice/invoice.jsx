import React from "react";
import CartItems from "../cart-items/cart-items";

const Invoice = ({ cartItems, status, total }) => {
  return (
    <>
      <CartItems cartItems={cartItems} />
    </>
  );
};
