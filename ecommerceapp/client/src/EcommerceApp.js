import React, { useContext } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './EcommerceApp.css';
import Home from './pages/Home/Home.jsx';
import ProductDisplay from './pages/Products/ProductDisplay.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Products from './pages/Products/Products.jsx';
import CartProvider from './pages/Cart/CartProvider.jsx'
import UserProvider from './pages/User/UserProvider.jsx';
import User from './pages/User/User.jsx';
import Register from './pages/User/Forms/Register';
import { UserContext } from "./pages/User/UserProvider.jsx"
import FavoriteProducts from './pages/User/FavoriteProducts';
//import Cart from './components/Cart/Cart.jsx';
//import Checkout from './pages/Checkout/Checkout.jsx';

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
        path: '/products/:productType/:product/reviews',
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
