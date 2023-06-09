import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../Cart/CartProvider.jsx";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../User/UserProvider.jsx";
import CandyDisplay from "./CandyDisplay.jsx";
import "./Reviews.css"

function Reviews() {
  const { productType, product } = useParams();
  const [data, setData] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(0);
  const { user } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/${productType}/${product}/reviews`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.error("Error retrieving reviews:", error);
      }
    };

    fetchReviews();
  }, [productType, product, submissionStatus]);


  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
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
        setSubmissionStatus((prevStatus) => prevStatus + 1); // Trigger re-render of parent components
        setComment(""); // Clear the input field
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

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error occurred while fetching data</h1>;
  }

  return (

    <div className="container">
      <CandyDisplay product={data} className="candy-display"/>
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
      {!data || data.reviews.length === 0 ? (
        <div className="retrError">
          <h1>No reviews for this product</h1>
        </div>
      ) : (
        <div>
          {data.reviews.map((review) => (
            <div className="review-specifics">
            <ReviewDisplay review={review} />
          </div>
          ))}
        </div>
      )}
    </div>
  ); 
}

export default Reviews;
