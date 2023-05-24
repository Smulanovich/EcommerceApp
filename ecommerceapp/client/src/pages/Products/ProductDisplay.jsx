import React, { useEffect, useState } from "react";
import axios from "axios";

function CandyDisplay({ product }) {
  return (
    <div className="product">
      <h2>{product.name}</h2>
      <img src={product.image_address} alt={`${product.name} img`} />
      <p>Price: {product.price}</p>
      <button>Add to cart</button>
    </div>
  );
}

const Products = ({ productType }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Make the HTTP request to fetch the products
    axios.get(`http://localhost:4000/api/products`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error retrieving products:', error);
      });
  }, []);

  useEffect(() => {
    // Filter the products based on the productType
    const filtered = products.filter(product => product.type === productType);
    setFilteredProducts(filtered);
  }, [productType, products]);

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
      {filteredProducts.map(product => (
        <div key={product.id}><CandyDisplay product={product} /></div>
      ))}
    </div>
  );
}

export default Products;
