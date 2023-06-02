import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Checkout.css";
import { CartContext } from "../Cart/CartProvider";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";


const CartSummaryPage = () => {
  const products = useSelector((state) => state.cart.products);
  const { cartItems, calculateTotalAmount, clearCart, removeFromCart, checkout } = useContext(CartContext);

  const calculateTotal = () => {
    // Calculate the total price of all items in the cart
    const totalPrice = products.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return totalPrice.toFixed(2);
  };

  useEffect(() => {
    // This effect will be triggered whenever the cart contents change
    // You can perform additional logic here if needed
    console.log("Cart contents updated:", products);
  }, [products]);

  const handleDelete = (itemId) => {
    removeFromCart(itemId);
  };

  return (
    <div className="cart-summary-page">
      <h1>Cart Summary</h1>
      {cartItems?.map((item) => (
        <div className="item" key={item.id}>
          <img src={item.image_address} alt="" />
          <div className="details">
            <h1>{item.name}</h1>
            <div className="price">1 x ${item.price}</div>
          </div>
          <DeleteOutlinedIcon
            className="delete"
            onClick={() => handleDelete(item.id)}
          />
        </div>
      ))}
      <div className="total">
        <span>SUBTOTAL</span>
        <span>${calculateTotal()}</span>
      </div>
      <button>
      <span className="checkout" onClick={checkout()}>
          PROCEED TO CHECKOUT
        </span>
      </button>
      <span className="reset">Reset Cart</span>
    </div>
  );
};

export default CartSummaryPage;
