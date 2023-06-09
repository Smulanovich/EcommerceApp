import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { CartContext } from "./CartProvider";
import { UserContext } from "../User/UserProvider";

const Cart = () => {
  const { cartItems, calculateTotalAmount, clearCart, removeFromCart, incrementItem, decrementItem } = useContext(CartContext);
  const { user } = useContext(UserContext);
  console.log(cartItems);

  const navigate = useNavigate();

  const GoToCheckoutForm = () => {
    if (!user) {
      console.log('User not logged in');
      alert('Please login to checkout');
      navigate('/account');
      return;
    }
    if (cartItems.length === 0) {
      return;
    }
    navigate("/checkout");
  };

  const handleDelete = (name) => {
    removeFromCart(name);
  };

  const handleResetCart = () => {
    clearCart();
  };

  const handleIncrement = (name) => {
    incrementItem(name);
  };

  const handleDecrement = (name) => {
    decrementItem(name);
  };

  return (
    <div className="cart">
      <div className="total">
        <span>SUBTOTAL: ${calculateTotalAmount()}</span>
      </div>
      <div className="buttons">
        <button>
          <span className="checkout" onClick={() => GoToCheckoutForm()}>
            PROCEED TO CHECKOUT
          </span>
        </button>
        <span className="reset" onClick={handleResetCart}>
          Reset Cart
        </span>
      </div>
      <h1>Products in your cart:</h1>
      {cartItems?.map(([item, quantity]) => (
        <div className="item" key={item.id}>
          <img src={item.image_address} alt="" />
          <div className="details">
            <h1 className="name">{item.name}</h1>
            <div className="price">${item.price}</div>
            <div className="quantity">
              <button className="subtract" onClick={() => handleDecrement(item.name)}>
                -
              </button>
              <span className="quantity-number">{quantity}</span>
              <button className="add" onClick={() => handleIncrement(item.name)}>
                +
              </button>
            </div>
          </div>
          <DeleteOutlinedIcon
            className="delete"
            onClick={() => handleDelete(item.name)}
          />
        </div>
      ))}
    </div>
  );
};

export default Cart;
