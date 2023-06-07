import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./ViewReviewsButton.css"

const ViewReviewsButton = ({ productName }) => {
    const {productType} = useParams();
    const navigate = useNavigate();
    const GoToReviews = () => {
        navigate(`/products/${productType}/${productName}/reviews`);
    };


    return (
        <div className="ViewReviewButton">
            <button className="viewReviews" onClick={() => GoToReviews()}>View reviews</button>
        </div>
    )
}

export default ViewReviewsButton;