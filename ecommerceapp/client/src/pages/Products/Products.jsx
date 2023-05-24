import React from "react";
import { Link } from "react-router-dom";
import "./Products.css";

const Products = () => {
    return (
        <div className="Products">
            <Link className="ProductLink" to="/products/CandyBars">Candy Bars</Link>
            <Link className="ProductLink" to="/products/CandyCorn">Candy Corn</Link>
            <Link className="ProductLink" to="/products/CandySticks">Candy Sticks</Link>
        </div>
    );
}

export default Products;