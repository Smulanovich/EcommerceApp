import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation, useParams, Link } from "react-router-dom";
import CandyDisplay from "./CandyDisplay.jsx";

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
          <CandyDisplay product={product} />
      ))}
    </div>
  );
}

export default ProductDisplay;
