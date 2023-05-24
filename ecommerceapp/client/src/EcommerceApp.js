// EcommerceApp.js

import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';
import './EcommerceApp.css';
import Home from './pages/Home/Home.jsx';
import Product from './pages/Product/Product.jsx';
import ProductDisplay from './pages/Products/ProductDisplay';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Products from './pages/Products/Products';

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
        path: '/products',
        element: <Products/>,
      },
      {
        path: '/products/CandyBars',
        element: <ProductDisplay productType={1}/>,
      },
      {
        path: '/products/CandyCorn',
        element: <ProductDisplay productType={2}/>
      },
      {
        path: '/products/CandySticks',
        element: <ProductDisplay productType={3}/>
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
