//import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './EcommerceApp.css';
import Home from './pages/Home/Home.jsx';
import ProductDisplay from './pages/Products/ProductDisplay';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Products from './pages/Products/Products';
import CartProvider from './components/Cart/CartProvider.jsx'

const Layout = () => {
  return (
    <div className="EcommerceApp">
      <Navbar />
      <Outlet />
      <Footer />
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
        path: '/products/CandyBar',
        element: <ProductDisplay productType={"CandyBar"} />,
      },
      {
        path: '/products/CandyCorn',
        element: <ProductDisplay productType={"CandyCorn"} />,
      },
      {
        path: '/products/CandyStick',
        element: <ProductDisplay productType={"CandyStick"} />,
      },
    ],
  },
]);

function EcommerceApp() {

  return (
    <div className="EcommerceApp">
      <CartProvider>
        <RouterProvider router={router}>
          <Outlet/>
        </RouterProvider>
      </CartProvider>
    </div>
  );
}

export default EcommerceApp;
