import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../../components/Cart/CartProvider.jsx";
import { useLocation } from "react-router-dom";

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

function Products({ productType }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Make the HTTP request to fetch the products
    axios
      .get(`http://localhost:4000/api/Products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving products:", error);
      });
  }, []);

  useEffect(() => {
    // Filter the products based on the productType
    const filtered = products.filter(
      (product) => product.type === productType
    );
    setFilteredProducts(filtered);
  }, [products, productType, location]);

  if (!filteredProducts) {
    console.error("Error: Items could not be retrieved.");
    return (
      <div className="retrError">
        <h1>Error: Items could not be retrieved</h1>
      </div>
    );
  }

  return (
    <div className="allProducts">
      {filteredProducts.map((product) => (
        <div key={product.id}>
          <CandyDisplay product={product} />
        </div>
      ))}
    </div>
  );
}

export default Products;
