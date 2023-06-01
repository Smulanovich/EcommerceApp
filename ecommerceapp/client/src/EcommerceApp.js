// EcommerceApp.js

import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import './EcommerceApp.css';
import Home from './pages/Home/Home.jsx';
import Products from './pages/Products/Products.jsx';
import Product from './pages/Product/Product.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Checkout from './pages/Checkout/Checkout.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import ProductDisplay from './pages/Products/ProductDisplay.jsx';
import CartProvider from './pages/Cart/CartProvider.jsx'
import UserProvider from './pages/User/userProvider.jsx';
import User from './pages/User/User.jsx';
import Register from './pages/User/Forms/Register';



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
        path: '/product/:id',
        element: <Product/>
      },
      {
        path: '/cart/:id',
        element: <Cart/>
      },
      {
        path: '/checkout/',
        element: <Checkout/>
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
    ]
  }
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
