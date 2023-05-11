import React from "react";
import { Link } from "react-router-dom";
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';


const Navbar = () => {
  return (
    <div className="Navbar">
        <div className="wrapper">
            <div className="left">
                <div className="item">
                    <Link to="/products/1">Candy Bars</Link>
                </div>
                <div className="item">
                    <Link to="/products/2">Candy Corn</Link>
                </div>
                <div className="item">
                    <Link to="/products/3">Candy Sticks</Link>
                </div>
            </div>
            <div className="center">
                <Link to="/">Candyland</Link>
            </div>
            <div className="right"></div>
        </div>
    </div>
  );
};

export default Navbar;
