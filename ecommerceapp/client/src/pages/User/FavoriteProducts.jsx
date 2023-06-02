import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CandyDisplay from "../Products/CandyDisplay.jsx";
import axios from 'axios';
import { UserContext } from "./UserProvider.jsx";

const FavoriteProducts = () => {
  const { user } = useContext(UserContext);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const navigate = useNavigate();

  const GoToAccount = () => {
    navigate("/account");
  };

  useEffect(() => {
    if (!user) return;

    axios.get(`http://localhost:4000/api/users/${user.email}/favorites`)
      .then((response) => {
        setFavoriteProducts(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving favorite products:", error);
      });
  }, [user]);

  if (!user) {
    return (
      <div className="notLoggedIn">
        <h1>You are not logged in.</h1>
        <p>
          Please <Link to="/account">login</Link> to view your favorite products.
        </p>
        <button onClick={GoToAccount}>Go to login page</button>
      </div>
    );
  }

  return (
    <div className="allProducts">
      {favoriteProducts.map((product) => (
        <CandyDisplay product={product} />
      ))}
    </div>
  );
}

export default FavoriteProducts;
