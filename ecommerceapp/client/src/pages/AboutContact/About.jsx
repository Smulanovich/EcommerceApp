import React from "react";
import "./About.css"
import logo from "../../images/CandyLand_Logo_Blue.png";


function About() {
    return (
        <div className= "about-container">
            <div className="about-content">
                <h2 className="about-heading">What We Do</h2>
                <p className="about-paragraph">
                    Here at CandyLand we take pride in what we do. Our team has been working on delivering the best candy known to man since we became a business. As my father once told me, "In order to keep people's attention, you have to give them what they want" which is why your wish is our command, anything candy related of course. We began this company four years ago and since the beginning we've made sure that the whole process from selection to delivery be the most efficient in the business. 
                </p>
                <p className="about-paragraph">
                    This and many other reasons is why you should buy your candy from CandyLand! 
                </p>
                <h2 className="about-heading">Founders</h2>
                <p className="about-paragraph">Santiago Mulanovich</p>
                <p className="about-paragraph">Christian Kattie</p>
                <p className="about-paragraph">Mario Prado</p>
                <p className="about-paragraph">Mekael Yesfa</p>
            </div>
        </div>
    );
}
export default About;