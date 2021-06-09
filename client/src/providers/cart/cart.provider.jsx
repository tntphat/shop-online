import Cookies from "js-cookie";
import React, { createContext, useState, useEffect } from "react";
import {
  addItemToCart,
  removeItemFromCart,
  filterItemFromCart,
  getCartItemsCount,
} from "./cart.utils";

export const CartContext = createContext({
  hidden: false,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  clearCart: () => {},
  cartItemsCount: 0,
});

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const addItem = (item, quant) =>
    setCartItems(addItemToCart(cartItems, item, quant));
  const removeItem = (item) =>
    setCartItems(removeItemFromCart(cartItems, item));
  const clearItemFromCart = (item) => {
    setCartItems(filterItemFromCart(cartItems, item));
  };

  const clearCart = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    setCartItems([]);
  };
  const toggleHidden = () => setHidden(!hidden);

  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const cartStorage = localStorage.getItem("cart");
    if (cartStorage) setCartItems(JSON.parse(cartStorage));
  }, []);

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        clearCart,
        addItem,
        removeItem,
        clearItemFromCart,
        cartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
