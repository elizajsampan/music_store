import CartItemsActionTypes from "./cartItemsActionTypes";

export const getCart = (cartItems) => ({
  type: CartItemsActionTypes.GET_CART,
  payload: cartItems,
});

export const addToCart = (song) => ({
  type: CartItemsActionTypes.ADD_TO_CART,
  payload: song,
});

export const removeFromCart = () => ({
  type: CartItemsActionTypes.REMOVE_FROM_CART,
});

export const resetCart = () => ({
  type: CartItemsActionTypes.RESET_CART
});

export const addToCheckout = (song) => ({
  type: CartItemsActionTypes.ADD_TO_CHECKOUT,
  payload: song,
});

export const resetCheckout = () => ({
  type: CartItemsActionTypes.RESET_CHECKOUT
});


