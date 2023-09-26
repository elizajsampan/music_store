import CartItemsActionTypes from "./cartItemsActionTypes";

const cartItemsReducer = (state, action) => {
  if (action.type === CartItemsActionTypes.GET_CART) {
    // add the song to the cart items array with a quantity of 1
    return {
      ...state,
      cartItems: action.payload,
    };
  } else if (action.type === CartItemsActionTypes.ADD_TO_CART) {
    // add the song to the cart items array with a quantity of 1
    return {
      ...state,
      cartItems: [...state.cartItems, action.payload],
    };
  } else if (action.type === CartItemsActionTypes.REMOVE_FROM_CART) {
    //does songId exist in cart
    const existingCartItem = state.cartItems.find(
      (cartItem) => cartItem.cartId === action.payload
    );

    //if existing cart item does not exist, do nothing
    if (!existingCartItem) {
      return state;
    }

    //if existing cart item, we have to remove it from the cart
    if (existingCartItem) {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.cartId !== action.payload
        ),
      };
    }
  } else if (action.type === CartItemsActionTypes.RESET_CART){
    return {
      ...state,
      cartItems: action.payload,
    };
  } else if (action.type === CartItemsActionTypes.ADD_TO_CHECKOUT){
    return {
      ...state,
      checkoutItems: [...state.checkoutItems, action.payload],
    }; 
  } else if (action.type === CartItemsActionTypes.RESET_CHECKOUT){
    return {
      ...state,
      checkoutItems: null,
    };  
  } else {
    return state;
  }
};

export default cartItemsReducer;
