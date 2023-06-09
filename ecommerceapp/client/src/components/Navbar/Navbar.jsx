import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import "./Navbar.css";
import Cart from "../../pages/Cart/Cart";
import { CartContext } from "../../pages/Cart/CartProvider";
import axios from "axios";
import logo from "../../images/CandyLand_Logo_Blue.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getCartSize } = useContext(CartContext);
  const [candyProducts, setCandyProducts] = useState([]);
  const collections = ["CandyBar", "CandyCorn", "CandyStick"];
  const navigate = useNavigate("");

  useEffect(() => {
    const fetchCandyProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        setCandyProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error retrieving candy items:", error);
      }
    };

    fetchCandyProducts();
  }, []);

  const handleSearch = (item) => {
    setSearchQuery(item.name);
    navigate(`/products/${collections[item.type - 1]}/${item.name}/reviews`);
  };

  const filterCandyProducts = (searchTerm) => {
    return candyProducts.filter((item) => {
      const itemName = item.name.toLowerCase();
      return itemName.includes(searchTerm.toLowerCase());
    });
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
  };

  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="Navbar">
      <div className="wrapper">
        <div className="center">
          <div className="left">
            <Link className="link" to="/">
              <img className="logo" src={logo} alt="Candyland Logo" />
            </Link>
          </div>
        </div>
        <div className="middle">
          {/* Search Bar */}
          <div
            className="searchBar"
            onFocus={() => setShowOverlay(true)}
            onBlur={() => setShowOverlay(false)}
          >
            <input
              className="searchInput"
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Craving something more specific?"
            />
            <div className="searchButton">
              <SearchOutlinedIcon className="searchIcon" />
            </div>
            <div className="dropDownMenu">
              {filterCandyProducts(searchQuery)
                .slice(0, 5)
                .map((item) => (
                  <div
                    onClick={() => handleSearch(item)}
                    className="dropDownRow"
                    key={item.id}
                  >
                    {item.name.toUpperCase()}
                  </div>
                ))}
            </div>
          </div>
          {/* Overlay */}
          {showOverlay && <div className="overlay"></div>}
        </div>
        <div className="right">
          <div className="item">
            <Link className="link" to="/AboutContact/About">
              About
            </Link>
          </div>
          <div className="item">
            <Link className="link" to="/AboutContact/Contact">
              Contact
            </Link>
          </div>
          <div className="icons">
            <Link className="link" to="/account">
              <AccountCircleOutlinedIcon />
            </Link>
            <Link className="link" to="/account/favorites">
              <GradeOutlinedIcon />
            </Link>
            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <LocalMallOutlinedIcon />
              <span>{getCartSize()}</span>
            </div>
          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  );
};

export default Navbar;
