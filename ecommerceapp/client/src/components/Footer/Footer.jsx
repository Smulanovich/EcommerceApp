import React from "react";
import logo from "./logo.png"
import './Footer.css'

const Footer = () => {
    return (
        <div className="Footer">
            <img src={logo} alt="Website Logo" className="logo"/>
        </div>
    );
}

export default Footer;