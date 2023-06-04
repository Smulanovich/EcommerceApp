import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import CandyDisplay from "./CandyDisplay.jsx";
import { UserContext } from "../../pages/User/UserProvider.jsx";
import { CartContext } from "../Cart/CartProvider.jsx";
import ViewReviewsButton from "./ViewReviewsButton.jsx";
import "./ProductDisplay.css"; 


function ProductDisplay() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const { productType } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const AddToFavorites = async (product) => {
    console.log("User: ", user);
    if (!user) {
      console.log("User not logged in");
      alert("Please log in to add to favorites");
      navigate("/account");
      return;
    }
    const userEmail = user.email;
    try {
      const addSucces = await axios.post(
        `http://localhost:4000/api/users/favorite/${product.name}/add`,
        { userEmail, product }
      );
      if (addSucces) {
        console.log("Added to favorites");
      } else {
        console.log("Failed to add to favorites");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

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

  console.log("User: ", user);
  return (
    <div className="allProducts">
      {products.map((product) => (
        <div>
          <CandyDisplay product={product} />
          <button className="Favorites" onClick={() => AddToFavorites(product)}>
            Add To Favorites
          </button>
          <ViewReviewsButton productName={product.name}/>
        </div>
      ))}
    </div>
  );
}

export default ProductDisplay;
