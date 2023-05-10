// EcommerceApp.js

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <span>Home</span>
  },
  {
    path: '/products/:id',
    element: <span>Category</span>
  },
  {
    path: '/products/:id',
    element: <span>Product</span>
  },
])

function EcommerceApp() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default EcommerceApp;
