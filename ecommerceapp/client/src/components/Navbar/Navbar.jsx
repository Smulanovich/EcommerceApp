import React, { useState, useContext } from "react";import { Link } from "react-router-dom";
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import "./Navbar.css"; 
import Cart from '../../pages/Cart/Cart';
import { UserContext } from "../../pages/User/UserProvider.jsx"
import { CartContext } from "../../pages/Cart/CartProvider";
import axios from "axios";
import { useEffect } from "react";


const Navbar = () => {

  const [open,setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(UserContext);
  const [productRetrieved, setProductRetrieved] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [productName, setProductname] = useState(null);
  const { cartItems, calculateTotalAmount, clearCart, removeFromCart, checkout, getCartSize, serchForCandy } = useContext(CartContext);

  const candyProducts = [
    // Existing candy products
    {
      id: 1,
      type: "CandyBar",
      name: "Snickers",
      price: 1.99,
      description: "Peanuts, caramel, nougat, and chocolate",
    },
    {
      id: 2,
      type: "CandyBar",
      name: "Skittles",
      price: 1.49,
      description: "Colorful fruit-flavored candies",
    },
    {
      id: 3,
      type: "CandyBar",
      name: "Starburst",
      price: 1.79,
      description: "Chewy fruit-flavored candies",
    },
    {
      id: 4,
      type: "CandyCorn",
      name: "Brach's Candy Corn",
      price: 0.99,
      description: "Classic tri-colored candy corn",
    },
    {
      id: 5,
      type: "CandyCorn",
      name: "Butterfinger",
      price: 1.29,
      description: "Crispy peanut butter and chocolate candy bar",
    },
    {
      id: 6,
      type: "CandyCorn",
      name: "Baby Ruth",
      price: 1.49,
      description: "Chocolate-covered nougat and caramel bar with peanuts",
    },
    {
      id: 7,
      type: "CandyStick",
      name: "Pixy Stix",
      price: 0.79,
      description: "Powder-filled fruit-flavored straws",
    },
    {
      id: 8,
      type: "CandyStick",
      name: "Pop Rocks",
      price: 0.99,
      description: "Fizzing candy that pops in your mouth",
    },
    {
      id: 9,
      type: "CandyStick",
      name: "Rock Candy Sticks",
      price: 1.29,
      description: "Crystalized sugar on a stick in various flavors",
    },
    {
      id: 10,
      type: "CandyBar",
      name: "Skor",
      price: 1.49,
      description: "Butter toffee covered in chocolate",
    },
    {
      id: 11,
      type: "CandyCorn",
      name: "Caramel Apple Candy Corn",
      price: 1.29,
      description: "Candy corn with caramel apple flavor",
    },
    {
      id: 12,
      type: "CandyStick",
      name: "Smarties Candy Rolls",
      price: 0.99,
      description: "Colorful candy tablets in a roll",
    },
    // Additional candy products
    {
      id: 13,
      type: "CandyBar",
      name: "Milky Way",
      price: 1.59,
      description: "Smooth nougat, caramel, and chocolate",
    },
    {
      id: 14,
      type: "CandyBar",
      name: "Reese's Peanut Butter Cups",
      price: 1.29,
      description: "Milk chocolate cups filled with peanut butter",
    },
    {
      id: 15,
      type: "CandyBar",
      name: "M&M's",
      price: 0.99,
      description: "Colorful chocolate candies with a crunchy shell",
    },
    {
      id: 16,
      type: "CandyCorn",
      name: "Jelly Belly Candy Corn",
      price: 1.49,
      description: "Gourmet candy corn with rich flavors",
    },
    {
      id: 17,
      type: "CandyCorn",
      name: "Reese's Pieces Candy Corn",
      price: 1.29,
      description: "Candy corn with peanut butter flavored filling",
    },
    {
      id: 18,
      type: "CandyCorn",
      name: "Candy Corn Pumpkins",
      price: 0.99,
      description: "Candy corn shaped like pumpkins",
    },
    {
      id: 19,
      type: "CandyStick",
      name: "Fun Dip",
      price: 0.79,
      description: "Powdered candy with a candy stick for dipping",
    },
    {
      id: 20,
      type: "CandyStick",
      name: "Airheads Xtremes Bites",
      price: 1.49,
      description: "Soft and chewy fruit-flavored candy bites",
    },
    {
      id: 21,
      type: "CandyStick",
      name: "Tootsie Roll",
      price: 0.99,
      description: "Chewy chocolate-flavored candy",
    },
    {
      id: 22,
      type: "CandyBar",
      name: "Hershey's Cookies 'n' Creme",
      price: 1.49,
      description: "White chocolate with chocolate cookie bits",
    },
    {
      id: 23,
      type: "CandyBar",
      name: "Almond Joy",
      price: 1.29,
      description: "Coconut, almonds, and milk chocolate",
    },
    {
      id: 24,
      type: "CandyBar",
      name: "Twix",
      price: 1.79,
      description: "Crunchy biscuit topped with caramel and coated in chocolate",
    },
    {
      id: 25,
      type: "CandyBar",
      name: "Kit-Kat",
      price: 1.79,
      description: "Crunchy biscuit topped with caramel and coated in chocolate",
    },
    {
      id: 26,
      type: "CandyBar",
      name: "Kinder",
      price: 1.79,
      description: "Crunchy biscuit topped with caramel and coated in chocolate",
    },
    {
      id: 27,
      type: "CandyBar",
      name: "Kisses",
      price: 1.79,
      description: "Crunchy biscuit topped with caramel and coated in chocolate",
    },
    {
      id: 28,
      type: "CandyBar",
      name: "Klondike",
      price: 1.79,
      description: "Crunchy biscuit topped with caramel and coated in chocolate",
    },

  ];
  
  // Rest of the code...
  
  
  

  // const handleSearchIconClick = () => {
  //   setShowSearchBar(!showSearchBar);
  // };

  const handleSearch = async (e) => {
    setSearchQuery(e);
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
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?"
            />
            <div className="searchButton" onClick={handleSearch}>
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
              onClick={()=>handleSearch(item.name)} 
              className="dropDownRow" key={item.id}
              >
                {item.name}
              </div>
            ))}
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