import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductDisplay({ product }) {
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
  if (!(productType >= 1 && productType <= 3)) {
    console.error('Invalid item type');
    return null;
  }

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

  return (
    <div className="allProducts">
      {filteredProducts.map(product => (
        <div key={product.id}><ProductDisplay product={product} /></div>
      ))}
    </div>
  );
}

export default Products;
