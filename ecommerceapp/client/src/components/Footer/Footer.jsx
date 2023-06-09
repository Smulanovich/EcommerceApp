import React from "react";
import logo from "../../images/CandyLand_Logo_Blue.png";
import twitter from "./twitter.png";
import instagram from "./instagram.png";
import './Footer.css'

const Footer = () => {
    return (
<footer class="footer">
  <div class="logo">
  <img className="logo" src={logo} alt="Candyland Logo" />
  </div>
  <p class="copy-text">&copy; 2023, CS35L Academic Weapons. All rights reserved.</p>
  <div class="social-media">
  <a href="#" class="social-link">
    <img src={twitter} alt="Twitter" class="social-icon" />
  </a>
  <a href="#" class="social-link">
    <img src={instagram} alt="Instagram" class="social-icon" />
  </a>
</div>

</footer>
    );
}

export default Footer;