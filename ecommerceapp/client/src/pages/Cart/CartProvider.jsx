import React, { createContext, useState, useEffect } from "react";
import localforage from "localforage";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    localforage.getItem("cartItems").then((storedCartItems) => {
      if (storedCartItems) {
        setCartItems(storedCartItems);
      }
    });
  }, []);

  useEffect(() => {
    localforage.setItem("cartItems", cartItems);
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
    localforage.removeItem("cartItems");
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
