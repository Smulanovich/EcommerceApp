import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../Cart/CartProvider.jsx";
import { useLocation, useParams, Link } from "react-router-dom";
import ViewReviewsButton from "./ViewReviewsButton.jsx";

const CandyDisplay = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product">
      <h2>{product.name}</h2>
      <img src={product.image_address}/>
      <p>Price: {product.price}</p>
      <button onClick={() => addToCart(product)}>Add to cart</button>
    </div>
  );
};

function ProductDisplay() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const { productType } = useParams();

  useEffect(() => {
    // Make the HTTP request to fetch the products
    axios
      .get(`http://localhost:4000/api/products/${productType}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving products:", error);
      });
  }, [productType, location]);

  if (!products) {
    console.error("Error: Items could not be retrieved.");
    return (
      <div className="retrError">
        <h1>Error: Items could not be retrieved</h1>
      </div>
    );
  }

  return (
    <div className="allProducts">
      {products.map((product) => (
          <div className="product">
            <CandyDisplay product={product} />
            <ViewReviewsButton productName={product.name}/>
          </div>
      ))}
    </div>
  );
}

export default ProductDisplay;
