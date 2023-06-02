import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CandyDisplay from "../Products/CandyDisplay.jsx";
import axios from 'axios';


const GoToAccount = () => {
    useNavigate("/account");
  };


const FavoriteProducts = (userEmail) => {
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    
    useEffect(() => {
        axios.get(`http://localhost:4000/api/users/${userEmail}/favorites`)
        .then((response) => {
            setFavoriteProducts(response.data);
        })
        .catch((error) => {
            console.error("Error retrieving favorite products:", error);
        });
    }, [userEmail]);

    
    if (!userEmail) {
        return (           
            <div className="notLoggedIn">
                <h1>You are not logged in.</h1>
                <p>Please <Link to="/account">login</Link> to view your favorite products.</p>
                <button onClick={() => GoToAccount()}>Go to login page</button>
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
