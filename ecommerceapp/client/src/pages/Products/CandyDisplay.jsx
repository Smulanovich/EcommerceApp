import React, { useContext, useEffect } from "react";
import { CartContext } from "../Cart/CartProvider.jsx";
import "./CandyDisplay.css";

const CandyDisplay = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const addToCartButton = document.getElementById(`addToCart-${product.id}`);
    const cartMessage = document.getElementById("cartMessage");

    const handleClick = () => {
      // Show the cart message
      cartMessage.style.display = "block";

      // Hide the cart message after 3 seconds (3000 milliseconds)
      setTimeout(() => {
        cartMessage.style.display = "none";
      }, 3000);
    };

    addToCartButton.addEventListener("click", handleClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      addToCartButton.removeEventListener("click", handleClick);
    };
  }, [product.id]);

  return (
    <div className="product-container">
      <div className="product">
        <h2>{product.name}</h2>
        <img src={product.image_address} alt={`${product.name} img`} />
        <p className="price">{product.price}$</p>
      </div>
      <button id={`addToCart-${product.id}`} className="addToCart" onClick={() => addToCart(product)}>
        Add to cart
      </button>
      <div id="cartMessage" className="cartMessage">
        Item added to cart
      </div>
    </div>
  );
};

export default CandyDisplay;
