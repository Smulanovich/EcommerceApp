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
    const existingItem = cartItems.find((cartItem) => cartItem[0].name === item.name);
    if (existingItem) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem[0].name === item.name) {
          return [cartItem[0], cartItem[1] + 1]; // Increase quantity by 1
        }
        return cartItem;
      });
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, [item, 1]]);
    }
  };

  const removeFromCart = (name) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem[0].name !== name);
    setCartItems(updatedCartItems);
  };

  const incrementItem = (name) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem[0].name === name) {
        return [cartItem[0], cartItem[1] + 1]; // Increase quantity by 1
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  };

  const decrementItem = (name) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem[0].name === name) {
        const newQuantity = cartItem[1] - 1;
        if (newQuantity <= 0) {
          return null; // Remove item from cart
        }
        return [cartItem[0], newQuantity];
      }
      return cartItem;
    });
    setCartItems(updatedCartItems.filter(Boolean)); // Remove null entries
  };

  const clearCart = () => {
    setCartItems([]);
    localforage.removeItem("cartItems");
  };

  const getCartSize = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem[1], 0);
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem[0].price * cartItem[1], 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementItem,
        decrementItem,
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
