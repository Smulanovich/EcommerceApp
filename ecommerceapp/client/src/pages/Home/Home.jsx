import React from "react";
import Slider from "../../components/Slider/Slider.jsx";
import "./Home.css";
import skittles from "../../images/skittles.png";
import kitkat from "../../images/kitkat.png";
import twizzlers from "../../images/twizzlers.png";
import Footer from "../../components/Footer/Footer.jsx";

const Home = () => {
    return (
        <div className="homepage">
            <br />
            <h1 className="title">What type of candy do you like?</h1>
            <div className="categories">
                <a href="/products/CandyBar" className="category-link">
                    <img src={kitkat} alt="KitKat Image" className="category-image" />
                    <div className="category-overlay">
                        <div className="category-text">Explore Candy Bars</div>
                    </div>
                </a>
                <a href="/products/CandyCorn" className="category-link">
                    <img src={skittles} alt="Skittles Image" className="category-image" />
                    <div className="category-overlay">
                        <div className="category-text">Explore Candy Corn</div>
                    </div>
                </a>
                <a href="/products/CandyStick" className="category-link">
                    <img src={twizzlers} alt="Twizzlers Image" className="category-image" />
                    <div className="category-overlay">
                        <div className="category-text">Explore Candy Sticks</div>
                    </div>
                </a>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
