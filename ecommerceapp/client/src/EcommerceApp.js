// EcommerceApp.js
import React, { useContext } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './EcommerceApp.css';
import Home from './pages/Home/Home.jsx';
import Products from './pages/Products/Products.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import ProductDisplay from './pages/Products/ProductDisplay.jsx';
import CartProvider from './pages/Cart/CartProvider.jsx';
import UserProvider from './pages/User/UserProvider.jsx';
import User from './pages/User/User.jsx';
import Register from './pages/User/Forms/Register';
import { UserContext } from "./pages/User/UserProvider.jsx"
import FavoriteProducts from './pages/User/FavoriteProducts';
import Reviews from './pages/Products/Reviews';
import CheckoutForm from './pages/Checkout/CheckoutForm';
import CheckoutSucces from './pages/Checkout/CheckoutSucces.jsx';
import OrderHistory from './pages/User/OrderHistory';

const ReturnUserEmail = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  if (!user) 
    return null;
  return user.email;
};



const Layout = () => {
  return (
    <div className="EcommerceApp">
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/products/:productType',
        element: <ProductDisplay />,
      },
      {
        path: '/account',
        element: <User />,
      },
      {
        path: '/account/register',
        element: <Register />,
      },
      {
        path: '/account/favorites',
        element: <FavoriteProducts userEmail = {ReturnUserEmail} />,
      },
      {
        path: '/account/orders',
        element: <OrderHistory/>,
      },
      {
        path: '/products/:productType/:product/reviews',
        element: <Reviews />,
      },
      {
        path: '/checkout',
        element: <CheckoutForm />,
      },
      {
        path: '/checkout/success',
        element: <CheckoutSucces />,
      }
    ],
  },
]);

function EcommerceApp() {

  return (
    <div className="EcommerceApp">
      <UserProvider>
        <CartProvider>
          <RouterProvider router={router}>
            <Outlet/>
          </RouterProvider>
        </CartProvider>
      </UserProvider>
    </div>
  );
}

export default EcommerceApp;
