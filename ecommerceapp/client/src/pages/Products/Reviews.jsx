import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../Cart/CartProvider.jsx";
import { useLocation, useParams, Link } from "react-router-dom";

const reviewDisplay = (review) => {
   return (
        <div className="review">
            <h2>{review.authorEmail}</h2>
            <p>{review.comment}</p>
        </div>
    )
}

function Reviews () {
    const { productType, product } = useParams();
    const [reviews, setReviews] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // Make the HTTP request to fetch the products
        axios
            .get(`http://localhost:4000/api/${productType}/${product}/reviews`)
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error("Error retrieving reviews:", error);
            });
        }, [productType, product, location]);

    if (!reviews) {
        return (
        <h1>No reviews for the product</h1>
        );
    }

    return (
        <>
            {reviews.map((review) => (
            <reviewDisplay review={review} />
        ))}
        </>
    );
}
export default Reviews;