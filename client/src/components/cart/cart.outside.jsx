import React, { useContext } from "react";

import { CartContext } from "../../providers/cart/cart.provider";

import Outside from "../outside";
import Cart from "./cart";

export default function CartOutside() {
  const { toggleHidden, hideCart } = useContext(CartContext);

  return (
    <Outside
      handle={() => {
        setTimeout(() => {
          hideCart();
        }, 150);
      }}
    >
      <Cart />
    </Outside>
  );
}
