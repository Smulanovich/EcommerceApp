import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import "./Navbar.css"; 
import { CartContext } from "../../pages/Cart/CartProvider.jsx";


const Navbar = () => {

    const { getCartSize } = useContext(CartContext);

    return (
        <div className="Navbar">
            <div className="wrapper">   
                <div className="left">
                    <div className="item">
                        <Link className="link" to="/products/CandyBar">Candy Bars</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/products/CandyCorn">Candy Corn</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/products/CandyStick">Candy Sticks</Link>
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
                            <Link className="link" to="/Cart"><LocalMallOutlinedIcon/></Link>
                            <span>{getCartSize()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Navbar;
