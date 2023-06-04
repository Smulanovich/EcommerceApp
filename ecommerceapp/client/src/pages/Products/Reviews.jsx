import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../Cart/CartProvider.jsx";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../User/UserProvider.jsx";

function Reviews() {
  const { productType, product } = useParams();
  const [reviews, setReviews] = useState([]);
  const [productObject, setProductObject] = useState({});
  const [comment, setComment] = useState('');
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

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
    alert(authorEmail);
  
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

  return (
    <div>
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
