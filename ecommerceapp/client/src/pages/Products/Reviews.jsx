import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../Cart/CartProvider.jsx";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../User/UserProvider.jsx";
import CandyDisplay from "./CandyDisplay.jsx";

function Reviews() {
  const { productType, product } = useParams();
  const [reviews, setReviews] = useState([]);
  const [productObject, setProductObject] = useState({});
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/products/${productType}/${product}`)
      .then((response) => {
        setProductObject(response.data);
        setLoading(false);
        console.log("productObject: ", response.data);
      })
      .catch((error) => {
        console.error("Error retrieving product:", error);
        setLoading(false);
        setError(true);
      });
  }, [productType, product, location]);

  useEffect(() => {
    if (Object.keys(productObject).length === 0) {
      return; // Wait until productObject is retrieved
    }

    axios
      .get(`http://localhost:4000/api/${productType}/${product}/reviews`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving reviews:", error);
        setError(true);
      });
  }, [productType, product, location, productObject]);

  console.log("reviews: ", reviews);

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    if (!user) {
      console.log("User not logged in");
      alert("Please log in to add a review");
      navigate("/account");
      return;
    }

    const authorEmail = user.email;

    try {
      const addSuccess = await axios.post(
        `http://localhost:4000/api/${productType}/${product}/reviews/add`,
        { authorEmail, comment }
      );

      if (addSuccess) {
        console.log("Added review");
      } else {
        console.log("Failed to add review");
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const ReviewDisplay = (props) => {
    return (
      <div className="review">
        <h2>{props.review.email}</h2>
        <p>{props.review.comment}</p>
      </div>
    );
  };

  console.log("productObject: ", productObject);

  if (loading) {
    return <h1>Loading...</h1>; 
  }

  return (
    <div>
      <CandyDisplay product={productObject} />
      <div className="review-form">
        <h2>Write a Review</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            name="comment"
            placeholder="Your Review"
            value={comment}
            onChange={handleInputChange}
            required
          ></textarea>
          <button type="submit">Submit Review</button>
        </form>
      </div>
      {!reviews && (
        <div className="retrError">
          <h1>No reviews for this product</h1>
        </div>
      )}
      {reviews &&
        reviews.map((review) => <ReviewDisplay review={review} />)}
    </div>
  );
}

export default Reviews;
