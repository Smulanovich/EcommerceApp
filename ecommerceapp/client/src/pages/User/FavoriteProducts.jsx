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

  const removeFavorite = async (product) => {
    try {
      const removeSucces = await axios.post(
        `http://localhost:4000/api/users/favorite/${product.name}/remove`,
        { userEmail: user.email, product }
      );
      if (removeSucces) {
        console.log("Removed from favorites");
        setFavoriteProducts((prevProducts) =>
          prevProducts.filter((p) => p.name !== product.name)
      );
      } else {
        console.log("Failed to remove from favorites");
      }
    }
    catch (error) {
      console.error("Error removing from favorites:", error);
    }
  }

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
        <div className="reviewProduct">
          <CandyDisplay product={product} />
          <button onClick={() => removeFavorite(product)}>Remove from Favorites</button>
        </div>
      ))}
    </div>
  );
}

export default FavoriteProducts;
