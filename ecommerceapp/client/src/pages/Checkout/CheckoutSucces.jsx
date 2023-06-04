import React from "react";
import { useNavigate } from 'react-router-dom'; 

const CheckoutSuccess = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Checkout Success</h1>
            <h2>Thank you for your order, please come pick it up during our hours of operation.</h2>
            <button onClick={() => navigate('/')}>Go back to homepage</button>
        </div>
    );
};

export default CheckoutSuccess;