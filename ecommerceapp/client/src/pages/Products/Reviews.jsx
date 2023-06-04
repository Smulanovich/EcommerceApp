import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../Cart/CartProvider.jsx";
import { useLocation, useParams, Link } from "react-router-dom";
import { UserContext } from "../User/userProvider";
import { useNavigate } from "react-router-dom";



function Reviews () {
    const { productType, product } = useParams();
    const [reviews, setReviews] = useState([]);
    const [userReview, setUserReview] = useState({authorEmail: "", comment:""});
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const location = useLocation();
    const { returnUser } = useContext(UserContext);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const goToAccount = () => {
        navigate("/account");
      };

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
        
        const handleInputChange = (event) => {
            setUserReview({
                ...userReview,
                [event.target.name]: event.target.value
            });
        };


        const handleSubmit = (event) => {
            event.preventDefault();

            const currentUser = returnUser();
            if(!currentUser){
                console.error("User is not logged in.");
                setIsLoggedIn(false);
                return;
            }

            const reviewData = {
                ...userReview,
                authorEmail: currentUser.email,
            };

            axios 
            .post(`http://localhost:4000/api/${productType}/${product}/reviews`, userReview)
            .then((response) => {
                setReviews([...reviews, response.data]);
                setUserReview({authorEmail: "", comment:""});
                setIsLoggedIn(true);
                setIsSubmitted(true);
            })
            .catch((error) => {
                console.error("Error adding review:", error);

            });
        };

        const ReviewDisplay = (props) => {
            return (
                 <div className="review">
                     <h2>{props.review.authorEmail}</h2>
                     <p>{props.review.comment}</p>
                 </div>
             );
         };

        return (
            <div>
                <div className="product">
                    <img src={product.image_address} alt={product.name} />
                    <h2>{product.name}</h2>
                </div>
                <div className="review-form">
                    <h2>Write a Review</h2>
                    {isSubmitted && isLoggedIn (<p>Review submitted successfully!</p>)}
                    {!isLoggedIn && (
                        <div>
                            <p>Please log in to submit a review.</p>
                            <button className="link-btn" onClick={goToAccount}> Login here. </button>
                        </div>
                    )}
                    {isLoggedIn && ( 
                        <form onSubmit={handleSubmit}>
                        <textarea
                            name="comment"
                            placeholder="Your Review"
                            value={userReview.comment}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                        <button type="submit">Submit Review</button>
                    </form>
                    )}
                </div>
                 {!reviews && (
                    <div className="retrError">
                        <h1>No reviews for this product</h1>
                    </div>
                 )}
                 {reviews &&
                 reviews.map((review) => <ReviewDisplay key={review.id} review={review} />)}
                
            </div>
                 
    );
}
export default Reviews;


{/* I have to add a review box where you can add in a review but the userContext can't be null(meaning you've signed in ) then if not signed it it will give you a button you can click to go sign in  */}