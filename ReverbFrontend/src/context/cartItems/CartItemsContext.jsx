import { createContext, useEffect } from "react";
import useCartItems from "../../hooks/useCartItems";

export const CartItemsContext = createContext({
  cartItems: [],
  checkoutItems: [],
  fetchCart: () => {},
  handleAddToCart: () => {},
  handleRemoveFromCart: () => {},
  handleResetCart: () => {},
  handleAddToCheckout: () => {},
  handleResetCheckout: () => {}
});

export const CartItemsProvider = ({ children }) => {
  const { 
    cartItems, 
    checkoutItems, 
    fetchCart,
    handleAddToCart, 
    handleRemoveFromCart,
    handleResetCart, 
    handleAddToCheckout,
    handleResetCheckout } = useCartItems();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartItemsContext.Provider
      value={{
        cartItems,
        checkoutItems,
        fetchCart,
        handleAddToCart,
        handleRemoveFromCart,
        handleResetCart,
        handleAddToCheckout,
        handleResetCheckout
      }}
    >
      {children}
    </CartItemsContext.Provider>
  );
};
