import { Divider } from "@mui/material";
import React, { useState } from "react";import { Link } from "react-router-dom";
import "./Cart.css"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {useSelector} from "react-redux"
const Cart = () => {

    const products = useSelector(state=>state.cart.products)

    // const products;
    // const dispatch;
    // const totalPrice;
    // const loadStripe;
    // const handlePayment;

    /*const totalPrice = () => {
        let total = 0;
        products.forEach((item) => {
          total += item.quantity * item.price;
        });
        return total.toFixed(2);
      };*/

// test data for the cart

/*     const data = [
        {
            id: 1,
            img: "https://images.heb.com/is/image/HEBGrocery/000740766-1",
            img2: "https://cdn.shopify.com/s/files/1/0636/2519/9866/products/132307-01_hersheys-milk-chocolate-snack-size-candy-bars-40-piece-bag.jpg?v=1674639258",
            title: "Hershey's Chocolate Bar",
            desc: "HERSHEY'S Milk Chocolate Candy Bar, 1.55 oz",
            isNew: true,
            oldPrice: 1.67,
            price: 1.67,
        },
        {
            id: 2,
            img: "https://target.scene7.com/is/image/Target/GUEST_e9e56460-1b86-42d3-ad67-d1205954ba0f?wid=488&hei=488&fmt=pjpeg",
            img2: "https://cdn.shopify.com/s/files/1/0636/2519/9866/products/132307-01_hersheys-milk-chocolate-snack-size-candy-bars-40-piece-bag.jpg?v=1674639258",
            title: "Reese's Pieces",
            desc: "Reese's Pieces Chocolate Candy, 9.9 oz",
            isNew: true,
            oldPrice: 4.39,
            price: 4.39,
        },
        {
            id: 3,
            img: "https://m.media-amazon.com/images/I/41X1BzvlkRL.jpg",
            img2: "https://cdn.shopify.com/s/files/1/0636/2519/9866/products/132307-01_hersheys-milk-chocolate-snack-size-candy-bars-40-piece-bag.jpg?v=1674639258",
            title: "m&m's",
            desc: "m&m's Milk Chocolate",
            isNew: true,
            oldPrice: 19,
            price: 1.99,
        }, 
    ] */
    return (
        <div className="cart">
            <h1>Products in your cart</h1>
            {products?.map(item=>(
                <div className="item" key={item.id}>
                    <img src={item.img} alt=""  />
                    <div className="details">
                        <h1> {item.title}</h1>
                        <p>{item.desc.substring(0,100)}</p>
                        <div className="price">1 x ${item.price}</div>
                    </div>
                    <DeleteOutlinedIcon className="delete"/>
                </div> 
            ))}
            <div className="total">
                <span>SUBTOTAL</span>
                <span>$TBD</span>
            </div>
            <button>
            <Link className="link" to="/checkout">
                PROCEED TO CHECKOUT
            </Link>
            </button>
            <span className="reset">Reset Cart</span>
        </div>
    );
}

export default Cart;