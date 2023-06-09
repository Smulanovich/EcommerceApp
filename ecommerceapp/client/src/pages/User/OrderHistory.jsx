import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../User/UserProvider";
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = React.useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const email = user?.email;
  const location = useLocation();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/${email}/history`, { email });
        const orderHistory = response.data;

        if (!orderHistory) {
          console.log("No order history found for user");
        } else {
          console.log("Order history found for user");
          setOrders(orderHistory);
        }
      } catch (error) {
        console.error("Error getting order history:", error);
      }
    };

    fetchOrderHistory();
  }, [email, location]);

  if (!orders || orders.length === 0) {
    return (
      <div className="orderHistory">
        <h1>You have no orders!</h1>
      </div>
    );
  }

  return (
    <div className="orderHistory">
      <h1 className="order-h1">Your Orders:</h1>
      {orders.map((order, index) => (
        <div className="order-container" key={order._id}>
          <h3 className="order-h3">Order: {order._id}</h3>
          <ul className="order-ul">
            {order.orderArray.map(([item, quantity]) => (
              <li className="order-li" key={item._id}>
                <img className="order-img" src={item.image_address} alt={item.name} />
                <h4>{item.name.toUpperCase()}</h4>
                <p>Price: ${item.price}</p>
                <p>Quantity: {quantity}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
