import React, { useState } from "react";import { Link } from "react-router-dom";
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import "./Navbar.css"; 
import Cart from '../../pages/Cart/Cart';

const Navbar = () => {
  const [open,setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const performSearch = () => {
    /*
    const filteredResults = data.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredResults;
    */
  };

  const handleSearchIconClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  
  return (
    <div className="Navbar">
      <div className="wrapper">
        <div className="left">
          <div className="item">
            <Link className="link" to="/products/CandyBars">
              Candy Bars
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/CandyCorn">
              Candy Corn
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/products/CandySticks">
              Candy Sticks
            </Link>
          </div>
        </div>
        <div className="center">
          <Link className="link" to="/">
            Candyland
          </Link>
        </div>
        <div className="right">
          {/* Search Bar */}
          <div className="searchBar">
            <input
              className="searchInput"
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="What are you looking for?"
            />
            <div className="searchButton" onClick={performSearch}>
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
            <AccountCircleOutlinedIcon />
            <GradeOutlinedIcon />
            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <LocalMallOutlinedIcon />
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  );
};

export default Navbar;
