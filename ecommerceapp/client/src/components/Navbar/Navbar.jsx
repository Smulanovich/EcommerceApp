import React, { useState, useContext } from "react";import { Link } from "react-router-dom";
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import "./Navbar.css"; 
import Cart from '../../pages/Cart/Cart';
import { CartContext } from "../../pages/Cart/CartProvider";
import axios from "axios";
import { useEffect } from "react";


const Navbar = () => {
  const [open,setOpen] = useState(false)

  const [searchQuery, setSearchQuery] = useState("");

  const [productRetrieved, setProductRetrieved] = useState(null);

  const [showSearchBar, setShowSearchBar] = useState(false);

  const [productName, setProductname] = useState(null);



  const { cartItems, calculateTotalAmount, clearCart, removeFromCart, checkout, getCartSize, serchForCandy } = useContext(CartContext);


  // const handleSearchIconClick = () => {
  //   setShowSearchBar(!showSearchBar);
  // };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const insertingResponse = await axios.post(
        "http://localhost:4000/api/search",
        { productName }
      );
      if (handleSearch.data) {
        console.log("Product found");
        setProductRetrieved(productRetrieved.data);
      } 
      else {
        console.log("Search failed");
      }
    } 
    catch (error) {
      console.error("Could not find product", error);
    }
  };
  


  
  return (
    <div className="Navbar">
      <div className="wrapper">
      <div className="center">
          <Link className="link" to="/">
            Candyland
          </Link>
        </div>
        <div className="left">
        </div>
          <div className="item">
            <Link className="link" to="/products/CandyBar">
              Candy Bars
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/CandyCorn">
              Candy Corn
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/CandyStick">
              Candy Sticks
            </Link>
          </div>
        <div className="right">
          {/* Search Bar */}
          <div className="searchBar">
            <input
              className="searchInput"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
              placeholder="What are you looking for?"
            />
            <div className="searchButton" onClick={handleSearch}>
              <SearchOutlinedIcon className="searchIcon" />
            </div>
          </div>
          {/* End of Search Bar */}
          {/* <div className="item">
            <Link className="link" to="/">
              Homepage
            </Link>
          </div> */}
          <div className="item">
            <Link className="link" to="/">
              About
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/">
              Contact
            </Link>
          </div>
          <div className="icons">
            {/* <SearchOutlinedIcon /> */}
            <Link className="link" to="/account"><AccountCircleOutlinedIcon/></Link>
            <Link className="link" to='/account/favorites'><GradeOutlinedIcon/></Link>
            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <LocalMallOutlinedIcon />
              <span>{(getCartSize())}</span>
            </div>
          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  );
};

export default Navbar;
