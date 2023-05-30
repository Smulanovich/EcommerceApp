// EcommerceApp.js

import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import './EcommerceApp.css';
import Home from './pages/Home/Home.jsx';
import Products from './pages/Products/Products.jsx';
import Product from './pages/Product/Product.jsx';
import Cart from './components/Cart/Cart.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';



const Layout = () => {
  return (
    <div className='EcommerceApp'>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/products/:id',
        element: <Products/>,
      },
      {
        path: '/product/:id',
        element: <Product/>
      },
      {
        path: '/cart/:id',
        element: <Cart/>
      },
      {
        path: '/checkout/:id',
        element: <Checkout/>
      }
    ]
  }
]);


function EcommerceApp() {
  return (
    <div className="EcommerceApp">
      <RouterProvider router={router}/>
    </div>
  );
}

export default EcommerceApp;
