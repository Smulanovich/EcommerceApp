import React, { createContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export const CartContext = createContext();

const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY");

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemName) => {
    setCartItems(cartItems.filter((item) => item.id !== itemName));
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

  const checkout = async () => {
    const stripe = await stripePromise;

    const response = await fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: calculateTotalAmount() }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error.message);
      return;
    }
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
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
