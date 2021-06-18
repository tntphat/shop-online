import React, { useContext } from "react";

import { CartContext } from "../../providers/cart/cart.provider";

import Outside from "../../features/outside";
import Cart from "./cart";

export default function CartOutside() {
  const { hideCart } = useContext(CartContext);

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
