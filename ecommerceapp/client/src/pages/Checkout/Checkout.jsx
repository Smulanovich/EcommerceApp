import React, { useState } from "react";import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CartSummaryPage = () => {
    const products = useSelector((state) => state.cart.products);
  
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
  
    return (
      <div className="cart-summary-page">
        <h1>Cart Summary</h1>
        {products?.map((item) => (
          <div className="item" key={item.id}>
            <img src={item.img} alt={item.title} />
            <div className="details">
              <h1>{item.title}</h1>
              <p>{item.desc.substring(0, 100)}</p>
              <div className="price">
                {item.quantity} x ${item.price}
              </div>
            </div>
          </div>
        ))}
        <div className="total">
          <span>SUBTOTAL</span>
          <span>${calculateTotal()}</span>
        </div>
        <button>
          <Link className="link" to="/Checkout/Checkout.jsx">
            PROCEED TO CHECKOUT
          </Link>
        </button>
        <span className="reset">Reset Cart</span>
      </div>
    );
  };
  
  export default CartSummaryPage;
