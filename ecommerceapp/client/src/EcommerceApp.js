// EcommerceApp.js
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Products from './pages/Products/Products.jsx';
import Product from './pages/Product/Product.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/products/:id',
    element: <Products/>
  },
  {
    path: '/product/:id',
    element: <Product/>
  },
])

function EcommerceApp() {
  return (
    <div className="EcommerceApp">
      <RouterProvider router={router}/>
    </div>
  );
}

export default EcommerceApp;
