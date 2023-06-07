import React, { useContext } from "react";
import { CartContext } from "../Cart/CartProvider.jsx";
import "./CandyDisplay.css"; 

const CandyDisplay = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-container">
      <div className="product">
        <h2>{product.name}</h2>
        <img src={product.image_address} alt={`${product.name} img`} />
        <p className="price">{product.price}$</p>
      </div>
      <button className="addToCart" onClick={() => addToCart(product)}>Add to cart</button>
    </div>
  );
};

export default CandyDisplay;
