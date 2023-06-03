import { Divider } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { CartContext } from "./CartProvider";


const Cart = () => {
  const { cartItems, calculateTotalAmount, clearCart, removeFromCart, checkout } = useContext(CartContext);
  console.log(cartItems);

  const handleDelete = (itemId) => {
    removeFromCart(itemId);
  };

  const handleResetCart = () => {
    clearCart();
  };
  

  return (
    <div className="cart">
      <h1>Products in your cart</h1>
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
        <span>${calculateTotalAmount()}</span>
      </div>
      <button>
        <Link className="link" to="/checkout">
          View Cart Summary
        </Link>
      </button>
      <div className="buttons">
        
      </div>
      <button>
        <span className="checkout" onClick={checkout()}>
        PROCEED TO CHECKOUT
        </span>
          
      </button>
      <span className="reset" onClick={handleResetCart}>
        Reset Cart
      </span>
    </div>
  );
};

export default Cart;
