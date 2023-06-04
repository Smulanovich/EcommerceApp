import React, { useContext } from "react";
import { CartContext } from "../Cart/CartProvider.jsx";
import "./CandyDisplay.css"; 

const CandyDisplay = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const productNameUpperCase = product.name.toUpperCase();
  console.log("product: ", productNameUpperCase);

  return (
    <div className="product-container">
      <div className="product">
        <h2>{productNameUpperCase}</h2>
        <img src={product.image_address} alt={`${product.name} img`} />
        <p>Price: {product.price}</p>
        <button className="addToCart" onClick={() => addToCart(product)}>Add to cart</button>
      </div>
    </div>
  );
};

export default CandyDisplay;
