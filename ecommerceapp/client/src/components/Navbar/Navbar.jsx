import React from "react";
import { Link } from "react-router-dom";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import "./Navbar.css"; 


const Navbar = () => {
  return (
    <div className="Navbar">
        <div className="wrapper">   
            <div className="left">
                <div className="item">
                    <Link className="link" to="/products/CandyBars">Candy Bars</Link>
                </div>
                <div className="item">
                    <Link className="link" to="/products/CandyCorn">Candy Corn</Link>
                </div>
                <div className="item">
                    <Link className="link" to="/products/CandySticks">Candy Sticks</Link>
                </div>
            </div>
            <div className="center">
                <Link className="link" to="/">Candyland</Link>
            </div>
            <div className="right">
                <div className="item">
                    <Link className="link" to="/">Homepage</Link>
                </div>
                <div className="item">
                    <Link className="link" to="/">About</Link>
                </div>
                <div className="item">
                    <Link className="link" to="/">Contact</Link>
                </div>
                <div className="icons">
                    <SearchOutlinedIcon/>
                    <AccountCircleOutlinedIcon/>
                    <GradeOutlinedIcon/>
                    <div className="cartIcon">
                        <LocalMallOutlinedIcon/>
                        <span>0</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Navbar;
