import React, { useContext } from "react";
import { CartContext } from "../Cart/CartProvider.jsx";

const CandyDisplay = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product">
      <h2>{product.name}</h2>
      <img src={product.image_address} alt={`${product.name} img`} />
      <p>Price: {product.price}</p>
      <button onClick={() => addToCart(product)}>Add to cart</button>
    </div>
  );
};

export default CandyDisplay;