import React from "react";
import logo from "./logo.png"
import './Footer.css'
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="Footer">
                <div className="item">
                    <h1>Categories</h1>
                    <div className="links">
                    <Link className="link" to="/products/CandyBars">Candy Bars</Link>
                    <Link className="link" to="/products/CandyCorn">Candy Corn</Link>
                    <Link className="link" to="/products/CandySticks">Candy Sticks</Link>
                    <Link className="link" to="/products/ExoticCandy">Exotic Candy</Link>
                    <Link className="link" to="/products/PremiumCandy">Premium Candy</Link>
                </div>
                </div>
                <img src={logo} alt="Website Logo" className="logo"/>
        </div>
    );
}

export default Footer;