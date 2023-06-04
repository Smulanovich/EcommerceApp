import React, { createContext, useState } from "react";
import { UserContext } from "../User/UserProvider";

export const CartContext = createContext();

function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemId) => {
    const index = cartItems.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      const newCartItems = [...cartItems];
      newCartItems.splice(index, 1);
      setCartItems(newCartItems);
    }
  };
  

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartSize = () => {
    return cartItems.length;
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };



  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartSize,
        calculateTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
