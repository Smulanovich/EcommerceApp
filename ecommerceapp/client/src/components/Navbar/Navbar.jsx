
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import "./Navbar.css"; 
import Cart from '../../pages/Cart/Cart';
import { CartContext } from "../../pages/Cart/CartProvider";
import axios from "axios";
import { useEffect } from "react";
import logo from "../../images/CandyLand_Logo_Blue.png";



const Navbar = () => {

  const [open,setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const { getCartSize } = useContext(CartContext);
  const [candyProducts, setCandyProducts] = useState([]);
  const collections = ['CandyBar', 'CandyCorn', 'CandyStick'];
  const navigate = useNavigate('');


  const handleSearch = async (e) => {
    setSearchQuery(e.name);
    navigate(`/products/${collections[e.type - 1]}/${e.name}/reviews`);


  };


  useEffect(() => {
    const fetchCandyProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products');
        setCandyProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error retrieving candy items:', error);
      }
    };

    fetchCandyProducts();
  }, []);
    

  console.log("searchQuery: ", searchQuery);
  return (
    <div className="Navbar">
      <div className="wrapper">
      <div className="center">
          <Link className="link" to="/">
          <img className="logo" src={logo} alt="Candyland Logo" />
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
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?"
            />
            <div className="searchButton">
              <SearchOutlinedIcon className="searchIcon" />
            </div>
            <div className="dropDownMenu">
            {candyProducts
            .filter(item => {
              const searchTerm = searchQuery.toLowerCase();
              const itemName = item.name.toLowerCase();
              return searchTerm && itemName.startsWith(searchTerm) && itemName !== searchTerm; 
            })
            .slice(0,5)
            .map(item => (
              <div 
              onClick={()=>handleSearch(item)} 
              className="dropDownRow"
              >
                {item.name.toUpperCase()}
              </div>
            ))}
            </div>
          </div>
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
