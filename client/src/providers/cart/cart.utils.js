import Cookies from "js-cookie";

const setCookies = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  // Cookies.set("cart", );
};

export const addItemToCart = (cartItems, cartItemToAdd, quant = 1) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToAdd._id
  );

  if (existingCartItem) {
    const res = cartItems.map((cartItem) =>
      cartItem._id === cartItemToAdd._id
        ? { ...cartItem, quantity: cartItem.quantity + quant }
        : cartItem
    );
    setCookies(res);
    return res;
  }

  const res = [...cartItems, { ...cartItemToAdd, quantity: 1 }];

  setCookies(res);

  return res;
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem._id === cartItemToRemove._id
  );

  if (existingCartItem.quantity === 1) {
    const res = cartItems.filter(
      (cartItem) => cartItem._id !== cartItemToRemove._id
    );
    setCookies(res);
    return res;
  }

  const res = cartItems.map((cartItem) =>
    cartItem._id === cartItemToRemove._id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
  setCookies(res);
  return res;
};

export const filterItemFromCart = (cartItems, item) => {
  const res = cartItems.filter((cartItem) => cartItem._id !== item._id);
  setCookies(res);
  return res;
};

export const getCartItemsCount = (cartItems) =>
  cartItems.reduce((a, b) => a + b.quantity, 0);
