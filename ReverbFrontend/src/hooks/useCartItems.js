import { useCallback, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "../context/auth/AuthContext";
import {
  getCart,
  addToCart,
  removeFromCart,
  resetCart,
  addToCheckout,
  resetCheckout
} from "../context/cartItems/cartItemsActions";
import cartItemsReducer from "../context/cartItems/cartItemsReducer";
import useHttp from "./useHttp";

function useCartItems() {
  const initialState = {
    cartItems: [],
    checkoutItems: [],
  };
  const [{ cartItems, checkoutItems }, dispatch] = useReducer(cartItemsReducer, initialState);
  const http = useHttp("http://localhost:8080/reverb");
  const { jwt } = useContext(AuthContext);

  const fetchCart = useCallback(async () => {
    const response = await http.get("/cartItems", 
    {
        headers: {
            Authorization: jwt ? `Bearer ${jwt}` : "",
        },
    });
    dispatch(getCart(response.data));
  }, [http, jwt]);


  const handleAddToCart = useCallback(async (song) => {
    const { data: addedSong } = await http.post("addToCart", {...song,},
    {
        headers: {
            Authorization: jwt ? `Bearer ${jwt}` : "",
        },
    });
    dispatch(addToCart(song));
    }, [http, jwt]
  );

  const handleRemoveFromCart = async (cartId) => {
      await http.delete(`/cartItem/${cartId}`,
      {
          headers: {
              Authorization: jwt ? `Bearer ${jwt}` : "",
          },
      });
      dispatch(removeFromCart());
   
  };

  const handleResetCart =  async () => {
    await http.delete(`/cartItems`,
    {
        headers: {
            Authorization: jwt ? `Bearer ${jwt}` : "",
        },
    });
    dispatch(removeFromCart());
 
};

  const handleAddToCheckout = (song) => {
    dispatch(addToCheckout(song));
  };

  const handleResetCheckout = useCallback(() => {
    dispatch(resetCheckout());
  }, []);

  return {
    cartItems,
    checkoutItems,
    fetchCart,
    handleAddToCart,
    handleRemoveFromCart,
    handleResetCart,
    handleAddToCheckout,
    handleResetCheckout
  };
}

export default useCartItems;
